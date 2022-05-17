import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { SrparrolsController } from "./srparrols.controller";
import { SrparrolsService } from "./srparrols.service";
import { Srparrol } from "./entities/srparrol.entity";

describe("SrparrolController", () => {
  // let controller: SrparrolsController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SrparrolsController],
  //     providers: [
  //       SrparrolsService,
  //       {
  //         provide: getRepositoryToken(Srparrol),
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();

  //   controller = module.get<SrparrolsController>(SrparrolsController);
  // });

  // it("should be defined", () => {
  //   expect(controller).toBeDefined();
  // });
});
