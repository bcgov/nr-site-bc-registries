import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SrdatesController } from './srdates.controller';
import { SrdatesService } from './srdates.service';
import { Srdate } from './entities/srdate.entity';

describe('SrdatesController', () => {
  let controller: SrdatesController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SrdatesController],
      providers: [
        SrdatesService,
        {
          provide: getRepositoryToken(Srdate),
          useValue: {},
        },
      ],
    }).compile();
    controller = module.get<SrdatesController>(SrdatesController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
