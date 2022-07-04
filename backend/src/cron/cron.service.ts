import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CSV_HEADERS } from '../../utils/constants';
import * as csv from 'csvtojson';
import axios from 'axios';
import { aws4Interceptor } from 'aws4-axios';

import { SrassocsService } from '../srassocs/srassocs.service';
import { SrdatesService } from '../srdate/srdates.service';
import { SrdocparsService } from '../srdocpar/srdocpars.service';
import { SreventsService } from '../srevents/srevents.service';
import { SrevpartsService } from '../srevpart/srevparts.service';
import { SrlandsService } from '../srlands/srlands.service';
import { SrparrolsService } from '../srparrol/srparrols.service';
import { SrpinpidsService } from '../srpinpid/srpinpids.service';
import { SrprfansService } from '../srprfans/srprfans.service';
import { SrprfcatsService } from '../srprfcat/srprfcats.service';
import { SrprfquesService } from '../srprfque/srprfques.service';
import { SrprfusesService } from '../srprfuse/srprfuses.service';
import { SrprofilsService } from '../srprofil/srprofils.service';
import { SrsitdocsService } from '../srsitdoc/srsitdocs.service';
import { SrsitparsService } from '../srsitpar/srsitpars.service';
import { SrsitesService } from '../srsites/srsites.service';
import { SrassocDto } from '../srassocs/dto/srassoc.dto';
import { SrdateDto } from '../srdate/dto/srdate.dto';
import { SreventDto } from '../srevents/dto/srevent.dto';
import { SrevpartDto } from '../srevpart/dto/srevpart.dto';
import { SrlandDto } from '../srlands/dto/srland.dto';
import { SrparrolDto } from '../srparrol/dto/srparrol.dto';
import { SrpinpidDto } from '../srpinpid/dto/srpinpid.dto';
import { SrprfanDto } from '../srprfans/dto/srprfan.dto';
import { SrprfcatDto } from '../srprfcat/dto/srprfcat.dto';
import { SrprfqueDto } from '../srprfque/dto/srprfque.dto';
import { SrprfuseDto } from '../srprfuse/dto/srprfuse.dto';
import { SrprofilDto } from '../srprofil/dto/srprofil.dto';
import { SrsitdocDto } from '../srsitdoc/dto/srsitdoc.dto';
import { SrsitparDto } from '../srsitpar/dto/srsitpar.dto';
import { SrsiteDto } from '../srsites/dto/srsite.dto';
import { SrdocparDto } from '../srdocpar/dto/srdocpar.dto';

@Injectable()
export class CronService {
  constructor(
    private srassocsService: SrassocsService,
    private srdatesService: SrdatesService,
    private srdocparsService: SrdocparsService,
    private sreventsService: SreventsService,
    private srevpartsService: SrevpartsService,
    private srlandsService: SrlandsService,
    private srparrolsService: SrparrolsService,
    private srpinpidsService: SrpinpidsService,
    private srprfansService: SrprfansService,
    private srprfcatsService: SrprfcatsService,
    private srprfquesService: SrprfquesService,
    private srprfusesService: SrprfusesService,
    private srprofilsService: SrprofilsService,
    private srsitdocsService: SrsitdocsService,
    private srsitesService: SrsitesService,
    private srsitparsService: SrsitparsService
  ) {}

  // called on app startup - check the srsites table for data, if none then clean the db and get new data
  async initTablesData() {
    const numSrsitesEntries = await this.srsitesService.countEntries();
    if (numSrsitesEntries == 0) {
      console.log('Database is empty, grabbing data');
      await this.updateTables();
    }
  }

  @Cron('0 0 0 * * *')
  async updateTables() {
    console.log('update tables job starting');
    const timeTaken = 'Total time';
    console.time(timeTaken);
    // grab data from bucket
    const data = await this.getData();
    // call removeall route on each Service
    await this.removePreviousData();
    // call create on each json array entry
    process.env.POSTGRESQL_HOST.includes('database')
      ? await this.sendDataToTablesQuietly(data)
      : await this.sendDataToTables(data);
    console.log('update tables job complete');
    console.timeEnd(timeTaken);
  }

  // should fetch data from bucket, send to parseData function, and return the parsed data
  async getData() {
    // query the bucket
    let srassocs = await this.getCsv('srassocs.csv');
    let srdate = await this.getCsv('srdate.csv');
    let srdocpar = await this.getCsv('srdocpar.csv');
    let srevents = await this.getCsv('srevents.csv');
    let srevpart = await this.getCsv('srevpart.csv');
    let srlands = await this.getCsv('srlands.csv');
    let srparrol = await this.getCsv('srparrol.csv');
    let srpinpid = await this.getCsv('srpinpid.csv');
    let srprfans = await this.getCsv('srprfans.csv');
    let srprfcat = await this.getCsv('srprfcat.csv');
    let srprfque = await this.getCsv('srprfque.csv');
    let srprfuse = await this.getCsv('srprfuse.csv');
    let srprofil = await this.getCsv('srprofil.csv');
    let srsitdoc = await this.getCsv('srsitdoc.csv');
    let srsites = await this.getCsv('srsites.csv');
    let srsitpar = await this.getCsv('srsitpar.csv');

    let rawData = {
      srassocs: srassocs,
      srdate: srdate,
      srdocpar: srdocpar,
      srevents: srevents,
      srevpart: srevpart,
      srlands: srlands,
      srparrol: srparrol,
      srpinpid: srpinpid,
      srprfans: srprfans,
      srprfcat: srprfcat,
      srprfque: srprfque,
      srprfuse: srprfuse,
      srprofil: srprofil,
      srsitdoc: srsitdoc,
      srsites: srsites,
      srsitpar: srsitpar,
    };
    return this.parseData(rawData);
  }

  // receives raw data and parses it
  async parseData(rawData) {
    console.log('parsing data');
    // db export of srprfcat splits question type into two pieces, recombine them here
    let srprfcatTemp = await csv().fromString(
      'categoryId,sequenceNumber,effectiveDate,expiryDate,questionType,questionType2,categoryDescription\n' +
        rawData.srprfcat
    );
    let srprfcat = [];
    for (let entry of srprfcatTemp) {
      let newEntry = {
        categoryId: entry.categoryId,
        sequenceNumber: entry.sequenceNumber,
        effectiveDate: entry.effectiveDate,
        expiryDate: entry.expiryDate,
        questionType: entry.questionType + ' - ' + entry.questionType2,
        categoryDescription: entry.categoryDescription,
      };
      srprfcat.push(newEntry);
    }
    const parsedData = {
      srassocs: await csv().fromString(CSV_HEADERS.SRASSOCS + rawData.srassocs),
      srdate: await csv().fromString(CSV_HEADERS.SRDATE + rawData.srdate),
      srdocpar: await csv().fromString(CSV_HEADERS.SRDOCPAR + rawData.srdocpar),
      srevents: await csv().fromString(CSV_HEADERS.SREVENTS + rawData.srevents),
      srevpart: await csv().fromString(CSV_HEADERS.SREVPART + rawData.srevpart),
      srlands: await csv().fromString(CSV_HEADERS.SRLANDS + rawData.srlands),
      srparrol: await csv().fromString(CSV_HEADERS.SRPARROL + rawData.srparrol),
      srpinpid: await csv().fromString(CSV_HEADERS.SRPINPID + rawData.srpinpid),
      srprfans: await csv().fromString(CSV_HEADERS.SRPRFANS + rawData.srprfans),
      srprfcat: srprfcat,
      srprfque: await csv().fromString(CSV_HEADERS.SRPRFQUE + rawData.srprfque),
      srprfuse: await csv().fromString(CSV_HEADERS.SRPRFUSE + rawData.srprfuse),
      srprofil: await csv().fromString(CSV_HEADERS.SRPROFIL + rawData.srprofil),
      srsitdoc: await csv().fromString(CSV_HEADERS.SRSITDOC + rawData.srsitdoc),
      srsites: await csv().fromString(CSV_HEADERS.SRSITES + rawData.srsites),
      srsitpar: await csv().fromString(CSV_HEADERS.SRSITPAR + rawData.srsitpar),
    };

    // have to parse each item in the array
    return parsedData;
  }

  async removePreviousData() {
    console.log('removing old data');
    await this.srassocsService.removeAll();
    await this.srdatesService.removeAll();
    await this.srdocparsService.removeAll();
    await this.sreventsService.removeAll();
    await this.srevpartsService.removeAll();
    await this.srlandsService.removeAll();
    await this.srparrolsService.removeAll();
    await this.srpinpidsService.removeAll();
    await this.srprfansService.removeAll();
    await this.srprfcatsService.removeAll();
    await this.srprfquesService.removeAll();
    await this.srprfusesService.removeAll();
    await this.srprofilsService.removeAll();
    await this.srsitdocsService.removeAll();
    await this.srsitparsService.removeAll();
    await this.srsitesService.removeAll();
  }

  async sendDataToTables(parsedData) {
    console.log('adding data to tables...\n');
    let counter = 0;
    process.stdout.write(`Adding srassocs entry `);
    const srassocs: [SrassocDto] = parsedData.srassocs;
    for (const entry of srassocs) {
      counter += 1;
      await this.srassocsService.create(entry);
    }
    const srdate: [SrdateDto] = parsedData.srdate;
    counter = 0;
    console.log('');
    process.stdout.write(`Adding srdate   entry `);
    for (const entry of srdate) {
      counter += 1;
      await this.srdatesService.create(entry);
    }
    const srdocpar: [SrdocparDto] = parsedData.srdocpar;
    counter = 0;
    console.log('');
    process.stdout.write(`Adding srdocpar entry `);
    for (const entry of srdocpar) {
      counter += 1;
      await this.srdocparsService.create(entry);
    }
    const srevents: [SreventDto] = parsedData.srevents;
    counter = 0;
    console.log('');
    process.stdout.write(`Adding srevents entry `);
    for (const entry of srevents) {
      counter += 1;
      await this.sreventsService.create(entry);
    }
    const srevpart: [SrevpartDto] = parsedData.srevpart;
    counter = 0;
    console.log('');
    process.stdout.write(`Adding srevpart entry `);
    for (const entry of srevpart) {
      counter += 1;
      await this.srevpartsService.create(entry);
    }
    const srlands: [SrlandDto] = parsedData.srlands;
    counter = 0;
    console.log('');
    process.stdout.write(`Adding srlands entry `);
    for (const entry of srlands) {
      counter += 1;
      await this.srlandsService.create(entry);
    }
    const srparrol: [SrparrolDto] = parsedData.srparrol;
    counter = 0;
    console.log('');
    for (const entry of srparrol) {
      counter += 1;
      await this.srparrolsService.create(entry);
    }
    const srpinpid: [SrpinpidDto] = parsedData.srpinpid;
    counter = 0;
    console.log('');
    process.stdout.write(`Adding srpinpid entry `);
    for (const entry of srpinpid) {
      counter += 1;
      await this.srpinpidsService.create(entry);
    }
    const srprfans: [SrprfanDto] = parsedData.srprfans;
    counter = 0;
    console.log('');
    process.stdout.write(`Adding srprfans entry `);
    for (const entry of srprfans) {
      counter += 1;
      await this.srprfansService.create(entry);
    }
    const srprfcat: [SrprfcatDto] = parsedData.srprfcat;
    counter = 0;
    console.log('');
    process.stdout.write(`Adding srprfcat entry `);
    for (const entry of srprfcat) {
      counter += 1;
      await this.srprfcatsService.create(entry);
    }
    const srprfque: [SrprfqueDto] = parsedData.srprfque;
    counter = 0;
    console.log('');
    process.stdout.write(`Adding srprfque entry `);
    for (const entry of srprfque) {
      counter += 1;
      await this.srprfquesService.create(entry);
    }
    const srprfuse: [SrprfuseDto] = parsedData.srprfuse;
    counter = 0;
    console.log('');
    process.stdout.write(`Adding srprfuse entry `);
    for (const entry of srprfuse) {
      counter += 1;
      await this.srprfusesService.create(entry);
    }
    const srprofil: [SrprofilDto] = parsedData.srprofil;
    counter = 0;
    console.log('');
    process.stdout.write(`Adding srprofil entry `);
    for (const entry of srprofil) {
      counter += 1;
      await this.srprofilsService.create(entry);
    }
    const srsitdoc: [SrsitdocDto] = parsedData.srsitdoc;
    counter = 0;
    console.log('');
    process.stdout.write(`Adding srsitdoc entry `);
    for (const entry of srsitdoc) {
      counter += 1;
      await this.srsitdocsService.create(entry);
    }
    const srsitpar: [SrsitparDto] = parsedData.srsitpar;
    counter = 0;
    console.log('');
    process.stdout.write(`Adding srsitpar entry `);
    for (const entry of srsitpar) {
      counter += 1;
      await this.srsitparsService.create(entry);
    }
    const srsites: [SrsiteDto] = parsedData.srsites;
    counter = 0;
    console.log('');
    process.stdout.write(`Adding srsite   entry `);
    for (const entry of srsites) {
      counter += 1;
      await this.srsitesService.create(entry);
    }
    console.log('\nadded data to tables');
  }

  async sendDataToTablesQuietly(parsedData) {
    console.log('adding data to tables...');
    const srassocs: [SrassocDto] = parsedData.srassocs;
    for (const entry of srassocs) {
      await this.srassocsService.create(entry);
    }
    const srdate: [SrdateDto] = parsedData.srdate;
    for (const entry of srdate) {
      await this.srdatesService.create(entry);
    }
    const srdocpar: [SrdocparDto] = parsedData.srdocpar;
    for (const entry of srdocpar) {
      await this.srdocparsService.create(entry);
    }
    const srevents: [SreventDto] = parsedData.srevents;
    for (const entry of srevents) {
      await this.sreventsService.create(entry);
    }
    const srevpart: [SrevpartDto] = parsedData.srevpart;
    for (const entry of srevpart) {
      await this.srevpartsService.create(entry);
    }
    const srlands: [SrlandDto] = parsedData.srlands;
    for (const entry of srlands) {
      await this.srlandsService.create(entry);
    }
    const srparrol: [SrparrolDto] = parsedData.srparrol;
    for (const entry of srparrol) {
      await this.srparrolsService.create(entry);
    }
    const srpinpid: [SrpinpidDto] = parsedData.srpinpid;
    for (const entry of srpinpid) {
      await this.srpinpidsService.create(entry);
    }
    const srprfans: [SrprfanDto] = parsedData.srprfans;
    for (const entry of srprfans) {
      await this.srprfansService.create(entry);
    }
    const srprfcat: [SrprfcatDto] = parsedData.srprfcat;
    for (const entry of srprfcat) {
      await this.srprfcatsService.create(entry);
    }
    const srprfque: [SrprfqueDto] = parsedData.srprfque;
    for (const entry of srprfque) {
      await this.srprfquesService.create(entry);
    }
    const srprfuse: [SrprfuseDto] = parsedData.srprfuse;
    for (const entry of srprfuse) {
      await this.srprfusesService.create(entry);
    }
    const srprofil: [SrprofilDto] = parsedData.srprofil;
    for (const entry of srprofil) {
      await this.srprofilsService.create(entry);
    }
    const srsitdoc: [SrsitdocDto] = parsedData.srsitdoc;
    for (const entry of srsitdoc) {
      await this.srsitdocsService.create(entry);
    }
    const srsitpar: [SrsitparDto] = parsedData.srsitpar;
    for (const entry of srsitpar) {
      await this.srsitparsService.create(entry);
    }
    const srsites: [SrsiteDto] = parsedData.srsites;
    for (const entry of srsites) {
      await this.srsitesService.create(entry);
    }
    console.log('added data to tables');
  }

  async getCsv(fileName: string) {
    const client = axios.create();
    let url =
      'https://' + process.env.object_store_host + '/' + process.env.object_store_bucket + `/dbdump/${fileName}`;
    let object_store_userid = process.env.object_store_userid;
    let object_store_secret = process.env.object_store_secret;
    const interceptor = aws4Interceptor(
      {
        region: 'us-east-1',
        service: 'execute-api',
      },
      {
        accessKeyId: object_store_userid,
        secretAccessKey: object_store_secret,
      }
    );
    client.interceptors.request.use(interceptor);
    return client.get(url).then((res) => {
      console.log('file received: ' + fileName);
      return res.data;
    });
  }
}
