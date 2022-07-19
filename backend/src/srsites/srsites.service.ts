import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Srsite } from './entities/srsite.entity';

import { CreateSrsiteDto } from './dto/create-srsite.dto';
import { UpdateSrsiteDto } from './dto/update-srsite.dto';
import { Srpinpid } from '../srpinpid/entities/srpinpid.entity';

import { getCurrentTime, getTodaysDate, isInsideArea } from '../../utils/util';
import { Srevent } from '../srevents/entities/srevent.entity';
import { Srsitpar } from '../srsitpar/entities/srsitpar.entity';
import { Srland } from '../srlands/entities/srland.entity';
import { Srassoc } from '../srassocs/entities/srassoc.entity';
import { Srsitdoc } from '../srsitdoc/entities/srsitdoc.entity';
import { MinimalSiteData } from 'utils/constants';
import { Srevpart } from '../srevpart/entities/srevpart.entity';
import { Srdate } from '../srdate/entities/srdate.entity';
import { Srdocpar } from 'src/srdocpar/entities/srdocpar.entity';
import { Srprofil } from 'src/srprofil/entities/srprofil.entity';
import { Srprfuse } from 'src/srprfuse/entities/srprfuse.entity';

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
    private srprofilsRepository: Repository<Srprofil>
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
    let srpinpid: any;
    let site: any;
    try {
      srpinpid = await this.srpinpidsRepository.findOne({ pid: pidWithZeroes });
    } catch (err) {
      return [];
    }
    try {
      site = await this.srsitesRepository.findOneOrFail({ siteId: srpinpid.siteId });
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

  async searchCrownPin(pin: string): Promise<MinimalSiteData[]> {
    // add zeroes to the front of the string
    let pinWithZeroes = pin;
    for (let i = 0; i < 9 - pin.length; i++) {
      pinWithZeroes = '0' + pinWithZeroes;
    }
    let srpinpid: any;
    let site: any;
    try {
      srpinpid = await this.srpinpidsRepository.findOne({ pin: pinWithZeroes });
    } catch (err) {
      return [];
    }
    try {
      site = await this.srsitesRepository.findOneOrFail({ siteId: srpinpid.siteId });
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

  async searchCrownFile(crownLandsFileNumber: string): Promise<MinimalSiteData[]> {
    let srpinpid: any;
    let site: any;
    try {
      srpinpid = await this.srpinpidsRepository.findOne({ crownLandsFileNumber: crownLandsFileNumber });
    } catch (err) {
      return [];
    }
    try {
      site = await this.srsitesRepository.findOneOrFail({ siteId: srpinpid.siteId });
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
    const cityPattern = `${city.toLowerCase()}[a-zA-Z]*`;
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
    const srassocs2 = await this.srassocsRepository.findAndCount({ associatedSiteId: siteId });
    const srsite = await this.srsitesRepository.findOneOrFail({ siteId: siteId });
    const srdate = await this.srdatesRepository.find();
    const srpinpids = await this.srpinpidsRepository.findAndCount({ siteId: siteId });
    const srprofil = await this.srprofilsRepository.find({ siteId: siteId });
    const siteProfileString =
      srprofil.length == 0 ? 'No Site Profile has been submitted for this site' : 'Site Profile Received';
    let numAssocs = srassocs[1] + srassocs2[1];
    let numParcelDescs = 0;

    for (let entry of srpinpids[0]) {
      if (entry.pid != '' || entry.pin != '' || entry.crownLandsFileNumber != '') {
        numParcelDescs++;
      }
    }
    // calculate the number of associated sites
    srassocs[0].forEach(() => {
      numAssocs++;
    });
    srassocs2[0].forEach(() => {
      numAssocs++;
    });
    let addedAssocSites: string[] = [];
    for (let entry of srpinpids[0]) {
      if (entry.pid != '') {
        let sameParcelId = await this.srpinpidsRepository.find({ pid: entry.pid });
        for (let pinpid of sameParcelId) {
          if (pinpid.siteId != siteId && !addedAssocSites.includes(pinpid.siteId)) {
            numAssocs++;
            addedAssocSites.push(pinpid.siteId); // don't add the associated site multiple times
          }
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
      siteProfileString: siteProfileString,
    };
  }

  async getDetailedReportData(siteId: string) {
    const srevents = await this.sreventsRepository.findAndCount({ siteId: siteId });
    const srsitdoc = await this.srsitdocsRepository.findAndCount({ siteId: siteId });
    const srsitpars = await this.srsitparsRepository.findAndCount({ siteId: siteId });
    const srlands = await this.srlandsRepository.findAndCount({ siteId: siteId });
    const srassocs = await this.srassocsRepository.findAndCount({ siteId: siteId });
    const srassocs2 = await this.srassocsRepository.findAndCount({ associatedSiteId: siteId });
    const srsite = await this.srsitesRepository.findOneOrFail({ siteId: siteId });
    const srdate = await this.srdatesRepository.find();
    const srpinpids = await this.srpinpidsRepository.find({ siteId: siteId });
    const srprofil = await this.srprofilsRepository.findOne({ siteId: siteId });
    let numAssocs = srassocs[1] + srassocs2[1];
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
    for (let entry of srassocs[0]) {
      numAssocs++;
      let assocObject = {};
      assocObject['siteId'] = entry.associatedSiteId;
      assocObject['effectDate'] = entry.effectDate;
      assocObject['noteString'] = entry.noteString;
      associatedSitesArray.push(assocObject);
    }
    for (let entry of srassocs2[0]) {
      numAssocs++;
      let assocObject = {};
      assocObject['siteId'] = entry.siteId;
      assocObject['effectDate'] = entry.effectDate;
      assocObject['noteString'] = entry.noteString;
      associatedSitesArray.push(assocObject);
    }
    let addedAssocSites: string[] = [];
    for (let entry of srpinpids) {
      if (entry.pid != '') {
        let sameParcelId = await this.srpinpidsRepository.find({ pid: entry.pid });
        for (let pinpid of sameParcelId) {
          if (pinpid.siteId != siteId && !addedAssocSites.includes(pinpid.siteId)) {
            numAssocs++;
            addedAssocSites.push(pinpid.siteId); // don't add the associated site multiple times
            let assocObject = {};
            assocObject['siteId'] = pinpid.siteId;
            assocObject['effectDate'] = pinpid.dateNoted;
            assocObject['noteString'] = 'Same Parcel ID';
            associatedSitesArray.push(assocObject);
          }
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
      siteProfileData: srprofil, // site profile information
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
