import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { SrremmeasController } from "./srremmeas.controller";
import { SrremmeasService } from "./srremmeas.service";
import { Srremmea } from "./entities/srremmea.entity";

describe("SrremmeaController", () => {
  // let controller: SrremmeasController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SrremmeasController],
  //     providers: [
  //       SrremmeasService,
  //       {
  //         provide: getRepositoryToken(Srremmea),
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();

  //   controller = module.get<SrremmeasController>(SrremmeasController);
  // });

  // it("should be defined", () => {
  //   expect(controller).toBeDefined();
  // });
});
