import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrprofilsService } from './srprofils.service';
import { SrprofilsController } from './srprofils.controller';
import { Srprofil } from './entities/srprofil.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Srprofil])],
  controllers: [SrprofilsController],
  providers: [SrprofilsService],
  exports: [SrprofilsService, TypeOrmModule.forFeature([Srprofil])],
})
export class SrprofilsModule {}
