import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SrassocsService } from '../srassocs/srassocs.service';
import { SrdatesService } from '../srdate/srdates.service';
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

@Injectable()
export class CronService {
    constructor(
        private srassocsService: SrassocsService,
        private srdatesService: SrdatesService,
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
        private srsitparsService: SrsitparsService,
        private srsitesService: SrsitesService,
    ) {}

    async removePreviousData() {
        console.log('removing old data')
        await this.srassocsService.removeAll();
        await this.srdatesService.removeAll();
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

    // should fetch data from bucket, send to parseData function, and return the parsed data
    async getData() {
        return {raw1: '1\n2\n3', raw2: 'a\nb\nc'}
    }

    // receives raw data and parses it
    async parseData(rawData) {
        return { 
            raw1: [{var1: '1'}, {var1: '2'}, {var3: '3'}], 
            raw2: [{var1: 'a'}, {var1: 'b'}, {var1: 'c'}]
        }
    }

    async sendDataToTables(parsedData) {
        return 'success';
    }

    // @Cron('0,15,30,45 * * * * *')
    @Cron('0 30 * * * *')
    async updateTablez() {
        console.log('update tables job starting')
        // grab data from bucket
        const rawData = await this.getData();
        // convert data into json arrays - maybe exit job if this fails (don't delete old data without new data)
        const parsedData = await this.parseData(rawData);
        // call removeall route on each Service
        await this.removePreviousData();
        // call create on each json array entry
        console.log('update tables job complete')
    }
}
