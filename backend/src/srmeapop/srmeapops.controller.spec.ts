import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { SrmeapopsController } from "./srmeapops.controller";
import { SrmeapopsService } from "./srmeapops.service";
import { Srmeapop } from "./entities/srmeapop.entity";

describe("SrmeapopController", () => {
  // let controller: SrmeapopsController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SrmeapopsController],
  //     providers: [
  //       SrmeapopsService,
  //       {
  //         provide: getRepositoryToken(Srmeapop),
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();

  //   controller = module.get<SrmeapopsController>(SrmeapopsController);
  // });

  // it("should be defined", () => {
  //   expect(controller).toBeDefined();
  // });
});
