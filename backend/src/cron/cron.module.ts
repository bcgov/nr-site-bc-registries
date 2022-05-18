import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { SrassocsModule } from '../srassocs/srassocs.module';
import { SrassocsService } from '../srassocs/srassocs.service';
import { SrdatesModule } from '../srdate/srdates.module';
import { SrdatesService } from '../srdate/srdates.service';
import { SrdocparsModule } from '../srdocpar/srdocpars.module';
import { SrdocparsService } from '../srdocpar/srdocpars.service';
import { SreventsModule } from '../srevents/srevents.module';
import { SreventsService } from '../srevents/srevents.service';
import { SrevpartsModule } from '../srevpart/srevparts.module';
import { SrevpartsService } from '../srevpart/srevparts.service';
import { SrlandsModule } from '../srlands/srlands.module';
import { SrlandsService } from '../srlands/srlands.service';
import { SrparrolsModule } from '../srparrol/srparrols.module';
import { SrparrolsService } from '../srparrol/srparrols.service';
import { SrpinpidsModule } from '../srpinpid/srpinpids.module';
import { SrpinpidsService } from '../srpinpid/srpinpids.service';
import { SrprfansModule } from '../srprfans/srprfans.module';
import { SrprfansService } from '../srprfans/srprfans.service';
import { SrprfcatsModule } from '../srprfcat/srprfcats.module';
import { SrprfcatsService } from '../srprfcat/srprfcats.service';
import { SrprfquesModule } from '../srprfque/srprfques.module';
import { SrprfquesService } from '../srprfque/srprfques.service';
import { SrprfusesModule } from '../srprfuse/srprfuses.module';
import { SrprfusesService } from '../srprfuse/srprfuses.service';
import { SrprofilsModule } from '../srprofil/srprofils.module';
import { SrprofilsService } from '../srprofil/srprofils.service';
import { SrsitdocsModule } from '../srsitdoc/srsitdocs.module';
import { SrsitdocsService } from '../srsitdoc/srsitdocs.service';
import { SrsitparsModule } from '../srsitpar/srsitpars.module';
import { SrsitparsService } from '../srsitpar/srsitpars.service';
import { SrsitesModule } from '../srsites/srsites.module';
import { SrsitesService } from '../srsites/srsites.service';

@Module({
    imports: [
        SrassocsModule,
        SrdatesModule,
        SrdocparsModule,
        SreventsModule,
        SrevpartsModule,
        SrlandsModule,
        SrparrolsModule,
        SrpinpidsModule,
        SrprfansModule,
        SrprfcatsModule,
        SrprfquesModule,
        SrprfusesModule,
        SrprofilsModule,
        SrsitdocsModule,
        SrsitparsModule,
        SrsitesModule,
    ],
    controllers: [],
    providers: [
        CronService,
        SrassocsService,
        SrdatesService,
        SrdocparsService,
        SreventsService,
        SrevpartsService,
        SrlandsService,
        SrparrolsService,
        SrpinpidsService,
        SrprfansService,
        SrprfcatsService,
        SrprfquesService,
        SrprfusesService,
        SrprofilsService,
        SrsitdocsService,
        SrsitparsService,
        SrsitesService,
    ],
})
export class CronModule {}
