import { describe, it, expect, beforeEach } from '@jest/globals';
import { GetUserStatsHandler } from '../../../src/application/usecases/queries/get-user-stats/GetUserStatsHandler';
import { TestFactory } from '../../utils/factories';
import { createMockUserRepository } from '../../utils/mocks';

describe('GetUserStatsHandler', () => {
  let handler: GetUserStatsHandler;
  let mockUserRepository: ReturnType<typeof createMockUserRepository>;

  beforeEach(() => {
    mockUserRepository = createMockUserRepository();
    handler = new GetUserStatsHandler(mockUserRepository);
  });

  it('should return user statistics', async () => {
    const stats = TestFactory.createDailyStats(7);
    const query = TestFactory.getUserStatsQuery();
    mockUserRepository.getStats.mockResolvedValue(stats);

    const result = await handler.handle(query);

    expect(result).toEqual(stats);
    expect(result.length).toBe(7);
  });

  it('should return empty stats when no data', async () => {
    const query = TestFactory.getUserStatsQuery();
    mockUserRepository.getStats.mockResolvedValue([]);

    const result = await handler.handle(query);

    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });
});
