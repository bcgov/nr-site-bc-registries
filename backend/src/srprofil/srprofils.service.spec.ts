import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrprofilsService } from './srprofils.service';
import { Srprofil } from './entities/srprofil.entity';

describe('SrprofilsService', () => {
  let service: SrprofilsService;
  let repo: Repository<Srprofil>;
  const oneSrprofil = new Srprofil({
    siteId: '123',
    dateCompleted: '2020-01-01',
    ownerParticipantId: '123',
    contactParticipantId: '123',
    completorParticipantId: '123',
    dateLocalAuthority: '2020-01-01',
    dateRegistrar: '2020-01-01',
    dateDecision: '2020-01-01',
    comments: 'c1',
  });
  const twoSrprofil = new Srprofil({
    siteId: '321',
    dateCompleted: '2020-01-02',
    ownerParticipantId: '321',
    contactParticipantId: '321',
    completorParticipantId: '321',
    dateLocalAuthority: '2020-01-02',
    dateRegistrar: '2020-01-02',
    dateDecision: '2020-01-02',
    comments: 'c2',
  });
  const threeSiteId = '987';
  const threeDateCompleted = '2020-01-03';
  const threeOwnerParticipantId = '987';
  const threeContactParticipantId = '987';
  const threeCompletorParticipantId = '987';
  const threeDateLocalAuthority = '2020-01-03';
  const threeDateRegistrar = '2020-01-03';
  const threeDateDecision = '2020-01-03';
  const threeComments = 'c3';
  const newSrprofil = {
    siteId: threeSiteId,
    dateCompleted: threeDateCompleted,
    ownerParticipantId: threeOwnerParticipantId,
    contactParticipantId: threeContactParticipantId,
    completorParticipantId: threeCompletorParticipantId,
    dateLocalAuthority: threeDateLocalAuthority,
    dateRegistrar: threeDateRegistrar,
    dateDecision: threeDateDecision,
    comments: threeComments,
  };
  const threeSrprofil = new Srprofil({
    siteId: threeSiteId,
    dateCompleted: threeDateCompleted,
    ownerParticipantId: threeOwnerParticipantId,
    contactParticipantId: threeContactParticipantId,
    completorParticipantId: threeCompletorParticipantId,
    dateLocalAuthority: threeDateLocalAuthority,
    dateRegistrar: threeDateRegistrar,
    dateDecision: threeDateDecision,
    comments: threeComments,
  });
  const srprofilArray = [oneSrprofil, twoSrprofil];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SrprofilsService,
        {
          provide: getRepositoryToken(Srprofil),
          useValue: {
            // mock repository functions for testing
            find: jest.fn().mockResolvedValue(srprofilArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneSrprofil),
            create: jest.fn().mockReturnValue(threeSrprofil),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    service = module.get<SrprofilsService>(SrprofilsService);
    repo = module.get<Repository<Srprofil>>(getRepositoryToken(Srprofil));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createOne', () => {
    it('should successfully add a srprofil', () => {
      expect(service.create(newSrprofil)).resolves.toEqual(threeSrprofil);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(newSrprofil);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('findAll', () => {
    it('should return an array of srprofils', async () => {
      const srprofils = await service.findAll();
      expect(srprofils).toEqual(srprofilArray);
    });
  });
  describe('findOne', () => {
    it('should get a single srprofil', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(1)).resolves.toEqual(oneSrprofil);
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
