import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrassocsService } from './srassocs.service';
import { Srassoc } from './entities/srassoc.entity';

describe('SrassocsService', () => {
  let service: SrassocsService;
  let repo: Repository<Srassoc>;
  const oneSrassocAssociatedSiteId = '123';
  const oneSrassocEffectDate = '2020-05-30';
  const oneSrassocNoteString = 'Hello World';
  const oneSrassoc = new Srassoc({
    associatedSiteId: oneSrassocAssociatedSiteId,
    effectDate: oneSrassocEffectDate,
    noteString: oneSrassocNoteString,
  });
  const twoSrassoc = new Srassoc({ associatedSiteId: '321', effectDate: '2020-06-25', noteString: 'dlroW olleH' });
  const threeSrassocAssociatedSiteId = '987';
  const threeSrassocEffectDate = '2019-02-21';
  const threeSrassocNoteString = 'testing create';
  const newSrassoc = {
    associatedSiteId: threeSrassocAssociatedSiteId,
    effectDate: threeSrassocEffectDate,
    noteString: threeSrassocNoteString,
  };
  const threeSrassoc = new Srassoc({
    associatedSiteId: threeSrassocAssociatedSiteId,
    effectDate: threeSrassocEffectDate,
    noteString: threeSrassocNoteString,
  });
  const srassocArray = [oneSrassoc, twoSrassoc];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SrassocsService,
        {
          provide: getRepositoryToken(Srassoc),
          useValue: {
            // mock repository functions for testing
            find: jest.fn().mockResolvedValue(srassocArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneSrassoc),
            create: jest.fn().mockReturnValue(threeSrassoc),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            // update: jest.fn().mockResolvedValue(true),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    service = module.get<SrassocsService>(SrassocsService);
    repo = module.get<Repository<Srassoc>>(getRepositoryToken(Srassoc));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createOne', () => {
    it('should successfully add a srassoc', () => {
      expect(service.create(newSrassoc)).resolves.toEqual(threeSrassoc);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(newSrassoc);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('findAll', () => {
    it('should return an array of srassocs', async () => {
      const srassocs = await service.findAll();
      expect(srassocs).toEqual(srassocArray);
    });
  });
  describe('findOne', () => {
    it('should get a single srassoc', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(1)).resolves.toEqual(oneSrassoc);
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
