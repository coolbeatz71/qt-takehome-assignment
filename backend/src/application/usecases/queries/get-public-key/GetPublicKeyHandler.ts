import { ICryptoService } from '../../../../domain/services/ICryptoService';
import { GetPublicKeyQuery } from './GetPublicKeyQuery';

/**
 * Public Key Response DTO
 */
export interface PublicKeyResponse {
  publicKey: string;
  algorithm: string;
  curve: string;
  hash: string;
}

/**
 * Get Public Key Query Handler
 * Retrieves ECDSA public key information (CQRS Query)
 */
export class GetPublicKeyHandler {
  /**
   * Creates a new GetPublicKeyHandler
   * @param {ICryptoService} cryptoService - Crypto service for key access
   */
  constructor(private readonly cryptoService: ICryptoService) {}

  /**
   * Executes the get public key query
   * @param {GetPublicKeyQuery} _query - Query (no parameters)
   * @returns {Promise<PublicKeyResponse>} Public key and algorithm details
   */
  async handle(_query: GetPublicKeyQuery): Promise<PublicKeyResponse> {
    return {
      publicKey: this.cryptoService.getPublicKey(),
      algorithm: 'ECDSA',
      curve: 'secp384r1',
      hash: 'SHA-384',
    };
  }
}
