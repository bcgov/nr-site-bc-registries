import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrprfansService } from './srprfans.service';
import { Srprfan } from './entities/srprfan.entity';

describe('SrprfansService', () => {
  let service: SrprfansService;
  let repo: Repository<Srprfan>;
  const oneSrprfan = new Srprfan({
    siteId: '123',
    questionId: '123',
    dateCompleted: '2020-01-20',
    answer: 'yes',
  });
  const twoSrprfan = new Srprfan({
    siteId: '321',
    questionId: '321',
    dateCompleted: '2020-01-21',
    answer: 'no',
  });
  const threeSiteId = '987';
  const threeQuestionId = '987';
  const threeDateCompleted = '2020-01-22';
  const threeAnswer = 'maybe';
  const newSrprfan = {
    siteId: threeSiteId,
    questionId: threeQuestionId,
    dateCompleted: threeDateCompleted,
    answer: threeAnswer,
  };
  const threeSrprfan = new Srprfan({
    siteId: threeSiteId,
    questionId: threeQuestionId,
    dateCompleted: threeDateCompleted,
    answer: threeAnswer,
  });
  const srprfanArray = [oneSrprfan, twoSrprfan];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SrprfansService,
        {
          provide: getRepositoryToken(Srprfan),
          useValue: {
            // mock repository functions for testing
            find: jest.fn().mockResolvedValue(srprfanArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneSrprfan),
            create: jest.fn().mockReturnValue(threeSrprfan),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    service = module.get<SrprfansService>(SrprfansService);
    repo = module.get<Repository<Srprfan>>(getRepositoryToken(Srprfan));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createOne', () => {
    it('should successfully add a srprfan', () => {
      expect(service.create(newSrprfan)).resolves.toEqual(threeSrprfan);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(newSrprfan);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('findAll', () => {
    it('should return an array of srprfans', async () => {
      const srprfans = await service.findAll();
      expect(srprfans).toEqual(srprfanArray);
    });
  });
  describe('findOne', () => {
    it('should get a single srprfan', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(1)).resolves.toEqual(oneSrprfan);
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
