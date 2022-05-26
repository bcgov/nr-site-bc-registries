import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SraecassService } from './sraecass.service';
import { SraecassController } from './sraecass.controller';
import { Sraecass } from './entities/sraecass.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sraecass])],
  controllers: [SraecassController],
  providers: [SraecassService],
  exports: [SraecassService, TypeOrmModule.forFeature([Sraecass])],
})
export class SraecassModule {}
