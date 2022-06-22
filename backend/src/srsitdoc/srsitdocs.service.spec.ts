import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SrsitdocsService } from './srsitdocs.service';
import { Srsitdoc } from './entities/srsitdoc.entity';

describe('SrsitdocsService', () => {
  let service: SrsitdocsService;
  let repo: Repository<Srsitdoc>;
  const oneSrsitdoc = new Srsitdoc({
    siteId: '123',
    docId: '123',
    titleString: 'title1',
    submissionDate: '2020-01-01',
    documentDate: '2020-01-01',
    noteString: 'note1',
  });
  const twoSrsitdoc = new Srsitdoc({
    siteId: '321',
    docId: '321',
    titleString: 'title2',
    submissionDate: '2020-01-02',
    documentDate: '2020-01-02',
    noteString: 'note2',
  });
  const threeSiteId = '987';
  const threeDocId = '987';
  const threeTitleString = 'title3';
  const threeSubmissionDate = '2020-01-03';
  const threeDocumentDate = '2020-01-03';
  const threeNoteString = 'note3';
  const newSrsitdoc = {
    siteId: threeSiteId,
    docId: threeDocId,
    titleString: threeTitleString,
    submissionDate: threeSubmissionDate,
    documentDate: threeDocumentDate,
    noteString: threeNoteString,
  };
  const threeSrsitdoc = new Srsitdoc({
    siteId: threeSiteId,
    docId: threeDocId,
    titleString: threeTitleString,
    submissionDate: threeSubmissionDate,
    documentDate: threeDocumentDate,
    noteString: threeNoteString,
  });
  const srsitdocArray = [oneSrsitdoc, twoSrsitdoc];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SrsitdocsService,
        {
          provide: getRepositoryToken(Srsitdoc),
          useValue: {
            // mock repository functions for testing
            find: jest.fn().mockResolvedValue(srsitdocArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneSrsitdoc),
            create: jest.fn().mockReturnValue(threeSrsitdoc),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();
    service = module.get<SrsitdocsService>(SrsitdocsService);
    repo = module.get<Repository<Srsitdoc>>(getRepositoryToken(Srsitdoc));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createOne', () => {
    it('should successfully add a srsitdoc', () => {
      expect(service.create(newSrsitdoc)).resolves.toEqual(threeSrsitdoc);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(newSrsitdoc);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('findAll', () => {
    it('should return an array of srsitdocs', async () => {
      const srsitdocs = await service.findAll();
      expect(srsitdocs).toEqual(srsitdocArray);
    });
  });
  describe('findOne', () => {
    it('should get a single srsitdoc', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(1)).resolves.toEqual(oneSrsitdoc);
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
