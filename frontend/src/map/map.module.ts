import { Module } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { MapController } from './map.controller';
import { MapService } from './map.service';

@Module({
  controllers: [MapController],
  providers: [MapService, UtilsService],
})
export class MapModule {}
