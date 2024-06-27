import { Test, TestingModule } from '@nestjs/testing';
import { GlobalConfigsController } from './global-configs.controller';
import { GlobalConfigsService } from './global-configs.service';

describe('GlobalConfigsController', () => {
  let controller: GlobalConfigsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalConfigsController],
      providers: [GlobalConfigsService],
    }).compile();

    controller = module.get<GlobalConfigsController>(GlobalConfigsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
