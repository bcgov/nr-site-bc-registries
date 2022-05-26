import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SrmediasController } from './srmedias.controller';
import { SrmediasService } from './srmedias.service';
import { Srmedia } from './entities/srmedia.entity';

describe('SrmediaController', () => {
  // let controller: SrmediasController;
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SrmediasController],
  //     providers: [
  //       SrmediasService,
  //       {
  //         provide: getRepositoryToken(Srmedia),
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();
  //   controller = module.get<SrmediasController>(SrmediasController);
  // });
  // it("should be defined", () => {
  //   expect(controller).toBeDefined();
  // });
});
