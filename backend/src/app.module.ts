import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronService } from './cron/cron.service';
import { CronModule } from './cron/cron.module';
import { SitesModule } from './sites/sites.module';
import { SrassocsModule } from './srassocs/srassocs.module';
import { SrdatesModule } from './srdate/srdates.module';
import { SrdocparsModule } from './srdocpar/srdocpars.module';
import { SreventsModule } from './srevents/srevents.module';
import { SrevpartsModule } from './srevpart/srevparts.module';
import { SrlandsModule } from './srlands/srlands.module';
import { SrparrolsModule } from './srparrol/srparrols.module';
import { SrpinpidsModule } from './srpinpid/srpinpids.module';
import { SrprfansModule } from './srprfans/srprfans.module';
import { SrprfcatsModule } from './srprfcat/srprfcats.module';
import { SrprfquesModule } from './srprfque/srprfques.module';
import { SrprfusesModule } from './srprfuse/srprfuses.module';
import { SrprofilsModule } from './srprofil/srprofils.module';
import { SrsitdocsModule } from './srsitdoc/srsitdocs.module';
import { SrsitparsModule } from './srsitpar/srsitpars.module';
import { SrsitesModule } from './srsites/srsites.module';
import { UtilsModule } from './utils/utils.module';

console.log('Var check - POSTGRESQL_HOST', process.env.POSTGRESQL_HOST);
console.log('Var check - POSTGRESQL_DATABASE', process.env.POSTGRESQL_DATABASE);
console.log('Var check - POSTGRESQL_USER', process.env.POSTGRESQL_USER);
if (process.env.POSTGRESQL_PASSWORD != null) {
  console.log('Var check - POSTGRESQL_PASSWORD present');
} else {
  console.log('Var check - POSTGRESQL_PASSWORD not present');
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESQL_HOST || 'localhost',
      port: 5432,
      database: process.env.POSTGRESQL_DATABASE || 'postgres',
      username: process.env.POSTGRESQL_USER || 'postgres',
      password: process.env.POSTGRESQL_PASSWORD,
      // entities: [Site],
      autoLoadEntities: true, // Auto load all entities regiestered by typeorm forFeature method.
      synchronize: true, // This changes the DB schema to match changes to entities, which we might not want.
    }),
    ScheduleModule.forRoot(),
    SitesModule,
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
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CronService],
})
export class AppModule {}
