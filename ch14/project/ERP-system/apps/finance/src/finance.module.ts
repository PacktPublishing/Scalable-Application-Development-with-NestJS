import { Module } from '@nestjs/common';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';

@Module({
  imports: [],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
