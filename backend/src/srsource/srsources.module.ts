import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrsourcesService } from './srsources.service';
import { SrsourcesController } from './srsources.controller';
import { Srsource } from './entities/srsource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Srsource])],
  controllers: [SrsourcesController],
  providers: [SrsourcesService],
  exports: [SrsourcesService, TypeOrmModule.forFeature([Srsource])],
})
export class SrsourcesModule {}
