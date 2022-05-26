import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SrprofilsController } from './srprofils.controller';
import { SrprofilsService } from './srprofils.service';
import { Srprofil } from './entities/srprofil.entity';

describe('SrprofilController', () => {
  // let controller: SrprofilsController;
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SrprofilsController],
  //     providers: [
  //       SrprofilsService,
  //       {
  //         provide: getRepositoryToken(Srprofil),
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();
  //   controller = module.get<SrprofilsController>(SrprofilsController);
  // });
  // it("should be defined", () => {
  //   expect(controller).toBeDefined();
  // });
});
