import { Module } from '@nestjs/common';
import { HrController } from './hr.controller';
import { HrService } from './hr.service';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesService } from './employees/employees.service';

@Module({
  imports: [],
  controllers: [HrController, EmployeesController],
  providers: [HrService, EmployeesService],
})
export class HrModule {}
