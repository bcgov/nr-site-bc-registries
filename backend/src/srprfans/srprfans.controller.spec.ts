import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SrprfansController } from './srprfans.controller';
import { SrprfansService } from './srprfans.service';
import { Srprfan } from './entities/srprfan.entity';

describe('SrprfansController', () => {
  let controller: SrprfansController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SrprfansController],
      providers: [
        SrprfansService,
        {
          provide: getRepositoryToken(Srprfan),
          useValue: {},
        },
      ],
    }).compile();
    controller = module.get<SrprfansController>(SrprfansController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
