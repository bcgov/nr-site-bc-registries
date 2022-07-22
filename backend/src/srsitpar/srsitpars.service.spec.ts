import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrsitparsService } from './srsitpars.service';
import { Srsitpar } from './entities/srsitpar.entity';

describe('SrsitparsService', () => {
  let service: SrsitparsService;
  let repo: Repository<Srsitpar>;
  const oneSrsitpar = new Srsitpar({
    siteId: '123',
    participantId: '123',
    nameString: 'name1',
    effectiveDate: '2020-01-01',
    endDate: '2020-01-01',
    noteString: 'note1',
    participantType: 'type1',
  });
  const twoSrsitpar = new Srsitpar({
    siteId: '321',
    participantId: '321',
    nameString: 'name2',
    effectiveDate: '2020-01-02',
    endDate: '2020-01-02',
    noteString: 'note2',
    participantType: 'type2',
  });
  const threeSiteId = '987';
  const threeParticipantId = '987';
  const threeNameString = 'name3';
  const threeEffectiveDate = '2020-01-03';
  const threeEndDate = '2020-01-03';
  const threeNoteString = 'note3';
  const threeParticipantType = 'type3';
  const newSrsitpar = {
    siteId: threeSiteId,
    participantId: threeParticipantId,
    nameString: threeNameString,
    effectiveDate: threeEffectiveDate,
    endDate: threeEndDate,
    noteString: threeNoteString,
    participantType: threeParticipantType,
  };
  const threeSrsitpar = new Srsitpar({
    siteId: threeSiteId,
    participantId: threeParticipantId,
    nameString: threeNameString,
    effectiveDate: threeEffectiveDate,
    endDate: threeEndDate,
    noteString: threeNoteString,
    participantType: threeParticipantType,
  });
  const srsitparArray = [oneSrsitpar, twoSrsitpar];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SrsitparsService,
        {
          provide: getRepositoryToken(Srsitpar),
          useValue: {
            // mock repository functions for testing
            find: jest.fn().mockResolvedValue(srsitparArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneSrsitpar),
            create: jest.fn().mockReturnValue(threeSrsitpar),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    service = module.get<SrsitparsService>(SrsitparsService);
    repo = module.get<Repository<Srsitpar>>(getRepositoryToken(Srsitpar));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createOne', () => {
    it('should successfully add a srsitpar', () => {
      expect(service.create(newSrsitpar)).resolves.toEqual(threeSrsitpar);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(newSrsitpar);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('findAll', () => {
    it('should return an array of srsitpars', async () => {
      const srsitpars = await service.findAll();
      expect(srsitpars).toEqual(srsitparArray);
    });
  });
  describe('findOne', () => {
    it('should get a single srsitpar', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(1)).resolves.toEqual(oneSrsitpar);
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
