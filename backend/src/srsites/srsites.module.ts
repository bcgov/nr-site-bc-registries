import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrsitesService } from './srsites.service';
import { SrsitesController } from './srsites.controller';
import { Srsite } from './entities/srsite.entity';
import { Srpinpid } from '../srpinpid/entities/srpinpid.entity';
import { Srevent } from '../srevents/entities/srevent.entity';
import { Srsitdoc } from '../srsitdoc/entities/srsitdoc.entity';
import { Srsitpar } from '../srsitpar/entities/srsitpar.entity';
import { Srland } from '../srlands/entities/srland.entity';
import { Srassoc } from '../srassocs/entities/srassoc.entity';
import { Srevpart } from '../srevpart/entities/srevpart.entity';
import { Srdate } from '../srdate/entities/srdate.entity';
import { Srdocpar } from '../srdocpar/entities/srdocpar.entity';
import { Srprofil } from '../srprofil/entities/srprofil.entity';
import { Srprfuse } from '../srprfuse/entities/srprfuse.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Srsite]),
    TypeOrmModule.forFeature([Srpinpid]),
    TypeOrmModule.forFeature([Srevent]),
    TypeOrmModule.forFeature([Srevpart]),
    TypeOrmModule.forFeature([Srsitdoc]),
    TypeOrmModule.forFeature([Srsitpar]),
    TypeOrmModule.forFeature([Srdocpar]),
    TypeOrmModule.forFeature([Srland]),
    TypeOrmModule.forFeature([Srprfuse]),
    TypeOrmModule.forFeature([Srassoc]),
    TypeOrmModule.forFeature([Srdate]),
    TypeOrmModule.forFeature([Srprofil]),
  ],
  controllers: [SrsitesController],
  providers: [SrsitesService],
  exports: [SrsitesService, TypeOrmModule.forFeature([Srsite])],
})
export class SrsitesModule {}
