import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SreventsService } from './srevents.service';
import { Srevent } from './entities/srevent.entity';

describe('SreventsService', () => {
  let service: SreventsService;
  let repo: Repository<Srevent>;
  const oneSrevent = new Srevent({
    siteId: '123',
    eventId: '123',
    eventType: 'eventType1',
    eventClass: 'eventClass1',
    eventDate: '2019-05-22',
    approvedDate: '2020-01-01',
    ministryContact: 'steve',
    noteString: 'Hello World!',
    requiredAction: 'big',
  });
  const twoSrevent = new Srevent({
    siteId: '321',
    eventId: '321',
    eventType: 'eventType2',
    eventClass: 'eventClass2',
    eventDate: '2019-05-23',
    approvedDate: '2020-01-02',
    ministryContact: 'agnes',
    noteString: '!dlroW olleH',
    requiredAction: 'small',
  });
  const threeSiteId = '987';
  const threeEventId = '987';
  const threeEventType = 'eventType3';
  const threeEventClass = 'eventClass3';
  const threeEventDate = '2020-11-10';
  const threeApprovedDate = '2020-11-12';
  const threeMinistryContact = 'bill';
  const threeNoteString = 'Hello World';
  const threeRequiredAction = 'none';

  const newSrevent = {
    siteId: threeSiteId,
    eventId: threeEventId,
    eventType: threeEventType,
    eventClass: threeEventClass,
    eventDate: threeEventDate,
    approvedDate: threeApprovedDate,
    ministryContact: threeMinistryContact,
    noteString: threeNoteString,
    requiredAction: threeRequiredAction,
  };
  const threeSrevent = new Srevent({
    siteId: threeSiteId,
    eventId: threeEventId,
    eventType: threeEventType,
    eventClass: threeEventClass,
    eventDate: threeEventDate,
    approvedDate: threeApprovedDate,
    ministryContact: threeMinistryContact,
    noteString: threeNoteString,
    requiredAction: threeRequiredAction,
  });
  const sreventArray = [oneSrevent, twoSrevent];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SreventsService,
        {
          provide: getRepositoryToken(Srevent),
          useValue: {
            // mock repository functions for testing
            find: jest.fn().mockResolvedValue(sreventArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneSrevent),
            create: jest.fn().mockReturnValue(threeSrevent),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    service = module.get<SreventsService>(SreventsService);
    repo = module.get<Repository<Srevent>>(getRepositoryToken(Srevent));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createOne', () => {
    it('should successfully add a srevent', () => {
      expect(service.create(newSrevent)).resolves.toEqual(threeSrevent);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(newSrevent);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('findAll', () => {
    it('should return an array of srevents', async () => {
      const srevents = await service.findAll();
      expect(srevents).toEqual(sreventArray);
    });
  });
  describe('findOne', () => {
    it('should get a single srevent', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(1)).resolves.toEqual(oneSrevent);
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
