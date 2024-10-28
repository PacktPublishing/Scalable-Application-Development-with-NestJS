import { Test } from '@nestjs/testing';
import { MockAuthGuard } from './mock-auth.guard';
import { createMockExecutionContext } from '../common/helpers/mock-execution-context';

describe('MockAuthGuard', () => {
  let guard: MockAuthGuard;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MockAuthGuard],
    }).compile();

    guard = module.get<MockAuthGuard>(MockAuthGuard);
  });

  it('should allow access with correct token', () => {
    const context = createMockExecutionContext('Bearer mock-token');
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should deny access with incorrect token', () => {
    const context = createMockExecutionContext('Bearer incorrect-token');
    expect(guard.canActivate(context)).toBe(false);
  });

  it('should deny access without token', () => {
    const context = createMockExecutionContext('');
    expect(guard.canActivate(context)).toBe(false);
  });
});
