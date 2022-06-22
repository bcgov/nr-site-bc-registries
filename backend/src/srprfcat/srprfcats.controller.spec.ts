import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SrprfcatsController } from './srprfcats.controller';
import { SrprfcatsService } from './srprfcats.service';
import { Srprfcat } from './entities/srprfcat.entity';

describe('SrprfcatsController', () => {
  let controller: SrprfcatsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SrprfcatsController],
      providers: [
        SrprfcatsService,
        {
          provide: getRepositoryToken(Srprfcat),
          useValue: {},
        },
      ],
    }).compile();
    controller = module.get<SrprfcatsController>(SrprfcatsController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
