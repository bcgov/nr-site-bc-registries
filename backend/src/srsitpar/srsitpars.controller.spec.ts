import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { SrsitparsController } from "./srsitpars.controller";
import { SrsitparsService } from "./srsitpars.service";
import { Srsitpar } from "./entities/srsitpar.entity";

describe("SrsitparController", () => {
  // let controller: SrsitparsController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SrsitparsController],
  //     providers: [
  //       SrsitparsService,
  //       {
  //         provide: getRepositoryToken(Srsitpar),
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();

  //   controller = module.get<SrsitparsController>(SrsitparsController);
  // });

  // it("should be defined", () => {
  //   expect(controller).toBeDefined();
  // });
});
