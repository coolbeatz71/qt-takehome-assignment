import crypto from 'node:crypto';
import path from 'node:path';
import protobuf from 'protobufjs';

/**
 * E2E API Tests
 * Tests the full API flow with real HTTP requests against running server
 *
 * Prerequisites: Server must be running on http://localhost:3000
 */
describe('E2E API Tests', () => {
  const API_URL = process.env.E2E_API_URL || 'http://localhost:3000';
  let createdUserId: number;

  const httpJson = async (url: string, options: RequestInit = {}): Promise<any> => {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return res.json();
  };

  const httpBuffer = async (url: string, options: RequestInit = {}) => {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return Buffer.from(await res.arrayBuffer());
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  describe('Full User Lifecycle with Crypto & Protobuf', () => {
    const email = `e2e+${Date.now()}@example.com`;
    const role = 'user';
    const status = 'active';

    it('should create a new user', async () => {
      const response = await httpJson(`${API_URL}/api/users`, {
        method: 'POST',
        body: JSON.stringify({ email, role, status }),
      });

      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data.email).toBe(email.toLowerCase());
      expect(response.data.id).toBeDefined();

      createdUserId = response.data.id;
    });

    it('should retrieve public key', async () => {
      const response = await httpJson(`${API_URL}/api/public-key`);

      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data.publicKey).toContain('-----BEGIN PUBLIC KEY-----');
      expect(response.data.algorithm).toBe('ECDSA');
      expect(response.data.curve).toBe('secp384r1');
      expect(response.data.hash).toBe('SHA-384');
    });

    it('should export users as protobuf and verify signature', async () => {
      // Small delay to ensure user is persisted
      await sleep(100);

      // Get public key
      const pubResponse = await httpJson(`${API_URL}/api/public-key`);
      const publicKeyPem = pubResponse.data.publicKey;

      // Download protobuf export
      const protobufBuffer = await httpBuffer(`${API_URL}/api/users/export`, {
        headers: { Accept: 'application/x-protobuf' },
      });

      expect(Buffer.isBuffer(protobufBuffer)).toBe(true);
      expect(protobufBuffer.length).toBeGreaterThan(0);

      // Decode protobuf
      const protoPath = path.join(__dirname, '../../src/infrastructure/protobuf/schemas/user.proto');
      const root = await protobuf.load(protoPath);
      const UserList = root.lookupType('UserList');
      const message = UserList.decode(protobufBuffer);
      const decoded = UserList.toObject(message, {
        longs: Number,
        enums: String,
        bytes: String
      }) as any;

      const users = decoded.users || [];
      expect(users.length).toBeGreaterThan(0);

      // Find the created user
      const createdUser = users.find((u: any) => u.email === email.toLowerCase());
      expect(createdUser).toBeDefined();
      expect(createdUser.role).toBe(role);
      expect(createdUser.status).toBe(status);
      expect(createdUser.signature).toBeDefined();

      // Verify ECDSA signature
      const isValid = crypto.verify(
        'sha384',
        Buffer.from(email.toLowerCase(), 'utf-8'),
        {
          key: publicKeyPem,
          format: 'pem',
          type: 'spki',
        },
        Buffer.from(createdUser.signature, 'hex')
      );

      expect(isValid).toBe(true);
    });

    it('should get user by id', async () => {
      const response = await httpJson(`${API_URL}/api/users/${createdUserId}`);

      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data.id).toBe(createdUserId);
      expect(response.data.email).toBe(email.toLowerCase());
    });

    it('should get all users including created one', async () => {
      const response = await httpJson(`${API_URL}/api/users`);

      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);

      const foundUser = response.data.find((u: any) => u.id === createdUserId);
      expect(foundUser).toBeDefined();
    });

    it('should update user', async () => {
      const response = await httpJson(`${API_URL}/api/users/${createdUserId}`, {
        method: 'PUT',
        body: JSON.stringify({
          email: email.toLowerCase(),
          role: 'admin',
          status: 'inactive'
        }),
      });

      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(response.data.role).toBe('admin');
      expect(response.data.status).toBe('inactive');
    });

    it('should get user statistics', async () => {
      const response = await httpJson(`${API_URL}/api/users/stats`);

      expect(response.success).toBe(true);
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data.length).toBe(7); // 7 days of stats
    });

    it('should delete user (cleanup)', async () => {
      const response = await httpJson(`${API_URL}/api/users/${createdUserId}`, {
        method: 'DELETE',
      });

      expect(response.success).toBe(true);
    });

    it('should not find deleted user', async () => {
      try {
        await httpJson(`${API_URL}/api/users/${createdUserId}`);
        fail('Should have thrown an error for deleted user');
      } catch (error: any) {
        expect(error.message).toContain('HTTP 404');
      }
    });
  });

  describe('Error Handling', () => {
    it('should return error for invalid user creation', async () => {
      try {
        await httpJson(`${API_URL}/api/users`, {
          method: 'POST',
          body: JSON.stringify({ email: 'invalid-email', role: 'user', status: 'active' }),
        });
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.message).toContain('HTTP');
      }
    });

    it('should return error for non-existent user', async () => {
      try {
        await httpJson(`${API_URL}/api/users/999999`);
        fail('Should have thrown an error for non-existent user');
      } catch (error: any) {
        expect(error.message).toContain('HTTP 404');
      }
    });

    it('should return error when deleting non-existent user', async () => {
      try {
        await httpJson(`${API_URL}/api/users/999999`, {
          method: 'DELETE',
        });
        fail('Should have thrown an error');
      } catch (error: any) {
        expect(error.message).toContain('HTTP');
      }
    });
  });
});
