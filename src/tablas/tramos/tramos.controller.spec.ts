import { Test, TestingModule } from '@nestjs/testing';
import { TramosController } from './tramos.controller';

describe('TramosController', () => {
  let controller: TramosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TramosController],
    }).compile();

    controller = module.get<TramosController>(TramosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
