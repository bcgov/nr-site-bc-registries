import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SrsitdocsController } from './srsitdocs.controller';
import { SrsitdocsService } from './srsitdocs.service';
import { Srsitdoc } from './entities/srsitdoc.entity';

describe('SrsitdocsController', () => {
  let controller: SrsitdocsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SrsitdocsController],
      providers: [
        SrsitdocsService,
        {
          provide: getRepositoryToken(Srsitdoc),
          useValue: {},
        },
      ],
    }).compile();
    controller = module.get<SrsitdocsController>(SrsitdocsController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
