import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CSV_HEADERS } from '../../utils/constants';
import * as csv from 'csvtojson';
import axios from 'axios';
import { aws4Interceptor } from 'aws4-axios';

import { ActionsService } from '../actions/actions.service';
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
import { delay } from '../../utils/util';
import { getConnection } from 'typeorm';
import { Srpinpid } from '../srpinpid/entities/srpinpid.entity';
import { Srparrol } from '../srparrol/entities/srparrol.entity';
import { Srprfan } from '../srprfans/entities/srprfan.entity';
import { Srprfcat } from '../srprfcat/entities/srprfcat.entity';
import { Srprfque } from '../srprfque/entities/srprfque.entity';
import { Srprfuse } from '../srprfuse/entities/srprfuse.entity';
import { Srprofil } from '../srprofil/entities/srprofil.entity';
import { Srsitdoc } from '../srsitdoc/entities/srsitdoc.entity';
import { Srsitpar } from '../srsitpar/entities/srsitpar.entity';
import { Srsite } from '../srsites/entities/srsite.entity';
import { Srland } from '../srlands/entities/srland.entity';
import { Srevpart } from '../srevpart/entities/srevpart.entity';
import { Srevent } from '../srevents/entities/srevent.entity';
import { Srdocpar } from '../srdocpar/entities/srdocpar.entity';
import { Srdate } from '../srdate/entities/srdate.entity';
import { Srassoc } from '../srassocs/entities/srassoc.entity';

const chunkSize = 1000;

@Injectable()
export class CronService {
  constructor(
    private actionsService: ActionsService,
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
    const srdate = await this.srdatesService.findAll();
    if ((await this.actionsService.findFirst()) == null) {
      await this.actionsService.create({ updating: false, hasData: false });
    } else {
      await this.actionsService.update({ updating: false });
    }
    const action = await this.actionsService.findFirst();
    if (!action.hasData || srdate.length == 0) {
      console.log('Database is empty, grabbing data');
      await this.updateTables();
    } else if (action.hasData) {
      // if the download date has changed, grab the data again
      const previousDate = srdate[0].downloaddate;
      const newDate = await this.getCsv('srdate.csv');
      if (newDate != previousDate) {
        console.log('Download date has changed, updating tables');
        await this.updateTables();
      }
    }
  }

  @Cron('0 0 0 * * *')
  async updateTables() {
    // add a random delay of 0 to 5 seconds for each pod to stop them from updating at the exact same time
    await delay(Math.floor(Math.random() * 5000));
    // check if another pod is updating the tables before attempting
    try {
      const action = await this.actionsService.findFirst();
      if (!action.updating) {
        await this.actionsService.update({ updating: true, hasData: false });
        console.log('Update tables job starting');
        const timeTaken = 'Total time';
        console.time(timeTaken);
        // grabs data, parses it, and adds it to the tables
        await this.getData();
        console.log('Update tables job complete');
        console.timeEnd(timeTaken);
        await this.actionsService.update({ updating: false, hasData: true });
      } else {
        console.log('The database is being updated by another pod.');
      }
    } catch (err) {
      console.log('Error adding data to tables');
      await this.actionsService.update({ updating: false, hasData: false });
    }
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

  async parseData(rawData) {
    console.log('\nParsing data\n');
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
    await this.updateSrassocs(await csv().fromString(CSV_HEADERS.SRASSOCS + rawData.srassocs));
    await this.updateSrdate(await csv().fromString(CSV_HEADERS.SRDATE + rawData.srdate));
    await this.updateSrdocpar(await csv().fromString(CSV_HEADERS.SRDOCPAR + rawData.srdocpar));
    await this.updateSrevents(await csv().fromString(CSV_HEADERS.SREVENTS + rawData.srevents));
    await this.updateSrevpart(await csv().fromString(CSV_HEADERS.SREVPART + rawData.srevpart));
    await this.updateSrlands(await csv().fromString(CSV_HEADERS.SRLANDS + rawData.srlands));
    await this.updateSrparrol(await csv().fromString(CSV_HEADERS.SRPARROL + rawData.srparrol));
    await this.updateSrpinpid(await csv().fromString(CSV_HEADERS.SRPINPID + rawData.srpinpid));
    await this.updateSrprfans(await csv().fromString(CSV_HEADERS.SRPRFANS + rawData.srprfans));
    await this.updateSrprfcat(srprfcat);
    await this.updateSrprfque(await csv().fromString(CSV_HEADERS.SRPRFQUE + rawData.srprfque));
    await this.updateSrprfuse(await csv().fromString(CSV_HEADERS.SRPRFUSE + rawData.srprfuse));
    await this.updateSrprofil(await csv().fromString(CSV_HEADERS.SRPROFIL + rawData.srprofil));
    await this.updateSrsitdoc(await csv().fromString(CSV_HEADERS.SRSITDOC + rawData.srsitdoc));
    await this.updateSrsite(await csv().fromString(CSV_HEADERS.SRSITES + rawData.srsites));
    await this.updateSrsitpar(await csv().fromString(CSV_HEADERS.SRSITPAR + rawData.srsitpar));
  }

  async updateSrassocs(array: any[]) {
    try {
      console.log(`Removing old srassocs data`);
      const repository = await getConnection().getRepository(Srassoc);
      await repository.query(`TRUNCATE srassoc RESTART IDENTITY CASCADE;`);
      console.log(`Adding new srassocs data`);
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        await getConnection().createQueryBuilder().insert().into(Srassoc).values(chunk).execute();
      }
      console.log('');
    } catch (err) {
      console.log('Error updating srassocs table');
    }
  }

  async updateSrdate(array: any[]) {
    try {
      console.log(`Removing old srdate data`);
      const repository = await getConnection().getRepository(Srdate);
      await repository.query(`TRUNCATE srdate RESTART IDENTITY CASCADE;`);
      console.log(`Adding new srdate data`);
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        await getConnection().createQueryBuilder().insert().into(Srdate).values(chunk).execute();
      }
      console.log('');
    } catch (err) {
      console.log('Error updating srdate table');
    }
  }

  async updateSrdocpar(array: any[]) {
    try {
      console.log(`Removing old srdocpar data`);
      const repository = await getConnection().getRepository(Srdocpar);
      await repository.query(`TRUNCATE srdocpar RESTART IDENTITY CASCADE;`);
      console.log(`Adding new srdocpar data`);
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        await getConnection().createQueryBuilder().insert().into(Srdocpar).values(chunk).execute();
      }
      console.log('');
    } catch (err) {
      console.log('Error updating srdocpar table');
    }
  }

  async updateSrevents(array: any[]) {
    try {
      console.log(`Removing old srevent data`);
      const repository = await getConnection().getRepository(Srevent);
      await repository.query(`TRUNCATE srevent RESTART IDENTITY CASCADE;`);
      console.log(`Adding new srevent data`);
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        await getConnection().createQueryBuilder().insert().into(Srevent).values(chunk).execute();
      }
      console.log('');
    } catch (err) {
      console.log('Error updating srevent table');
    }
  }

  async updateSrevpart(array: any[]) {
    try {
      console.log(`Removing old srevpart data`);
      const repository = await getConnection().getRepository(Srevpart);
      await repository.query(`TRUNCATE srevpart RESTART IDENTITY CASCADE;`);
      console.log(`Adding new srevpart data`);
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        await getConnection().createQueryBuilder().insert().into(Srevpart).values(chunk).execute();
      }
      console.log('');
    } catch (err) {
      console.log('Error updating srevpart table');
    }
  }

  async updateSrlands(array: any[]) {
    try {
      console.log(`Removing old srlands data`);
      const repository = await getConnection().getRepository(Srland);
      await repository.query(`TRUNCATE srland RESTART IDENTITY CASCADE;`);
      console.log(`Adding new srlands data`);
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        await getConnection().createQueryBuilder().insert().into(Srland).values(chunk).execute();
      }
      console.log('');
    } catch (err) {
      console.log('Error updating srlands table');
    }
  }

  async updateSrparrol(array: any[]) {
    try {
      console.log(`Removing old srparrol data`);
      const repository = await getConnection().getRepository(Srparrol);
      await repository.query(`TRUNCATE srparrol RESTART IDENTITY CASCADE;`);
      console.log(`Adding new srparrol data`);
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        await getConnection().createQueryBuilder().insert().into(Srparrol).values(chunk).execute();
      }
      console.log('');
    } catch (err) {
      console.log('Error updating srparrol table');
    }
  }

  async updateSrpinpid(array: any[]) {
    try {
      console.log(`Removing old srpinpid data`);
      const repository = await getConnection().getRepository(Srpinpid);
      await repository.query(`TRUNCATE srpinpid RESTART IDENTITY CASCADE;`);
      console.log(`Adding new srpinpid data`);
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        await getConnection().createQueryBuilder().insert().into(Srpinpid).values(chunk).execute();
      }
      console.log('');
    } catch (err) {
      console.log('Error updating srpinpid table');
    }
  }

  async updateSrprfans(array: any[]) {
    try {
      console.log(`Removing old srprfans data`);
      const repository = await getConnection().getRepository(Srprfan);
      await repository.query(`TRUNCATE srprfan RESTART IDENTITY CASCADE;`);
      console.log(`Adding new srprfans data`);
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        await getConnection().createQueryBuilder().insert().into(Srprfan).values(chunk).execute();
      }
      console.log('');
    } catch (err) {
      console.log('Error updating srprfans table');
    }
  }

  async updateSrprfcat(array: any[]) {
    try {
      console.log(`Removing old srprfcat data`);
      const repository = await getConnection().getRepository(Srprfcat);
      await repository.query(`TRUNCATE srprfcat RESTART IDENTITY CASCADE;`);
      console.log(`Adding new srprfcat data`);
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        await getConnection().createQueryBuilder().insert().into(Srprfcat).values(chunk).execute();
      }
      console.log('');
    } catch (err) {
      console.log('Error updating srprfcat table');
    }
  }

  async updateSrprfque(array: any[]) {
    try {
      console.log(`Removing old srprfque data`);
      const repository = await getConnection().getRepository(Srprfque);
      await repository.query(`TRUNCATE srprfque RESTART IDENTITY CASCADE;`);
      console.log(`Adding new srprfque data`);
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        await getConnection().createQueryBuilder().insert().into(Srprfque).values(chunk).execute();
      }
      console.log('');
    } catch (err) {
      console.log('Error updating srprfque table');
    }
  }

  async updateSrprfuse(array: any[]) {
    try {
      console.log(`Removing old srprfuse data`);
      const repository = await getConnection().getRepository(Srprfuse);
      await repository.query(`TRUNCATE srprfuse RESTART IDENTITY CASCADE;`);
      console.log(`Adding new srprfuse data`);
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        await getConnection().createQueryBuilder().insert().into(Srprfuse).values(chunk).execute();
      }
      console.log('');
    } catch (err) {
      console.log('Error updating srprfuse table');
    }
  }

  async updateSrprofil(array: any[]) {
    try {
      console.log(`Removing old srprofil data`);
      const repository = await getConnection().getRepository(Srprofil);
      await repository.query(`TRUNCATE srprofil RESTART IDENTITY CASCADE;`);
      console.log(`Adding new srprofil data`);
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        await getConnection().createQueryBuilder().insert().into(Srprofil).values(chunk).execute();
      }
      console.log('');
    } catch (err) {
      console.log('Error updating srprofil table');
    }
  }

  async updateSrsitdoc(array: any[]) {
    try {
      console.log(`Removing old srsitdoc data`);
      const repository = await getConnection().getRepository(Srsitdoc);
      await repository.query(`TRUNCATE srsitdoc RESTART IDENTITY CASCADE;`);
      console.log(`Adding new srsitdoc data`);
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        await getConnection().createQueryBuilder().insert().into(Srsitdoc).values(chunk).execute();
      }
      console.log('');
    } catch (err) {
      console.log('Error updating srsitdoc table');
    }
  }

  async updateSrsite(array: any[]) {
    try {
      console.log(`Removing old srsite data`);
      const repository = await getConnection().getRepository(Srsite);
      await repository.query(`TRUNCATE srsite RESTART IDENTITY CASCADE;`);
      console.log(`Adding new srsite data`);
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        await getConnection().createQueryBuilder().insert().into(Srsite).values(chunk).execute();
      }
      console.log('');
    } catch (err) {
      console.log('Error updating srsite table');
    }
  }

  async updateSrsitpar(array: any[]) {
    try {
      console.log(`Removing old srsitpar data`);
      const repository = await getConnection().getRepository(Srsitpar);
      await repository.query(`TRUNCATE srsitpar RESTART IDENTITY CASCADE;`);
      console.log(`Adding new srsitpar data`);
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        await getConnection().createQueryBuilder().insert().into(Srsitpar).values(chunk).execute();
      }
      console.log('');
    } catch (err) {
      console.log('Error updating srsitpar table');
    }
  }

  async getCsv(fileName: string) {
    const client = axios.create();
    let url =
      'https://' +
      process.env.object_store_host +
      '/' +
      process.env.object_store_bucket +
      '/dbdump/' +
      process.env.object_store_env +
      `/${fileName}`;

    console.log(url);
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
