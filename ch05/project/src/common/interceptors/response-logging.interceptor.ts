import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const start = Date.now();

    return next.handle().pipe(
      map((data) => {
        const executionTime = Date.now() - start;
        console.log(`Request to ${request.url} took ${executionTime}ms`);

        return {
          success: !(data instanceof Error) && data !== null,
          data: data,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
