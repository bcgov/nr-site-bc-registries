import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CSV_HEADERS } from '../../utils/constants';
import * as axios from 'axios';

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
import { SrdateDto } from 'src/srdate/dto/srdate.dto';
import { SreventDto } from 'src/srevents/dto/srevent.dto';
import { SrevpartDto } from 'src/srevpart/dto/srevpart.dto';
import { SrlandDto } from 'src/srlands/dto/srland.dto';
import { SrparrolDto } from 'src/srparrol/dto/srparrol.dto';
import { SrpinpidDto } from 'src/srpinpid/dto/srpinpid.dto';
import { SrprfanDto } from 'src/srprfans/dto/srprfan.dto';
import { SrprfcatDto } from 'src/srprfcat/dto/srprfcat.dto';
import { SrprfqueDto } from 'src/srprfque/dto/srprfque.dto';
import { SrprfuseDto } from 'src/srprfuse/dto/srprfuse.dto';
import { SrprofilDto } from 'src/srprofil/dto/srprofil.dto';
import { SrsitdocDto } from 'src/srsitdoc/dto/srsitdoc.dto';
import { SrsitparDto } from 'src/srsitpar/dto/srsitpar.dto';
import { SrsiteDto } from 'src/srsites/dto/srsite.dto';
import { SrdocparDto } from 'src/srdocpar/dto/srdocpar.dto';

type RawDataObject = {
    srassocs: string;
    srdate: string;
    srdocpar: string;
    srevents: string;
    srevpart: string;
    srlands: string;
    srparrol: string;
    srpinpid: string;
    srprfans: string;
    srprfcat: string;
    srprfque: string;
    srprfuse: string;
    srprofil: string;
    srsitdoc: string;
    srsites: string;
    srsitpar: string;
};

type ParsedDataObject = {
    srassocs: [SrassocDto];
    srdate: [SrdateDto];
    srdocpar: [SrdocparDto];
    srevents: [SreventDto];
    srevpart: [SrevpartDto];
    srlands: [SrlandDto];
    srparrol: [SrparrolDto];
    srpinpid: [SrpinpidDto];
    srprfans: [SrprfanDto];
    srprfcat: [SrprfcatDto];
    srprfque: [SrprfqueDto];
    srprfuse: [SrprfuseDto];
    srprofil: [SrprofilDto];
    srsitdoc: [SrsitdocDto];
    srsites: [SrsiteDto];
    srsitpar: [SrsitparDto];
};

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

    // @Cron('0,15,30,45 * * * * *')
    @Cron('0 30 * * * *')
    async updateTables() {
        console.log('update tables job starting');
        // grab data from bucket
        const data = await this.getData();
        // call removeall route on each Service
        await this.removePreviousData();
        // call create on each json array entry
        // await this.sendDataToTables(data);
        console.log('update tables job complete');
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
        let srsitpar = await this.getCsv('srsitpar.csv');
        let srsites = await this.getCsv('srsites.csv');

        let rawData: RawDataObject = {
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
    async parseData(rawData: RawDataObject) {
        // have to parse each item in the array
        return {
            raw1: [{ var1: '1' }, { var1: '2' }, { var3: '3' }],
            raw2: [{ var1: 'a' }, { var1: 'b' }, { var1: 'c' }],
        };
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

    async sendDataToTables(parsedData: ParsedDataObject) {
        return 'success';
    }

    async getCsv(fileName: string) {
        return '';
    }
}
