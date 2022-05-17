import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { SraecassController } from "./sraecass.controller";
import { SraecassService } from "./sraecass.service";
import { Sraecass } from "./entities/sraecass.entity";

describe("SraecassController", () => {
  // let controller: SraecassController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SraecassController],
  //     providers: [
  //       SraecassService,
  //       {
  //         provide: getRepositoryToken(Sraecass),
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();

  //   controller = module.get<SraecassController>(SraecassController);
  // });

  // it("should be defined", () => {
  //   expect(controller).toBeDefined();
  // });
});
