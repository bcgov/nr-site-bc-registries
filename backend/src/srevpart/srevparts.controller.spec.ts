import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { SrevpartsController } from "./srevparts.controller";
import { SrevpartsService } from "./srevparts.service";
import { Srevpart } from "./entities/srevpart.entity";

describe("SrevpartController", () => {
  // let controller: SrevpartsController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SrevpartsController],
  //     providers: [
  //       SrevpartsService,
  //       {
  //         provide: getRepositoryToken(Srevpart),
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();

  //   controller = module.get<SrevpartsController>(SrevpartsController);
  // });

  // it("should be defined", () => {
  //   expect(controller).toBeDefined();
  // });
});
