import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { APIResponse } from '../types/APIResponse';

@Injectable()
export class APIResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return handler.handle().pipe(
      map((data): APIResponse => {
        const message =
          data && data.message ? data.message : 'Request successful';
        if (data?.message) delete data.message;
        const data_ =
          data instanceof Error ? null : data?.data ? data.data : data;
        const success = !(data instanceof Error) && data_ !== null;

        return {
          success,
          data: data_,
          error: data instanceof Error ? data : null,
          message,
        };
      }),
    );
  }
}
