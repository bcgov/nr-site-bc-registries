import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrevpartsService } from './srevparts.service';
import { Srevpart } from './entities/srevpart.entity';

describe('SrevpartsService', () => {
  let service: SrevpartsService;
  let repo: Repository<Srevpart>;
  const oneSrevpart = new Srevpart({
    eventId: '123',
    nameString: 'name1',
    roleString: 'role1',
  });
  const twoSrevpart = new Srevpart({
    eventId: '321',
    nameString: 'name2',
    roleString: 'role2',
  });
  const threeEventId = '987';
  const threeNameString = 'name3';
  const threeRoleString = 'role3';
  const newSrevpart = {
    eventId: threeEventId,
    nameString: threeNameString,
    roleString: threeRoleString,
  };
  const threeSrevpart = new Srevpart({
    eventId: threeEventId,
    nameString: threeNameString,
    roleString: threeRoleString,
  });
  const srevpartArray = [oneSrevpart, twoSrevpart];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SrevpartsService,
        {
          provide: getRepositoryToken(Srevpart),
          useValue: {
            // mock repository functions for testing
            find: jest.fn().mockResolvedValue(srevpartArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneSrevpart),
            create: jest.fn().mockReturnValue(threeSrevpart),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    service = module.get<SrevpartsService>(SrevpartsService);
    repo = module.get<Repository<Srevpart>>(getRepositoryToken(Srevpart));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createOne', () => {
    it('should successfully add a srevpart', () => {
      expect(service.create(newSrevpart)).resolves.toEqual(threeSrevpart);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(newSrevpart);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('findAll', () => {
    it('should return an array of srevparts', async () => {
      const srevparts = await service.findAll();
      expect(srevparts).toEqual(srevpartArray);
    });
  });
  describe('findOne', () => {
    it('should get a single srevpart', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(1)).resolves.toEqual(oneSrevpart);
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
