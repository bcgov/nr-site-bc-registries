import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AreaSearchPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    let lat = value.lat;
    let lng = value.lng;
    let size = value.size;

    if (Number.isNaN(parseFloat(lat))) {
      throw new BadRequestException('Latitude is not a number');
    } else if (Number.isNaN(parseFloat(lng))) {
      throw new BadRequestException('Longitude is not a number');
    } else if (size != 'Small' && size != 'Large') {
      throw new BadRequestException('Incorrect size value');
    }

    return { lat: lat, lng: lng, size: size };
  }
}
