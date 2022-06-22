import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrpinpidsService } from './srpinpids.service';
import { Srpinpid } from './entities/srpinpid.entity';

describe('SrpinpidsService', () => {
  let service: SrpinpidsService;
  let repo: Repository<Srpinpid>;
  const oneSrpinpid = new Srpinpid({
    siteId: '123',
    pin: '123',
    pid: '123',
    crownLandsFileNumber: 'clf1',
    legalDescription: 'legal1',
    dateNoted: '2022-12-12',
  });
  const twoSrpinpid = new Srpinpid({
    siteId: '321',
    pin: '321',
    pid: '321',
    crownLandsFileNumber: 'clf2',
    legalDescription: 'legal2',
    dateNoted: '2022-12-13',
  });
  const threeSiteId = '987';
  const threePin = '987';
  const threePid = '987';
  const threeCrownLandsFileNumber = 'clf3';
  const threeLegalDescription = 'legal3';
  const threeDateNoted = '2022-12-14';
  const newSrpinpid = {
    siteId: threeSiteId,
    pin: threePin,
    pid: threePid,
    crownLandsFileNumber: threeCrownLandsFileNumber,
    legalDescription: threeLegalDescription,
    dateNoted: threeDateNoted,
  };
  const threeSrpinpid = new Srpinpid({
    siteId: threeSiteId,
    pin: threePin,
    pid: threePid,
    crownLandsFileNumber: threeCrownLandsFileNumber,
    legalDescription: threeLegalDescription,
    dateNoted: threeDateNoted,
  });
  const srpinpidArray = [oneSrpinpid, twoSrpinpid];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SrpinpidsService,
        {
          provide: getRepositoryToken(Srpinpid),
          useValue: {
            // mock repository functions for testing
            find: jest.fn().mockResolvedValue(srpinpidArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneSrpinpid),
            create: jest.fn().mockReturnValue(threeSrpinpid),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    service = module.get<SrpinpidsService>(SrpinpidsService);
    repo = module.get<Repository<Srpinpid>>(getRepositoryToken(Srpinpid));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createOne', () => {
    it('should successfully add a srpinpid', () => {
      expect(service.create(newSrpinpid)).resolves.toEqual(threeSrpinpid);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(newSrpinpid);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('findAll', () => {
    it('should return an array of srpinpids', async () => {
      const srpinpids = await service.findAll();
      expect(srpinpids).toEqual(srpinpidArray);
    });
  });
  describe('findOne', () => {
    it('should get a single srpinpid', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(1)).resolves.toEqual(oneSrpinpid);
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
