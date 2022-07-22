import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrprfusesService } from './srprfuses.service';
import { Srprfuse } from './entities/srprfuse.entity';

describe('SrprfusesService', () => {
  let service: SrprfusesService;
  let repo: Repository<Srprfuse>;
  const oneSrprfuse = new Srprfuse({
    siteId: '123',
    dateCompleted: '2020-01-01',
    landUseCode: '123',
    landUseString: 'land1',
  });
  const twoSrprfuse = new Srprfuse({
    siteId: '321',
    dateCompleted: '2020-01-02',
    landUseCode: '321',
    landUseString: 'land2',
  });
  const threeSiteId = '987';
  const threeDateCompleted = '2020-01-03';
  const threeLandUseCode = '987';
  const threeLandUseString = 'land3';
  const newSrprfuse = {
    siteId: threeSiteId,
    dateCompleted: threeDateCompleted,
    landUseCode: threeLandUseCode,
    landUseString: threeLandUseString,
  };
  const threeSrprfuse = new Srprfuse({
    siteId: threeSiteId,
    dateCompleted: threeDateCompleted,
    landUseCode: threeLandUseCode,
    landUseString: threeLandUseString,
  });
  const srprfuseArray = [oneSrprfuse, twoSrprfuse];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SrprfusesService,
        {
          provide: getRepositoryToken(Srprfuse),
          useValue: {
            // mock repository functions for testing
            find: jest.fn().mockResolvedValue(srprfuseArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneSrprfuse),
            create: jest.fn().mockReturnValue(threeSrprfuse),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    service = module.get<SrprfusesService>(SrprfusesService);
    repo = module.get<Repository<Srprfuse>>(getRepositoryToken(Srprfuse));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createOne', () => {
    it('should successfully add a srprfuse', () => {
      expect(service.create(newSrprfuse)).resolves.toEqual(threeSrprfuse);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(newSrprfuse);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('findAll', () => {
    it('should return an array of srprfuses', async () => {
      const srprfuses = await service.findAll();
      expect(srprfuses).toEqual(srprfuseArray);
    });
  });
  describe('findOne', () => {
    it('should get a single srprfuse', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(1)).resolves.toEqual(oneSrprfuse);
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
