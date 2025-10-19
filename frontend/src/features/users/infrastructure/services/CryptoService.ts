import type { User } from '../../domain/entities/User.entity';

/**
 * Crypto service for signature verification
 */
export class CryptoService {
  /**
   * Import PEM-formatted public key
   * @param {string} pemKey - PEM public key string
   * @returns {Promise<CryptoKey>} Imported crypto key
   */
  private async importPublicKey(pemKey: string): Promise<CryptoKey> {
    const pemContents = pemKey
      .replace('-----BEGIN PUBLIC KEY-----', '')
      .replace('-----END PUBLIC KEY-----', '')
      .replace(/\s/g, '');

    const binaryDer = atob(pemContents);
    const bytes = new Uint8Array(binaryDer.length);
    for (let i = 0; i < binaryDer.length; i++) {
      bytes[i] = binaryDer.charCodeAt(i);
    }

    const key = await window.crypto.subtle.importKey(
      'spki',
      bytes.buffer,
      { name: 'ECDSA', namedCurve: 'P-384' },
      false,
      ['verify']
    );

    return key;
  }

  /**
   * Convert hex string to Uint8Array
   * @param {string} hexString - Hex string
   * @returns {Uint8Array} Byte array
   */
  private hexToUint8Array(hexString: string): Uint8Array {
    const bytes = new Uint8Array(hexString.length / 2);
    for (let i = 0; i < hexString.length; i += 2) {
      bytes[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
    }
    return bytes;
  }

  /**
   * Convert DER signature to raw format
   * @param {Uint8Array} derSignature - DER-encoded signature
   * @returns {Uint8Array} Raw signature
   */
  private derToRaw(derSignature: Uint8Array): Uint8Array {
    let offset = 0;

    if (derSignature[offset++] !== 0x30) throw new Error('Invalid DER signature');

    const length = derSignature[offset++];
    if (length & 0x80) {
      const lengthBytes = length & 0x7f;
      offset += lengthBytes;
    }

    if (derSignature[offset++] !== 0x02) throw new Error('Invalid DER signature');
    let rLength = derSignature[offset++];
    if (rLength & 0x80) {
      const lengthBytes = rLength & 0x7f;
      rLength = 0;
      for (let i = 0; i < lengthBytes; i++) {
        rLength = (rLength << 8) + derSignature[offset++];
      }
    }

    let rStart = offset;
    if (derSignature[rStart] === 0x00) {
      rStart++;
      rLength--;
    }
    const r = derSignature.slice(rStart, rStart + rLength);
    offset = rStart + rLength;

    if (derSignature[offset++] !== 0x02) throw new Error('Invalid DER signature');
    let sLength = derSignature[offset++];
    if (sLength & 0x80) {
      const lengthBytes = sLength & 0x7f;
      sLength = 0;
      for (let i = 0; i < lengthBytes; i++) {
        sLength = (sLength << 8) + derSignature[offset++];
      }
    }

    let sStart = offset;
    if (derSignature[sStart] === 0x00) {
      sStart++;
      sLength--;
    }
    const s = derSignature.slice(sStart, sStart + sLength);

    const coordSize = 48;
    const rawSignature = new Uint8Array(coordSize * 2);

    rawSignature.set(r, coordSize - r.length);
    rawSignature.set(s, coordSize * 2 - s.length);

    return rawSignature;
  }

  /**
   * Verify user signature
   * @param {User} user - User with signature
   * @param {string} publicKeyPem - Public key in PEM format
   * @returns {Promise<boolean>} True if signature is valid
   */
  async verifyUserSignature(user: User, publicKeyPem: string): Promise<boolean> {
    try {
      if (!user.signature || user.signature.length < 8 || user.signature.length % 2 !== 0) {
        return false;
      }

      const publicKey = await this.importPublicKey(publicKeyPem);
      const encoder = new TextEncoder();
      const emailData = encoder.encode(user.email);
      const derSignature = this.hexToUint8Array(user.signature);
      const rawSignature = this.derToRaw(derSignature);

      const isValid = await window.crypto.subtle.verify(
        { name: 'ECDSA', hash: { name: 'SHA-384' } },
        publicKey,
        rawSignature.buffer as ArrayBuffer,
        emailData.buffer as ArrayBuffer
      );

      return isValid;
    } catch (error) {
      console.error(`Error verifying signature for ${user.email}:`, error);
      return false;
    }
  }

  /**
   * Process items in batches
   * @param {T[]} items - Items to process
   * @param {Function} processor - Processing function
   * @param {number} batchSize - Batch size
   * @returns {Promise<R[]>} Processed results
   */
  private async processInBatches<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    batchSize: number = 10
  ): Promise<R[]> {
    const results: R[] = [];

    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = await Promise.allSettled(batch.map(processor));

      const successfulResults = batchResults
        .filter((result) => result.status === 'fulfilled')
        .map((result) => (result as PromiseFulfilledResult<R>).value);

      results.push(...successfulResults);
    }

    return results;
  }

  /**
   * Verify and filter users by signature validity
   * @param {User[]} users - Users to verify
   * @param {string} publicKeyPem - Public key in PEM format
   * @returns {Promise<User[]>} Only users with valid signatures
   */
  async verifyAndFilterUsers(users: User[], publicKeyPem: string): Promise<User[]> {
    const verificationResults = await this.processInBatches(
      users,
      async (user) => {
        const isValid = await this.verifyUserSignature(user, publicKeyPem);
        return { user, isValid };
      },
      5
    );

    const validUsers = verificationResults
      .filter((result) => result.isValid)
      .map((result) => result.user);

    return validUsers;
  }
}

export const cryptoService = new CryptoService();
