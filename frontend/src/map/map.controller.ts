import { Controller, Get, Param } from '@nestjs/common';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private mapService: MapService) {}
  @Get('/postalcode/:postalCode')
  getLatLngByPostalCode(@Param('postalCode') postalCode: string): Promise<{
    lat: number;
    lng: number;
  }> {
    // postal code is in the format 'A1A 1A1'
    return this.mapService.getLatLngByPostalCode(postalCode);
  }
}
