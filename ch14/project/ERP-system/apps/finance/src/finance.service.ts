import { Injectable } from '@nestjs/common';

@Injectable()
export class FinanceService {
  getHello(): string {
    return 'Hello World!';
  }
}
