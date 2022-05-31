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
import { Srassoc } from 'src/srassocs/entities/srassoc.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Srsite]),
    TypeOrmModule.forFeature([Srpinpid]),
    TypeOrmModule.forFeature([Srevent]),
    TypeOrmModule.forFeature([Srsitdoc]),
    TypeOrmModule.forFeature([Srsitpar]),
    TypeOrmModule.forFeature([Srland]),
    TypeOrmModule.forFeature([Srassoc]),
  ],
  controllers: [SrsitesController],
  providers: [SrsitesService],
  exports: [SrsitesService, TypeOrmModule.forFeature([Srsite])],
})
export class SrsitesModule {}
