import { ExecutionContext } from '@nestjs/common';

export function createMockExecutionContext(token: string): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({
        headers: {
          authorization: token,
        },
      }),
    }),
  } as ExecutionContext;
}
