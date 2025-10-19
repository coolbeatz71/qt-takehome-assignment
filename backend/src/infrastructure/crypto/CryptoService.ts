import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { ICryptoService } from '../../domain/services/ICryptoService';
import { errorMessages } from '../../shared/constants/error-messages';

/**
 * ECDSA P-384 Crypto Service Implementation
 * Handles email signing and verification using ECDSA with SHA-384
 */
export class CryptoService implements ICryptoService {
  private privateKey!: string;
  private publicKey!: string;
  private readonly keysDir: string;
  private readonly privateKeyPath: string;
  private readonly publicKeyPath: string;

  /**
   * Creates a new CryptoService instance
   * @param {string} keysDir - Directory to store cryptographic keys
   */
  constructor(keysDir: string = path.join(__dirname, '../../../keys')) {
    this.keysDir = keysDir;
    this.privateKeyPath = path.join(keysDir, 'private.pem');
    this.publicKeyPath = path.join(keysDir, 'public.pem');
  }

  /**
   * Initializes the crypto service by loading or generating keypair
   * Must be called before using other methods
   */
  initialize(): void {
    this.ensureKeysDirectory();

    if (!this.loadKeypair()) {
      this.generateKeypair();
    }
  }

  /**
   * Ensures the keys directory exists
   * @private
   */
  private ensureKeysDirectory(): void {
    if (!fs.existsSync(this.keysDir)) {
      fs.mkdirSync(this.keysDir, { recursive: true });
    }
  }

  /**
   * Loads existing keypair from disk
   * @private
   * @returns {boolean} True if keypair loaded successfully
   */
  private loadKeypair(): boolean {
    try {
      if (fs.existsSync(this.privateKeyPath) && fs.existsSync(this.publicKeyPath)) {
        this.privateKey = fs.readFileSync(this.privateKeyPath, 'utf-8');
        this.publicKey = fs.readFileSync(this.publicKeyPath, 'utf-8');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Generates a new ECDSA P-384 keypair and saves to disk
   * @private
   */
  private generateKeypair(): void {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
      namedCurve: 'secp384r1',
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    fs.writeFileSync(this.privateKeyPath, privateKey, { mode: 0o600 });
    fs.writeFileSync(this.publicKeyPath, publicKey, { mode: 0o600 });

    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  /**
   * Signs an email using ECDSA P-384 with SHA-384
   * @param {string} email - Email address to sign
   * @returns {string} Hex-encoded signature
   * @throws {Error} If signing fails
   */
  signEmail(email: string): string {
    try {
      const emailBuffer = Buffer.from(email, 'utf-8');
      const signature = crypto.sign('sha384', emailBuffer, {
        key: this.privateKey,
        format: 'pem',
        type: 'pkcs8',
      });

      return signature.toString('hex');
    } catch (error) {
      throw new Error(errorMessages.crypto.signEmailFailed);
    }
  }

  /**
   * Gets the public key in PEM format
   * @returns {string} PEM-encoded public key
   */
  getPublicKey(): string {
    return this.publicKey;
  }

  /**
   * Verifies an email signature using ECDSA P-384 with SHA-384
   * @param {string} email - Email that was signed
   * @param {string} signature - Hex-encoded signature
   * @returns {boolean} True if signature is valid
   */
  verifySignature(email: string, signature: string): boolean {
    try {
      const emailBuffer = Buffer.from(email, 'utf-8');
      const signatureBuffer = Buffer.from(signature, 'hex');

      return crypto.verify(
        'sha384',
        emailBuffer,
        {
          key: this.publicKey,
          format: 'pem',
          type: 'spki',
        },
        signatureBuffer
      );
    } catch {
      return false;
    }
  }
}
