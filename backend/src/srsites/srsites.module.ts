import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrsitesService } from './srsites.service';
import { SrsitesController } from './srsites.controller';
import { Srsite } from './entities/srsite.entity';
import { Srpinpid } from '../srpinpid/entities/srpinpid.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Srsite]), TypeOrmModule.forFeature([Srpinpid])],
  controllers: [SrsitesController],
  providers: [SrsitesService],
  exports: [SrsitesService, TypeOrmModule.forFeature([Srsite])],
})
export class SrsitesModule {}
