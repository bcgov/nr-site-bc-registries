import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SrremedsController } from './srremeds.controller';
import { SrremedsService } from './srremeds.service';
import { Srremed } from './entities/srremed.entity';

describe('SrremedController', () => {
  // let controller: SrremedsController;
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [SrremedsController],
  //     providers: [
  //       SrremedsService,
  //       {
  //         provide: getRepositoryToken(Srremed),
  //         useValue: {},
  //       },
  //     ],
  //   }).compile();
  //   controller = module.get<SrremedsController>(SrremedsController);
  // });
  // it("should be defined", () => {
  //   expect(controller).toBeDefined();
  // });
});
