import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrprfcatsService } from './srprfcats.service';
import { Srprfcat } from './entities/srprfcat.entity';

describe('SrprfcatsService', () => {
  let service: SrprfcatsService;
  let repo: Repository<Srprfcat>;
  const oneSrprfcat = new Srprfcat({
    categoryId: '123',
    sequenceNumber: '123',
    effectiveDate: '2020-01-15',
    expiryDate: '2020-02-25',
    questionType: 'q1',
    categoryDescription: 'cat1',
  });
  const twoSrprfcat = new Srprfcat({
    categoryId: '321',
    sequenceNumber: '321',
    effectiveDate: '2020-01-16',
    expiryDate: '2020-02-26',
    questionType: 'q2',
    categoryDescription: 'cat2',
  });
  const threeCategoryId = '987';
  const threeSequenceNumber = '987';
  const threeEffectiveDate = '2020-01-17';
  const threeExpiryDate = '2020-02-27';
  const threeQuestionType = 'q3';
  const threeCategoryDescription = 'cat3';
  const newSrprfcat = {
    categoryId: threeCategoryId,
    sequenceNumber: threeSequenceNumber,
    effectiveDate: threeEffectiveDate,
    expiryDate: threeExpiryDate,
    questionType: threeQuestionType,
    categoryDescription: threeCategoryDescription,
  };
  const threeSrprfcat = new Srprfcat({
    categoryId: threeCategoryId,
    sequenceNumber: threeSequenceNumber,
    effectiveDate: threeEffectiveDate,
    expiryDate: threeExpiryDate,
    questionType: threeQuestionType,
    categoryDescription: threeCategoryDescription,
  });
  const srprfcatArray = [oneSrprfcat, twoSrprfcat];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SrprfcatsService,
        {
          provide: getRepositoryToken(Srprfcat),
          useValue: {
            // mock repository functions for testing
            find: jest.fn().mockResolvedValue(srprfcatArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneSrprfcat),
            create: jest.fn().mockReturnValue(threeSrprfcat),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    service = module.get<SrprfcatsService>(SrprfcatsService);
    repo = module.get<Repository<Srprfcat>>(getRepositoryToken(Srprfcat));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createOne', () => {
    it('should successfully add a srprfcat', () => {
      expect(service.create(newSrprfcat)).resolves.toEqual(threeSrprfcat);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(newSrprfcat);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('findAll', () => {
    it('should return an array of srprfcats', async () => {
      const srprfcats = await service.findAll();
      expect(srprfcats).toEqual(srprfcatArray);
    });
  });
  describe('findOne', () => {
    it('should get a single srprfcat', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(1)).resolves.toEqual(oneSrprfcat);
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
