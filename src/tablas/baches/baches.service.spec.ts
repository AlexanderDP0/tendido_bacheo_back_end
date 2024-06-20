import { Test, TestingModule } from '@nestjs/testing';
import { BachesService } from './baches.service';

describe('BachesService', () => {
  let service: BachesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BachesService],
    }).compile();

    service = module.get<BachesService>(BachesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
