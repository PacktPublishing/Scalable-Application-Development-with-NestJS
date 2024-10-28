import { CallHandler, ExecutionContext } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { ResponseLoggingInterceptor } from './response-logging.interceptor';
import { createMockExecutionContext } from '../helpers/mock-execution-context';

describe('ResponseLoggingInterceptor', () => {
  let interceptor: ResponseLoggingInterceptor;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ResponseLoggingInterceptor],
    }).compile();

    interceptor = module.get<ResponseLoggingInterceptor>(
      ResponseLoggingInterceptor,
    );
  });

  it('should log and format the response', (done) => {
    const mockExecutionContext: ExecutionContext =
      createMockExecutionContext('mock-token');
    const callHandler: CallHandler = {
      handle: () => of({ data: 'test' }), // Simulate a handler returning an observable with data
    };

    interceptor
      .intercept(mockExecutionContext, callHandler)
      .subscribe((response) => {
        expect(response).toHaveProperty('success', true);
        expect(response).toHaveProperty('data', { data: 'test' });
        expect(response).toHaveProperty('timestamp');
        done();
      });
  });
});
