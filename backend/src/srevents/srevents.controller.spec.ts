import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SreventsController } from './srevents.controller';
import { SreventsService } from './srevents.service';
import { Srevent } from './entities/srevent.entity';

describe('SreventsController', () => {
  let controller: SreventsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SreventsController],
      providers: [
        SreventsService,
        {
          provide: getRepositoryToken(Srevent),
          useValue: {},
        },
      ],
    }).compile();
    controller = module.get<SreventsController>(SreventsController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
