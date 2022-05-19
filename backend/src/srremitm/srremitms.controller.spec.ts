import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SrremitmsController } from './srremitms.controller';
import { SrremitmsService } from './srremitms.service';
import { Srremitm } from './entities/srremitm.entity';

describe('SrremitmController', () => {
  // let controller: SrremitmsController;
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SrremitmsController],
  //     providers: [
  //       SrremitmsService,
  //       {
  //         provide: getRepositoryToken(Srremitm),
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();
  //   controller = module.get<SrremitmsController>(SrremitmsController);
  // });
  // it("should be defined", () => {
  //   expect(controller).toBeDefined();
  // });
});
