import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrdatesService } from './srdates.service';
import { Srdate } from './entities/srdate.entity';

describe('SrdatesService', () => {
  let service: SrdatesService;
  let repo: Repository<Srdate>;
  const oneDownloadDate = '2022-04-21';
  const twoDownloadDate = '2022-04-22';
  const threeDownloadDate = '2022-04-23';
  const oneSrdate = new Srdate({
    downloaddate: oneDownloadDate,
  });
  const twoSrdate = new Srdate({
    downloaddate: twoDownloadDate,
  });
  const newSrdate = {
    downloaddate: threeDownloadDate,
  };
  const threeSrdate = new Srdate({
    downloaddate: threeDownloadDate,
  });
  const srdateArray = [oneSrdate, twoSrdate];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SrdatesService,
        {
          provide: getRepositoryToken(Srdate),
          useValue: {
            // mock repository functions for testing
            find: jest.fn().mockResolvedValue(srdateArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneSrdate),
            create: jest.fn().mockReturnValue(threeSrdate),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    service = module.get<SrdatesService>(SrdatesService);
    repo = module.get<Repository<Srdate>>(getRepositoryToken(Srdate));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createOne', () => {
    it('should successfully add a srdate', () => {
      expect(service.create(newSrdate)).resolves.toEqual(threeSrdate);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(newSrdate);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('findAll', () => {
    it('should return an array of srdates', async () => {
      const srdates = await service.findAll();
      expect(srdates).toEqual(srdateArray);
    });
  });
  describe('findOne', () => {
    it('should get a single srdate', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(1)).resolves.toEqual(oneSrdate);
      expect(repoSpy).toBeCalledWith(1);
    });
  });
  describe('remove', () => {
    it('should return {deleted: true}', () => {
      expect(service.remove(2)).resolves.toEqual({ deleted: true });
    });
    it('should return {deleted: false, message: err.message}', () => {
      const repoSpy = jest.spyOn(repo, 'delete').mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.remove(-1)).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
      expect(repoSpy).toBeCalledWith(-1);
      expect(repoSpy).toBeCalledTimes(1);
    });
  });
});
