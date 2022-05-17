import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { SrmeasursController } from "./srmeasurs.controller";
import { SrmeasursService } from "./srmeasurs.service";
import { Srmeasur } from "./entities/srmeasur.entity";

describe("SrmeasurController", () => {
  // let controller: SrmeasursController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SrmeasursController],
  //     providers: [
  //       SrmeasursService,
  //       {
  //         provide: getRepositoryToken(Srmeasur),
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();

  //   controller = module.get<SrmeasursController>(SrmeasursController);
  // });

  // it("should be defined", () => {
  //   expect(controller).toBeDefined();
  // });
});
