/**
 * Crypto Service Interface
 * Defines contract for cryptographic operations (Dependency Inversion Principle)
 */
export interface ICryptoService {
  /**
   * Signs an email using ECDSA P-384 with SHA-384
   * @param {string} email - Email to sign
   * @returns {string} Hex-encoded signature
   */
  signEmail(email: string): string;

  /**
   * Gets the public key in PEM format
   * @returns {string} PEM-encoded public key
   */
  getPublicKey(): string;

  /**
   * Verifies an email signature
   * @param {string} email - Email that was signed
   * @param {string} signature - Hex-encoded signature
   * @returns {boolean} True if signature is valid
   */
  verifySignature(email: string, signature: string): boolean;
}
