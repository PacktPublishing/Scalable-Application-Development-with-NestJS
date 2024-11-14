import { Injectable } from '@nestjs/common';

@Injectable()
export class HrService {
  getHello(): string {
    return 'Hello World!';
  }
}
