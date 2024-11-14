import { Injectable } from '@nestjs/common';

@Injectable()
export class PayrollService {
  getHello(): string {
    return 'Hello World!';
  }
}
