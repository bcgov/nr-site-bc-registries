import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrsitparsService } from './srsitpars.service';
import { SrsitparsController } from './srsitpars.controller';
import { Srsitpar } from './entities/srsitpar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Srsitpar])],
  controllers: [SrsitparsController],
  providers: [SrsitparsService],
  exports: [SrsitparsService, TypeOrmModule.forFeature([Srsitpar])],
})
export class SrsitparsModule {}
