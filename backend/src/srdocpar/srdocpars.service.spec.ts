import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrdocparsService } from './srdocpars.service';
import { Srdocpar } from './entities/srdocpar.entity';

describe('SrdocparsService', () => {
  let service: SrdocparsService;
  let repo: Repository<Srdocpar>;
  const oneDocId = '123';
  const oneNameString = 'mydoc1';
  const oneRoleString = 'myrole1';
  const oneSrdocpar = new Srdocpar({
    docId: oneDocId,
    nameString: oneNameString,
    roleString: oneRoleString,
  });
  const twoSrdocpar = new Srdocpar({
    docId: '321',
    nameString: 'mydoc2',
    roleString: 'myrole2',
  });
  const newSrdocpar = {
    docId: '987',
    nameString: 'mydoc3',
    roleString: 'myrole3',
  };
  const threeSrdocpar = new Srdocpar({
    docId: '987',
    nameString: 'mydoc3',
    roleString: 'myrole3',
  });
  const srdocparArray = [oneSrdocpar, twoSrdocpar];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SrdocparsService,
        {
          provide: getRepositoryToken(Srdocpar),
          useValue: {
            // mock repository functions for testing
            find: jest.fn().mockResolvedValue(srdocparArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneSrdocpar),
            create: jest.fn().mockReturnValue(threeSrdocpar),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    service = module.get<SrdocparsService>(SrdocparsService);
    repo = module.get<Repository<Srdocpar>>(getRepositoryToken(Srdocpar));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createOne', () => {
    it('should successfully add a srdocpar', () => {
      expect(service.create(newSrdocpar)).resolves.toEqual(threeSrdocpar);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(newSrdocpar);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('findAll', () => {
    it('should return an array of srdocpars', async () => {
      const srdocpars = await service.findAll();
      expect(srdocpars).toEqual(srdocparArray);
    });
  });
  describe('findOne', () => {
    it('should get a single srdocpar', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(1)).resolves.toEqual(oneSrdocpar);
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
