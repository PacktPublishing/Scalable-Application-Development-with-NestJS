import { Injectable } from '@nestjs/common';
import { Department, Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  private employees: Employee[] = [
    {
      id: 1,
      name: 'John Doe',
      department: Department.HR,
      email: 'john@hr.com',
    },
    {
      id: 2,
      name: 'Jane Doe',
      department: Department.IT,
      email: 'jane@it.com',
    },
  ];

  createEmployee(data: Employee) {
    const newEmployee = {
      id: this.employees.length + 1,
      ...data,
    };
    this.employees.push(newEmployee);
    return newEmployee;
  }

  getEmployees() {
    return this.employees;
  }

  getEmployee(id: number) {
    return this.employees.find((employee) => employee.id === id);
  }
}
