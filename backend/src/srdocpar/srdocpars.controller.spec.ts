import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SrdocparsController } from './srdocpars.controller';
import { SrdocparsService } from './srdocpars.service';
import { Srdocpar } from './entities/srdocpar.entity';

describe('SrdocparsController', () => {
  let controller: SrdocparsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SrdocparsController],
      providers: [
        SrdocparsService,
        {
          provide: getRepositoryToken(Srdocpar),
          useValue: {},
        },
      ],
    }).compile();
    controller = module.get<SrdocparsController>(SrdocparsController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
