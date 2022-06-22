import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SrsitesController } from './srsites.controller';
import { SrsitesService } from './srsites.service';
import { Srsite } from './entities/srsite.entity';

describe('SrsitesController', () => {
  let controller: SrsitesController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SrsitesController],
      providers: [
        SrsitesService,
        {
          provide: getRepositoryToken(Srsite),
          useValue: {},
        },
      ],
    }).compile();
    controller = module.get<SrsitesController>(SrsitesController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
