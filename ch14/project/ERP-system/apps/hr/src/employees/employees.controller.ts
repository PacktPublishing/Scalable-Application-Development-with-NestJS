import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Get()
  getEmployees() {
    return this.employeeService.getEmployees();
  }

  @Post()
  createEmployee(@Body() data: Employee) {
    return this.employeeService.createEmployee(data);
  }
}
