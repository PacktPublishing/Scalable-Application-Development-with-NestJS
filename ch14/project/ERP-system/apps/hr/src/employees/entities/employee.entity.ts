export enum Department {
  HR = 'HR',
  IT = 'IT',
  Finance = 'Finance',
}

export class Employee {
  id: number;
  name: string;
  email: string;
  department: Department;
}
