import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { SrpcocsController } from "./srpcocs.controller";
import { SrpcocsService } from "./srpcocs.service";
import { Srpcoc } from "./entities/srpcoc.entity";

describe("SrpcocController", () => {
  // let controller: SrpcocsController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SrpcocsController],
  //     providers: [
  //       SrpcocsService,
  //       {
  //         provide: getRepositoryToken(Srpcoc),
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();

  //   controller = module.get<SrpcocsController>(SrpcocsController);
  // });

  // it("should be defined", () => {
  //   expect(controller).toBeDefined();
  // });
});
