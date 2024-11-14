import { Test, TestingModule } from '@nestjs/testing';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';

describe('FinanceController', () => {
  let financeController: FinanceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FinanceController],
      providers: [FinanceService],
    }).compile();

    financeController = app.get<FinanceController>(FinanceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(financeController.getHello()).toBe('Hello World!');
    });
  });
});
