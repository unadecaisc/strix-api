import { Test, TestingModule } from '@nestjs/testing';
import { GlobalConfigsService } from './global-configs.service';

describe('GlobalConfigsService', () => {
  let service: GlobalConfigsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalConfigsService],
    }).compile();

    service = module.get<GlobalConfigsService>(GlobalConfigsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
