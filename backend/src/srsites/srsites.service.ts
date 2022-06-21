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
import { Srevpart } from 'src/srevpart/entities/srevpart.entity';
import { Srdate } from 'src/srdate/entities/srdate.entity';

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
    @InjectRepository(Srland)
    private srlandsRepository: Repository<Srland>,
    @InjectRepository(Srassoc)
    private srassocsRepository: Repository<Srassoc>,
    @InjectRepository(Srdate)
    private srdatesRepository: Repository<Srdate>
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
    let srpinpid: any;
    let site: any;
    try {
      srpinpid = await this.srpinpidsRepository.findOne({ pid: pid });
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
    let srpinpid: any;
    let site: any;
    try {
      srpinpid = await this.srpinpidsRepository.findOne({ pin: pin });
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
    const cityPattern = city !== '' ? `[a-zA-Z]*${city.toLowerCase()}[a-zA-Z]*` : `[a-zA-Z]*`;
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
    const radius = size == 'Small' ? 564.19 : size == 'Large' ? 5641.89 : 0;
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
    const srpinpid = await this.srpinpidsRepository.findOne({ siteId: siteId });
    const srsite = await this.srsitesRepository.findOneOrFail({ siteId: siteId });
    const srdate = await this.srdatesRepository.find();

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
      assocSites: srassocs[1] + srassocs2[1],
      documents: srsitdoc[1],
      suspLandUse: srlands[1],
      parcelDesc: srpinpid ? srpinpid.legalDescription : '',
      locationDescription: srsite.locationDescription,
      status: srsite.status,
      classification: srsite.classification,
    };
  }

  async getDetailedReportData(siteId: string) {
    const srevents = await this.sreventsRepository.findAndCount({ siteId: siteId });
    const srsitdoc = await this.srsitdocsRepository.findAndCount({ siteId: siteId });
    const srsitpars = await this.srsitparsRepository.findAndCount({ siteId: siteId });
    const srlands = await this.srlandsRepository.findAndCount({ siteId: siteId });
    const srassocs = await this.srassocsRepository.findAndCount({ siteId: siteId });
    const srassocs2 = await this.srassocsRepository.findAndCount({ associatedSiteId: siteId });
    const srpinpid = await this.srpinpidsRepository.findOne({ siteId: siteId });
    const srsite = await this.srsitesRepository.findOneOrFail({ siteId: siteId });
    const srdate = await this.srdatesRepository.find();
    // entity relations might be a better solution than this
    // add corresponding participants to each notation
    for (let entry of srevents[0]) {
      const eventId = entry.eventId;
      const srevparts = this.srevpartsRepository.find({ eventId });
      entry['participantsArray'] = srevparts;
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
      assocSites: srassocs[1] + srassocs2[1],
      documents: srsitdoc[1],
      suspLandUse: srlands[1],
      parcelDesc: srpinpid.legalDescription,
      locationDescription: srsite.locationDescription,
      status: srsite.status,
      classification: srsite.classification,
      notationsArray: srevents[0],
      participantsArray: srsitpars[0],
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
