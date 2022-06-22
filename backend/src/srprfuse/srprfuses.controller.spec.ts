import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SrprfusesController } from './srprfuses.controller';
import { SrprfusesService } from './srprfuses.service';
import { Srprfuse } from './entities/srprfuse.entity';

describe('SrprfusesController', () => {
  let controller: SrprfusesController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SrprfusesController],
      providers: [
        SrprfusesService,
        {
          provide: getRepositoryToken(Srprfuse),
          useValue: {},
        },
      ],
    }).compile();
    controller = module.get<SrprfusesController>(SrprfusesController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
