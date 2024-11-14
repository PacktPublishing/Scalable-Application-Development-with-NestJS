import { Module } from '@nestjs/common';
import { PayrollController } from './payroll.controller';
import { PayrollService } from './payroll.service';

@Module({
  imports: [],
  controllers: [PayrollController],
  providers: [PayrollService],
})
export class PayrollModule {}
