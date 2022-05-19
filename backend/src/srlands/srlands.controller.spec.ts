import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SrlandsController } from './srlands.controller';
import { SrlandsService } from './srlands.service';
import { Srland } from './entities/srland.entity';

describe('SrlandController', () => {
  // let controller: SrlandsController;
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SrlandsController],
  //     providers: [
  //       SrlandsService,
  //       {
  //         provide: getRepositoryToken(Srland),
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();
  //   controller = module.get<SrlandsController>(SrlandsController);
  // });
  // it("should be defined", () => {
  //   expect(controller).toBeDefined();
  // });
});
