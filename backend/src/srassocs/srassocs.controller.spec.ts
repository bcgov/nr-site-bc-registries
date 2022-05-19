import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SrassocsController } from './srassocs.controller';
import { SrassocsService } from './srassocs.service';
import { Srassoc } from './entities/srassoc.entity';

describe('SrassocController', () => {
  // let controller: SrassocsController;
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SrassocsController],
  //     providers: [
  //       SrassocsService,
  //       {
  //         provide: getRepositoryToken(Srassoc),
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();
  //   controller = module.get<SrassocsController>(SrassocsController);
  // });
  // it("should be defined", () => {
  //   expect(controller).toBeDefined();
  // });
});
