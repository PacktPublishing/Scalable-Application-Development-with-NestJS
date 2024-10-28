import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { APIResponse } from '../types/APIResponse';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const errorMessage = exception.getResponse()['message']
      ? exception.getResponse()['message']
      : exception.message || 'Internal server error';

    const error: any =
      exception.getResponse() || exception.getResponse()['error'];

    delete error['message'];

    const body: APIResponse = {
      success: false,
      message: errorMessage,
      data: null,
      error,
    };

    response.status(status).json(body);
  }
}
