import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SrsitdocsService } from './srsitdocs.service';
import { SrsitdocsController } from './srsitdocs.controller';
import { Srsitdoc } from './entities/srsitdoc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Srsitdoc])],
  controllers: [SrsitdocsController],
  providers: [SrsitdocsService],
  exports: [SrsitdocsService, TypeOrmModule.forFeature([Srsitdoc])],
})
export class SrsitdocsModule {}
