import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { SrapproasController } from "./srapproas.controller";
import { SrapproasService } from "./srapproas.service";
import { Srapproa } from "./entities/srapproa.entity";

describe("SrapproaController", () => {
  // let controller: SrapproasController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SrapproasController],
  //     providers: [
  //       SrapproasService,
  //       {
  //         provide: getRepositoryToken(Srapproa),
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();

  //   controller = module.get<SrapproasController>(SrapproasController);
  // });

  // it("should be defined", () => {
  //   expect(controller).toBeDefined();
  // });
});
