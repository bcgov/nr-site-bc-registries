import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { SrsourcesController } from "./srsources.controller";
import { SrsourcesService } from "./srsources.service";
import { Srsource } from "./entities/srsource.entity";

describe("SrsourceController", () => {
  // let controller: SrsourcesController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SrsourcesController],
  //     providers: [
  //       SrsourcesService,
  //       {
  //         provide: getRepositoryToken(Srsource),
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();

  //   controller = module.get<SrsourcesController>(SrsourcesController);
  // });

  // it("should be defined", () => {
  //   expect(controller).toBeDefined();
  // });
});
