import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrparrolsService } from './srparrols.service';
import { Srparrol } from './entities/srparrol.entity';

describe('SrparrolsService', () => {
  let service: SrparrolsService;
  let repo: Repository<Srparrol>;
  const oneSrparrol = new Srparrol({
    participantId: '123',
    roleString: 'role1',
  });
  const twoSrparrol = new Srparrol({
    participantId: '321',
    roleString: 'role2',
  });
  const threeParticipantId = '987';
  const threeRoleString = 'role3';
  const newSrparrol = {
    participantId: threeParticipantId,
    roleString: threeRoleString,
  };
  const threeSrparrol = new Srparrol({
    participantId: threeParticipantId,
    roleString: threeRoleString,
  });
  const srparrolArray = [oneSrparrol, twoSrparrol];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SrparrolsService,
        {
          provide: getRepositoryToken(Srparrol),
          useValue: {
            // mock repository functions for testing
            find: jest.fn().mockResolvedValue(srparrolArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneSrparrol),
            create: jest.fn().mockReturnValue(threeSrparrol),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    service = module.get<SrparrolsService>(SrparrolsService);
    repo = module.get<Repository<Srparrol>>(getRepositoryToken(Srparrol));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createOne', () => {
    it('should successfully add a srparrol', () => {
      expect(service.create(newSrparrol)).resolves.toEqual(threeSrparrol);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(newSrparrol);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('findAll', () => {
    it('should return an array of srparrols', async () => {
      const srparrols = await service.findAll();
      expect(srparrols).toEqual(srparrolArray);
    });
  });
  describe('findOne', () => {
    it('should get a single srparrol', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne('123')).resolves.toEqual(oneSrparrol);
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
