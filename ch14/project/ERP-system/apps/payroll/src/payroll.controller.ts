import { Controller, Get } from '@nestjs/common';
import { PayrollService } from './payroll.service';

@Controller()
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Get()
  getHello(): string {
    return this.payrollService.getHello();
  }
}
