import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrmediasService } from './srmedias.service';
import { Srmedia } from './entities/srmedia.entity';

describe('SrmediaService', () => {
  // let service: SitesService;
  // let repo: Repository<Site>;
  // const oneSiteName = "Test Numone";
  // const oneSiteEamil = "numone@test.com";
  // const oneSite = new Site(oneSiteName, oneSiteEamil);
  // const updateSite = {
  //   name: oneSiteName,
  //   email: oneSiteEamil,
  // };
  // const twoSite = new Site("Test Numtwo", "numtwo@test.com");
  // const threeSiteName = "Test Numthree";
  // const threeSiteEamil = "numthree@test.com";
  // const newSite = {
  //   name: threeSiteName,
  //   email: threeSiteEamil,
  // };
  // const threeSite = new Site(threeSiteName, threeSiteEamil);
  // const siteArray = [oneSite, twoSite];
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       SitesService,
  //       {
  //         provide: getRepositoryToken(Sites),
  //         useValue: {
  //           // mock repository functions for testing
  //           find: jest.fn().mockResolvedValue(siteArray),
  //           findOneOrFail: jest.fn().mockResolvedValue(oneSite),
  //           create: jest.fn().mockReturnValue(threeSite),
  //           save: jest.fn(),
  //           // as these do not actually use their return values in our sample
  //           // we just make sure that their resolve is true to not crash
  //           update: jest.fn().mockResolvedValue(true),
  //           // as these do not actually use their return values in our sample
  //           // we just make sure that their resolve is true to not crash
  //           delete: jest.fn().mockResolvedValue(true),
  //         },
  //       },
  //     ],
  //   }).compile();
  //   service = module.get<SitesService>(SitesService);
  //   repo = module.get<Repository<Sites>>(getRepositoryToken(Sites));
  // });
  // it("should be defined", () => {
  //   expect(service).toBeDefined();
  // });
  // describe("createOne", () => {
  //   it("should successfully add a site", () => {
  //     expect(service.create(newSite)).resolves.toEqual(threeSite);
  //     expect(repo.create).toBeCalledTimes(1);
  //     expect(repo.create).toBeCalledWith(newSite);
  //     expect(repo.save).toBeCalledTimes(1);
  //   });
  // });
  // describe("findAll", () => {
  //   it("should return an array of sites", async () => {
  //     const sites = await service.findAll();
  //     expect(sites).toEqual(siteArray);
  //   });
  // });
  // describe("findOne", () => {
  //   it("should get a single site", () => {
  //     const repoSpy = jest.spyOn(repo, "findOneOrFail");
  //     expect(service.findOne(1)).resolves.toEqual(oneSite);
  //     expect(repoSpy).toBeCalledWith(1);
  //   });
  // });
  // describe("update", () => {
  //   it("should call the update method", async () => {
  //     const site = await service.update(1, updateSite);
  //     expect(site).toEqual(oneSite);
  //     expect(repo.update).toBeCalledTimes(1);
  //     expect(repo.update).toBeCalledWith({ id: 1 }, updateSite);
  //   });
  // });
  // describe("remove", () => {
  //   it("should return {deleted: true}", () => {
  //     expect(service.remove(2)).resolves.toEqual({ deleted: true });
  //   });
  //   it("should return {deleted: false, message: err.message}", () => {
  //     const repoSpy = jest
  //       .spyOn(repo, "delete")
  //       .mockRejectedValueOnce(new Error("Bad Delete Method."));
  //     expect(service.remove(-1)).resolves.toEqual({
  //       deleted: false,
  //       message: "Bad Delete Method.",
  //     });
  //     expect(repoSpy).toBeCalledWith(-1);
  //     expect(repoSpy).toBeCalledTimes(1);
  //   });
  // });
});
