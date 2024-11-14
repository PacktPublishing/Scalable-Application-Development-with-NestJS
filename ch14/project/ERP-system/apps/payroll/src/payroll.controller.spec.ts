import { Test, TestingModule } from '@nestjs/testing';
import { PayrollController } from './payroll.controller';
import { PayrollService } from './payroll.service';

describe('PayrollController', () => {
  let payrollController: PayrollController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PayrollController],
      providers: [PayrollService],
    }).compile();

    payrollController = app.get<PayrollController>(PayrollController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(payrollController.getHello()).toBe('Hello World!');
    });
  });
});
