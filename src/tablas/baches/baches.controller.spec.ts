import { Test, TestingModule } from '@nestjs/testing';
import { BachesController } from './baches.controller';

describe('BachesController', () => {
  let controller: BachesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BachesController],
    }).compile();

    controller = module.get<BachesController>(BachesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
