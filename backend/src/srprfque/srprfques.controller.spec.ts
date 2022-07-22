import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SrprfquesController } from './srprfques.controller';
import { SrprfquesService } from './srprfques.service';
import { Srprfque } from './entities/srprfque.entity';

describe('SrprfquesController', () => {
  let controller: SrprfquesController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SrprfquesController],
      providers: [
        SrprfquesService,
        {
          provide: getRepositoryToken(Srprfque),
          useValue: {},
        },
      ],
    }).compile();
    controller = module.get<SrprfquesController>(SrprfquesController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
