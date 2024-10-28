import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

describe('InventoryController', () => {
  let inventoryController: InventoryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [InventoryService],
    }).compile();

    inventoryController = app.get<InventoryController>(InventoryController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(inventoryController.getHello()).toBe('Hello World!');
    });
  });
});
