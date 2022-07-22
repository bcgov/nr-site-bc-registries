import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrprfquesService } from './srprfques.service';
import { Srprfque } from './entities/srprfque.entity';

describe('SrprfquesService', () => {
  let service: SrprfquesService;
  let repo: Repository<Srprfque>;
  const oneSrprfque = new Srprfque({
    questionId: '123',
    categoryId: '123',
    sequenceNumber: '123',
    parentQuestionId: '123',
    effectiveDate: '2020-01-01',
    expiryDate: '2020-01-01',
    questionDescription: 'qd1',
  });
  const twoSrprfque = new Srprfque({
    questionId: '123',
    categoryId: '123',
    sequenceNumber: '123',
    parentQuestionId: '123',
    effectiveDate: '2020-01-02',
    expiryDate: '2020-01-02',
    questionDescription: 'qd2',
  });
  const threeQuestionId = '987';
  const threeCategoryId = '987';
  const threeSequenceNumber = '987';
  const threeParentQuestionId = '987';
  const threeEffectiveDate = '2020-01-03';
  const threeExpiryDate = '2020-01-03';
  const threeQuestionDescription = 'qd3';
  const newSrprfque = {
    questionId: threeQuestionId,
    categoryId: threeCategoryId,
    sequenceNumber: threeSequenceNumber,
    effectiveDate: threeEffectiveDate,
    expiryDate: threeExpiryDate,
    parentQuestionId: threeParentQuestionId,
    questionDescription: threeQuestionDescription,
  };
  const threeSrprfque = new Srprfque({
    questionId: threeQuestionId,
    categoryId: threeCategoryId,
    sequenceNumber: threeSequenceNumber,
    effectiveDate: threeEffectiveDate,
    expiryDate: threeExpiryDate,
    parentQuestionId: threeParentQuestionId,
    questionDescription: threeQuestionDescription,
  });
  const srprfqueArray = [oneSrprfque, twoSrprfque];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SrprfquesService,
        {
          provide: getRepositoryToken(Srprfque),
          useValue: {
            // mock repository functions for testing
            find: jest.fn().mockResolvedValue(srprfqueArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneSrprfque),
            create: jest.fn().mockReturnValue(threeSrprfque),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    service = module.get<SrprfquesService>(SrprfquesService);
    repo = module.get<Repository<Srprfque>>(getRepositoryToken(Srprfque));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createOne', () => {
    it('should successfully add a srprfque', () => {
      expect(service.create(newSrprfque)).resolves.toEqual(threeSrprfque);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(newSrprfque);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('findAll', () => {
    it('should return an array of srprfques', async () => {
      const srprfques = await service.findAll();
      expect(srprfques).toEqual(srprfqueArray);
    });
  });
  describe('findOne', () => {
    it('should get a single srprfque', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(1)).resolves.toEqual(oneSrprfque);
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
