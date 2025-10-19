import { describe, it, expect, beforeEach } from '@jest/globals';
import { GetPublicKeyHandler } from '../../../src/application/usecases/queries/get-public-key/GetPublicKeyHandler';
import { TestFactory } from '../../utils/factories';
import { createMockCryptoService } from '../../utils/mocks';

describe('GetPublicKeyHandler', () => {
  let handler: GetPublicKeyHandler;
  let mockCryptoService: ReturnType<typeof createMockCryptoService>;

  beforeEach(() => {
    mockCryptoService = createMockCryptoService();
    handler = new GetPublicKeyHandler(mockCryptoService);
  });

  it('should return public key information', async () => {
    const query = TestFactory.getPublicKeyQuery();
    const publicKey = '-----BEGIN PUBLIC KEY-----\nMOCK_KEY\n-----END PUBLIC KEY-----';
    
    mockCryptoService.getPublicKey.mockReturnValue(publicKey);

    const result = await handler.handle(query);

    expect(result.publicKey).toBe(publicKey);
    expect(result.algorithm).toBe('ECDSA');
    expect(result.curve).toBe('secp384r1');
    expect(result.hash).toBe('SHA-384');
  });

  it('should call crypto service to get public key', async () => {
    const query = TestFactory.getPublicKeyQuery();
    mockCryptoService.getPublicKey.mockReturnValue('test_key');

    await handler.handle(query);

    expect(mockCryptoService.getPublicKey).toHaveBeenCalled();
  });
});
