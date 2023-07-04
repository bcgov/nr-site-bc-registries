import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParcelSearchPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const siteId = parseInt(value);
    if (Number.isNaN(siteId)) {
      throw new BadRequestException('SiteId is not a number');
    }

    return siteId.toString();
  }
}
