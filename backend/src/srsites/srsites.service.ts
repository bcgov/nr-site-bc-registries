import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Srsite } from './entities/srsite.entity';
import { In, Not } from 'typeorm';
import { CreateSrsiteDto } from './dto/create-srsite.dto';
import { UpdateSrsiteDto } from './dto/update-srsite.dto';
import { Srpinpid } from '../srpinpid/entities/srpinpid.entity';

import {
  filterSrprofil,
  getCurrentTime,
  getTodaysDate,
  isInsideArea,
  sortJsonArrayAsc,
  sortJsonArrayDesc,
} from '../../utils/util';
import { Srevent } from '../srevents/entities/srevent.entity';
import { Srsitpar } from '../srsitpar/entities/srsitpar.entity';
import { Srland } from '../srlands/entities/srland.entity';
import { Srassoc } from '../srassocs/entities/srassoc.entity';
import { Srsitdoc } from '../srsitdoc/entities/srsitdoc.entity';
import { MinimalSiteData } from 'utils/constants';
import { Srevpart } from '../srevpart/entities/srevpart.entity';
import { Srdate } from '../srdate/entities/srdate.entity';
import { Srdocpar } from '../srdocpar/entities/srdocpar.entity';
import { Srprofil } from '../srprofil/entities/srprofil.entity';
import { Srprfuse } from '../srprfuse/entities/srprfuse.entity';
import { Srprfque } from '../srprfque/entities/srprfque.entity';
import { Srprfan } from '../srprfans/entities/srprfan.entity';

@Injectable()
export class SrsitesService {
  constructor(
    @InjectRepository(Srsite)
    private srsitesRepository: Repository<Srsite>,
    @InjectRepository(Srpinpid)
    private srpinpidsRepository: Repository<Srpinpid>,
    @InjectRepository(Srevent)
    private sreventsRepository: Repository<Srevent>,
    @InjectRepository(Srevpart)
    private srevpartsRepository: Repository<Srevpart>,
    @InjectRepository(Srsitdoc)
    private srsitdocsRepository: Repository<Srsitdoc>,
    @InjectRepository(Srsitpar)
    private srsitparsRepository: Repository<Srsitpar>,
    @InjectRepository(Srdocpar)
    private srdocparsRepository: Repository<Srdocpar>,
    @InjectRepository(Srland)
    private srlandsRepository: Repository<Srland>,
    @InjectRepository(Srprfuse)
    private srprfusesRepository: Repository<Srprfuse>,
    @InjectRepository(Srassoc)
    private srassocsRepository: Repository<Srassoc>,
    @InjectRepository(Srdate)
    private srdatesRepository: Repository<Srdate>,
    @InjectRepository(Srprofil)
    private srprofilsRepository: Repository<Srprofil>,
    @InjectRepository(Srprfque)
    private srprfquesRepository: Repository<Srprfque>,
    @InjectRepository(Srprfan)
    private srprfansRepository: Repository<Srprfan>
  ) {}

  async create(srsite: CreateSrsiteDto): Promise<Srsite> {
    const newSrsite = this.srsitesRepository.create(srsite);
    await this.srsitesRepository.save(newSrsite);
    return newSrsite;
  }

  async findAll(): Promise<Srsite[]> {
    return this.srsitesRepository.find();
  }

  async findOne(id: number): Promise<Srsite> {
    return this.srsitesRepository.findOneOrFail(id);
  }

  async countEntries(): Promise<number> {
    const numEntries = (await this.srsitesRepository.findAndCount())[1];
    return numEntries;
  }

  async searchPid(pid: string): Promise<MinimalSiteData[]> {
    // add zeroes to the front of the string
    let pidWithZeroes = pid;
    for (let i = 0; i < 9 - pid.length; i++) {
      pidWithZeroes = '0' + pidWithZeroes;
    }
    let srpinpids: any;
    let site: any;
    const sites: MinimalSiteData[] = [];
    try {
      srpinpids = await this.srpinpidsRepository.find({ pid: pidWithZeroes });
    } catch (err) {
      return [];
    }
    try {
      for (let srpinpid of srpinpids) {
        site = await this.srsitesRepository.findOneOrFail({ siteId: srpinpid.siteId });
        sites.push({
          siteId: site.siteId,
          city: site.address_1 ? site.address_1 + ', ' + site.city : site.city,
          updatedDate:
            site.modifiedDate != ''
              ? site.modifiedDate
              : site.registeredDate != ''
              ? site.registeredDate
              : site.detailRemovedDate,
          pending: site.status == 'PENDING' ? 'PENDING' : '',
        });
      }
    } catch (err) {
      return [];
    }
    return sites;
  }

  async searchCrownPin(pin: string): Promise<MinimalSiteData[]> {
    // add zeroes to the front of the string
    let pinWithZeroes = pin;
    for (let i = 0; i < 9 - pin.length; i++) {
      pinWithZeroes = '0' + pinWithZeroes;
    }
    let srpinpids: any;
    let site: any;
    const sites: MinimalSiteData[] = [];
    try {
      srpinpids = await this.srpinpidsRepository.find({ pin: pinWithZeroes });
    } catch (err) {
      return [];
    }
    try {
      for (let srpinpid of srpinpids) {
        site = await this.srsitesRepository.findOneOrFail({ siteId: srpinpid.siteId });
        sites.push({
          siteId: site.siteId,
          city: site.address_1 ? site.address_1 + ', ' + site.city : site.city,
          updatedDate:
            site.modifiedDate != ''
              ? site.modifiedDate
              : site.registeredDate != ''
              ? site.registeredDate
              : site.detailRemovedDate,
          pending: site.status == 'PENDING' ? 'PENDING' : '',
        });
      }
    } catch (err) {
      return [];
    }
    return sites;
  }

  async searchCrownFile(crownLandsFileNumber: string): Promise<MinimalSiteData[]> {
    let srpinpids: any;
    let site: any;
    const sites: MinimalSiteData[] = [];
    try {
      srpinpids = await this.srpinpidsRepository.find({ crownLandsFileNumber: crownLandsFileNumber });
    } catch (err) {
      return [];
    }
    try {
      for (let srpinpid of srpinpids) {
        site = await this.srsitesRepository.findOneOrFail({ siteId: srpinpid.siteId });
        sites.push({
          siteId: site.siteId,
          city: site.address_1 ? site.address_1 + ', ' + site.city : site.city,
          updatedDate:
            site.modifiedDate != ''
              ? site.modifiedDate
              : site.registeredDate != ''
              ? site.registeredDate
              : site.detailRemovedDate,
          pending: site.status == 'PENDING' ? 'PENDING' : '',
        });
      }
    } catch (err) {
      return [];
    }
    return sites;
  }

  async searchSiteId(siteId: string): Promise<MinimalSiteData[]> {
    let siteIdWithZeroes = siteId;
    for (let i = 0; i < 10 - siteId.length; i++) {
      siteIdWithZeroes = '0' + siteIdWithZeroes;
    }
    let site: any;
    try {
      site = await this.srsitesRepository.findOneOrFail({ siteId: siteIdWithZeroes });
    } catch (err) {
      return [];
    }
    return [
      {
        siteId: site.siteId,
        city: site.address_1 ? site.address_1 + ', ' + site.city : site.city,
        updatedDate:
          site.modifiedDate != ''
            ? site.modifiedDate
            : site.registeredDate != ''
            ? site.registeredDate
            : site.detailRemovedDate,
        pending: site.status == 'PENDING' ? 'PENDING' : '',
      },
    ];
  }

  async searchAddress(address: string, city: string): Promise<MinimalSiteData[]> {
    const cityPattern = `^${city.toLowerCase()}[a-zA-Z]*`;
    const re = new RegExp(cityPattern);
    let sites: any;
    let sitesArray: MinimalSiteData[] = [];
    try {
      sites = await this.srsitesRepository.createQueryBuilder().where(`LOWER(address_1) LIKE '%${address}%'`).getMany();
    } catch (err) {
      return [];
    }
    for (let site of sites) {
      if (re.test(site.city.toLowerCase())) {
        sitesArray.push({
          siteId: site.siteId,
          city: site.address_1 ? site.address_1 + ', ' + site.city : site.city,
          updatedDate:
            site.modifiedDate != ''
              ? site.modifiedDate
              : site.registeredDate != ''
              ? site.registeredDate
              : site.detailRemovedDate,
          pending: site.status == 'PENDING' ? 'PENDING' : '',
        });
      }
    }
    return sitesArray;
  }

  async searchArea(lat: string, lng: string, size: string): Promise<MinimalSiteData[]> {
    const radius = size == 'Small' ? 500 : size == 'Large' ? 5000 : 0;
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    const userLatlng = { lat: userLat, lng: userLng };
    const sites: MinimalSiteData[] = [];
    const allSites = await this.findAll();
    for (let site of allSites) {
      const lat = parseFloat([site.lat.slice(0, 3), '.', site.lat.slice(3)].join(''));
      const lng = parseFloat([site.lon.slice(0, 3), '.', site.lon.slice(3)].join(''));
      const latlng = { lat: lat, lng: lng };
      if (isInsideArea(userLatlng, latlng, radius))
        sites.push({
          siteId: site.siteId,
          city: site.address_1 ? site.address_1 + ', ' + site.city : site.city,
          updatedDate:
            site.modifiedDate != ''
              ? site.modifiedDate
              : site.registeredDate != ''
              ? site.registeredDate
              : site.detailRemovedDate,
          pending: site.status == 'PENDING' ? 'PENDING' : '',
        });
    }
    return sites;
  }

  async getSynopsisReportData(siteId: string) {
    const srevents = await this.sreventsRepository.findAndCount({ siteId: siteId });
    const srsitdoc = await this.srsitdocsRepository.findAndCount({ siteId: siteId });
    const srsitpars = await this.srsitparsRepository.findAndCount({ siteId: siteId });
    const srlands = await this.srlandsRepository.findAndCount({ siteId: siteId });
    const srassocs = await this.srassocsRepository.findAndCount({ siteId: siteId });
    const srsite = await this.srsitesRepository.findOneOrFail({ siteId: siteId });
    const srdate = await this.srdatesRepository.find();
    const srpinpids = await this.srpinpidsRepository.findAndCount({ siteId: siteId });
    const srprofil = await this.srprofilsRepository.find({ siteId: siteId });
    const srprfuses = await this.srprfusesRepository.find({ siteId: siteId });
    const srprfans = await this.srprfansRepository.find({ siteId: siteId });
    const srprfques = await this.srprfquesRepository.find();
    let numAssocs = srassocs[1];
    let numParcelDescs = 0;

    for (let entry of srpinpids[0]) {
      if (entry.pid != '' || entry.pin != '' || entry.crownLandsFileNumber != '') {
        numParcelDescs++;
      }
    }

    // site associations array grabs from srassocs table & other sites with the same pid
    let addedAssocSites: string[] = [];
    for (let entry of srassocs[0]) {
      addedAssocSites.push(entry.associatedSiteId);
    }
    let allPids = [];
    for (let entry of srpinpids[0]) {
      allPids.push(entry.pid);
    }
    const sameParcelId = await this.srpinpidsRepository.find({
      where: { pid: In(allPids), siteId: Not(siteId) },
    });
    for (let entry of sameParcelId) {
      if (entry.pid != '') {
        if (!addedAssocSites.includes(entry.siteId)) {
          numAssocs++;
          addedAssocSites.push(entry.siteId); // don't add the associated site multiple times
        }
      }
    }

    // construct strings for displaying lat/lon
    let latSec = parseFloat(srsite.latSec.slice(0, 2) + '.' + srsite.latSec.slice(2))
      .toFixed(1)
      .toString();
    if (latSec.length == 3) latSec = '0' + latSec;
    const lat = parseInt(srsite.latDeg) + 'd ' + parseInt(srsite.latMin) + 'm ' + latSec + 's';
    let lonSec = parseFloat(srsite.lonSec.slice(0, 2) + '.' + srsite.lonSec.slice(2))
      .toFixed(1)
      .toString();
    if (lonSec.length == 3) lonSec = '0' + lonSec;
    const lon = parseInt(srsite.lonDeg) + 'd ' + parseInt(srsite.lonMin) + 'm ' + lonSec + 's';

    // get land uses
    let landUse = [];
    for (let entry of srprfuses) {
      let landUseObject = {};
      landUseObject['code'] = entry.landUseCode;
      landUseObject['codeString'] = entry.landUseString;
      landUse.push(landUseObject);
    }

    // filter out all but the most recent site profile
    const filteredSrprofil = filterSrprofil(srprofil);
    let profiles = [];
    for (let entry of filteredSrprofil) {
      // get questions and answers, question id determines array index
      let qna = Array(30);
      for (let i = 0; i < 30; i++) {
        qna[i] = { question: '', answer: '' };
      }
      srprfques.sort(sortJsonArrayDesc('questionId'));
      for (let entry of srprfques) {
        let qnaObject = {};
        let questionDescription = entry.questionDescription ? entry.questionDescription : '';
        qnaObject['question'] = questionDescription;
        qnaObject['answer'] = '';
        const index = parseInt(entry.questionId) - 1;
        qna[index] = qnaObject;
      }
      // sort ascending so that the most recent answers overwrite older answers in this loop
      srprfans.sort(sortJsonArrayAsc('dateCompleted'));
      for (let entry of srprfans) {
        const index = parseInt(entry.questionId) - 1;
        qna[index].answer = entry.answer;
      }
      entry['qna'] = qna; // add the qna portion for each individual site profile
      profiles.push(entry);
    }

    return {
      siteId: parseInt(siteId),
      account: 'user_account',
      downloaddate: srdate[0].downloaddate,
      todaysDate: getTodaysDate(),
      currentTime: getCurrentTime(),
      victoriaFileNumber: srsite.victoriaFileNumber,
      regionalFileNumber: srsite.regionalFileNumber,
      region: srsite.region,
      lat: lat,
      lon: lon,
      commonName: srsite.commonName,
      address_1: srsite.address_1,
      address_2: srsite.address_2,
      city: srsite.city,
      postalCode: srsite.postalCode,
      provState: srsite.provState,
      registeredDate: srsite.registeredDate,
      modifiedDate: srsite.modifiedDate,
      detailRemovedDate: srsite.detailRemovedDate,
      notations: srevents[1],
      participants: srsitpars[1],
      assocSites: numAssocs,
      documents: srsitdoc[1],
      suspLandUse: srlands[1],
      parcelDesc: numParcelDescs,
      locationDescription: srsite.locationDescription,
      status: srsite.status,
      classification: srsite.classification,
      siteProfileData: profiles, // site profile information
      landUse: landUse, // land use information
    };
  }

  async getDetailsReportData(siteId: string) {
    const startTime = new Date().getTime();
    console.log('Starting details report db section');
    const srevents = await this.sreventsRepository.findAndCount({ siteId: siteId });
    const srsitdoc = await this.srsitdocsRepository.findAndCount({ siteId: siteId });
    const srsitpars = await this.srsitparsRepository.findAndCount({ siteId: siteId });
    const srlands = await this.srlandsRepository.findAndCount({ siteId: siteId });
    const srassocs = await this.srassocsRepository.findAndCount({ siteId: siteId });
    const srsite = await this.srsitesRepository.findOneOrFail({ siteId: siteId });
    const srdate = await this.srdatesRepository.find();
    const srpinpids = await this.srpinpidsRepository.find({ siteId: siteId });
    const srprofil = await this.srprofilsRepository.find({ siteId: siteId });
    const srprfuses = await this.srprfusesRepository.find({ siteId: siteId });
    const srprfans = await this.srprfansRepository.find({ siteId: siteId });
    const srprfques = await this.srprfquesRepository.find();
    let numAssocs = srassocs[1];
    let numParcelDescs = 0;

    for (let entry of srpinpids) {
      if (entry.pid != '' || entry.pin != '' || entry.crownLandsFileNumber != '') {
        numParcelDescs++;
      }
    }

    // add corresponding participants to each notation
    for (let entry of srevents[0]) {
      const eventId = entry.eventId;
      const srevparts = await this.srevpartsRepository.find({ eventId });
      entry['participantsArray'] = srevparts;
    }
    // add corresponding participants to each document
    for (let entry of srsitdoc[0]) {
      const docId = entry.docId;
      const srdocpar = await this.srdocparsRepository.find({ docId: docId });
      entry['participantsArray'] = srdocpar;
    }

    // site associations array grabs from srassocs table & other sites with the same pid
    let associatedSitesArray = [];
    let addedAssocSites: string[] = [];
    for (let entry of srassocs[0]) {
      addedAssocSites.push(entry.associatedSiteId);
      let assocObject = {};
      assocObject['siteId'] = entry.associatedSiteId;
      assocObject['effectDate'] = entry.effectDate;
      assocObject['noteString'] = entry.noteString;
      associatedSitesArray.push(assocObject);
    }

    let allPids = [];
    for (let entry of srpinpids) {
      allPids.push(entry.pid);
    }
    const sameParcelId = await this.srpinpidsRepository.find({
      where: { pid: In(allPids), siteId: Not(siteId) },
    });
    for (let entry of sameParcelId) {
      if (entry.pid != '') {
        if (!addedAssocSites.includes(entry.siteId)) {
          numAssocs++;
          addedAssocSites.push(entry.siteId); // don't add the associated site multiple times
          let assocObject = {};
          assocObject['siteId'] = entry.siteId;
          assocObject['effectDate'] = entry.dateNoted;
          assocObject['noteString'] = 'Same Parcel ID';
          associatedSitesArray.push(assocObject);
        }
      }
    }

    // suspect land uses array
    let suspectLandUsesArray = [];
    for (let entry of srlands[0]) {
      let suspectLandUseObj = {};
      suspectLandUseObj['landUse'] = entry.landUse;
      suspectLandUseObj['noteString'] = entry.noteString;
      suspectLandUsesArray.push(suspectLandUseObj);
    }

    // parcel descriptions array
    let parcelDescriptionsArray = [];
    for (let entry of srpinpids) {
      let parcelDescriptionObject = {};
      parcelDescriptionObject['dateNoted'] = entry.dateNoted;
      parcelDescriptionObject['pin'] = entry.pin;
      parcelDescriptionObject['pid'] = entry.pid;
      parcelDescriptionObject['crownLandsFileNumber'] = entry.crownLandsFileNumber;
      parcelDescriptionObject['legalDescription'] = entry.legalDescription;
      parcelDescriptionsArray.push(parcelDescriptionObject);
    }

    // construct strings for displaying lat/lon
    let latSec = parseFloat(srsite.latSec.slice(0, 2) + '.' + srsite.latSec.slice(2))
      .toFixed(1)
      .toString();
    if (latSec.length == 3) latSec = '0' + latSec;
    const lat = parseInt(srsite.latDeg) + 'd ' + parseInt(srsite.latMin) + 'm ' + latSec + 's';
    let lonSec = parseFloat(srsite.lonSec.slice(0, 2) + '.' + srsite.lonSec.slice(2))
      .toFixed(1)
      .toString();
    if (lonSec.length == 3) lonSec = '0' + lonSec;
    const lon = parseInt(srsite.lonDeg) + 'd ' + parseInt(srsite.lonMin) + 'm ' + lonSec + 's';

    // get land uses
    let landUse = [];
    for (let entry of srprfuses) {
      let landUseObject = {};
      landUseObject['code'] = entry.landUseCode;
      landUseObject['codeString'] = entry.landUseString;
      landUse.push(landUseObject);
    }

    srprofil.sort(sortJsonArrayDesc('dateReceived'));
    let profiles = [];
    for (let entry of srprofil) {
      // get questions and answers, question id determines array index
      let qna = Array(30);
      for (let i = 0; i < 30; i++) {
        qna[i] = { question: '', answer: '' };
      }
      srprfques.sort(sortJsonArrayDesc('questionId'));
      for (let entry of srprfques) {
        let qnaObject = {};
        let questionDescription = entry.questionDescription ? entry.questionDescription : '';
        qnaObject['question'] = questionDescription;
        qnaObject['answer'] = '';
        const index = parseInt(entry.questionId) - 1;
        qna[index] = qnaObject;
      }
      // sort ascending so that the most recent answers overwrite older answers in this loop
      srprfans.sort(sortJsonArrayAsc('dateCompleted'));
      for (let entry of srprfans) {
        const index = parseInt(entry.questionId) - 1;
        qna[index].answer = entry.answer;
      }
      entry['qna'] = qna; // add the qna portion for each individual site profile
      profiles.push(entry);
    }
    const endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000;
    console.log(`Returning database data, time taken: ${timeTaken} seconds`);
    return {
      siteId: parseInt(siteId),
      account: 'user_account',
      downloaddate: srdate[0].downloaddate,
      todaysDate: getTodaysDate(),
      currentTime: getCurrentTime(),
      victoriaFileNumber: srsite.victoriaFileNumber,
      regionalFileNumber: srsite.regionalFileNumber,
      region: srsite.region,
      lat: lat,
      lon: lon,
      commonName: srsite.commonName,
      address_1: srsite.address_1,
      address_2: srsite.address_2,
      city: srsite.city,
      postalCode: srsite.postalCode,
      provState: srsite.provState,
      registeredDate: srsite.registeredDate,
      modifiedDate: srsite.modifiedDate,
      detailRemovedDate: srsite.detailRemovedDate,
      notations: srevents[1],
      participants: srsitpars[1],
      assocSites: numAssocs,
      documents: srsitdoc[1],
      suspLandUse: srlands[1],
      parcelDesc: numParcelDescs,
      locationDescription: srsite.locationDescription,
      status: srsite.status,
      classification: srsite.classification,
      notationsArray: srevents[0],
      participantsArray: srsitpars[0],
      documentsArray: srsitdoc[0],
      associatedSitesArray: associatedSitesArray, // for now, just sites with the same parcel-id & those included in srassocs (there's only 1 entry)
      suspectLandUsesArray: suspectLandUsesArray, // description+notes array
      parcelDescriptionsArray: parcelDescriptionsArray, //date added,registrydate, clp, legal description
      siteProfileData: profiles, // site profile information
      landUse: landUse, // land use information
    };
  }

  async getNilReportData(): Promise<any> {
    const srdate = await this.srdatesRepository.find();
    return {
      todaysDate: getTodaysDate(),
      currentTime: getCurrentTime(),
      downloaddate: srdate[0].downloaddate,
    };
  }

  async getSearchResultsData(): Promise<any> {
    const srdate = await this.srdatesRepository.find();
    return {
      account: 'user_account',
      downloaddate: srdate[0].downloaddate,
      todaysDate: getTodaysDate(),
      currentTime: getCurrentTime(),
    };
  }

  async update(id: number, updateSrsiteDto: UpdateSrsiteDto): Promise<Srsite> {
    await this.srsitesRepository.update({ id }, updateSrsiteDto);
    return this.findOne(id);
  }

  async removeAll(): Promise<{ deleted: boolean; message?: string }> {
    try {
      const oldData = await this.findAll();
      for (const entry of oldData) {
        await this.srsitesRepository.delete(entry.id);
      }
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async remove(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.srsitesRepository.delete(id);
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
