import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrlandsService } from './srlands.service';
import { Srland } from './entities/srland.entity';

describe('SrlandsService', () => {
  let service: SrlandsService;
  let repo: Repository<Srland>;
  const oneSrland = new Srland({
    siteId: '123',
    landUse: 'land1',
    noteString: 'note1',
  });
  const twoSrland = new Srland({
    siteId: '321',
    landUse: 'land2',
    noteString: 'note2',
  });
  const threeSiteId = '987';
  const threeLandUse = 'land3';
  const threeNoteString = 'note3';
  const newSrland = {
    siteId: threeSiteId,
    landUse: threeLandUse,
    noteString: threeNoteString,
  };
  const threeSrland = new Srland({
    siteId: threeSiteId,
    landUse: threeLandUse,
    noteString: threeNoteString,
  });
  const srlandArray = [oneSrland, twoSrland];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SrlandsService,
        {
          provide: getRepositoryToken(Srland),
          useValue: {
            // mock repository functions for testing
            find: jest.fn().mockResolvedValue(srlandArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneSrland),
            create: jest.fn().mockReturnValue(threeSrland),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    service = module.get<SrlandsService>(SrlandsService);
    repo = module.get<Repository<Srland>>(getRepositoryToken(Srland));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createOne', () => {
    it('should successfully add a srland', () => {
      expect(service.create(newSrland)).resolves.toEqual(threeSrland);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(newSrland);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('findAll', () => {
    it('should return an array of srlands', async () => {
      const srlands = await service.findAll();
      expect(srlands).toEqual(srlandArray);
    });
  });
  describe('findOne', () => {
    it('should get a single srland', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(1)).resolves.toEqual(oneSrland);
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
