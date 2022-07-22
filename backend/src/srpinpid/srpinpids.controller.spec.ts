import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SrpinpidsController } from './srpinpids.controller';
import { SrpinpidsService } from './srpinpids.service';
import { Srpinpid } from './entities/srpinpid.entity';

describe('SrpinpidsController', () => {
  let controller: SrpinpidsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SrpinpidsController],
      providers: [
        SrpinpidsService,
        {
          provide: getRepositoryToken(Srpinpid),
          useValue: {},
        },
      ],
    }).compile();
    controller = module.get<SrpinpidsController>(SrpinpidsController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
