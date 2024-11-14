import { Test, TestingModule } from '@nestjs/testing';
import { HrController } from './hr.controller';
import { HrService } from './hr.service';

describe('HrController', () => {
  let hrController: HrController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HrController],
      providers: [HrService],
    }).compile();

    hrController = app.get<HrController>(HrController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(hrController.getHello()).toBe('Hello World!');
    });
  });
});
