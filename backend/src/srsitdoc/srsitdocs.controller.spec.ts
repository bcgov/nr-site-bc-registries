import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SrsitdocsController } from './srsitdocs.controller';
import { SrsitdocsService } from './srsitdocs.service';
import { Srsitdoc } from './entities/srsitdoc.entity';

describe('SrdateController', () => {
  // let controller: SrdatesController;
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SrdatesController],
  //     providers: [
  //       SrdatesService,
  //       {
  //         provide: getRepositoryToken(Srdate),
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();
  //   controller = module.get<SrdatesController>(SrdatesController);
  // });
  // it("should be defined", () => {
  //   expect(controller).toBeDefined();
  // });
});
