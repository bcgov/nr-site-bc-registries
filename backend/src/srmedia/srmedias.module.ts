import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrmediasService } from './srmedias.service';
import { SrmediasController } from './srmedias.controller';
import { Srmedia } from './entities/srmedia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Srmedia])],
  controllers: [SrmediasController],
  providers: [SrmediasService],
  exports: [SrmediasService, TypeOrmModule.forFeature([Srmedia])],
})
export class SrmediasModule {}
