import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CrownLandsFileSearchPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    let clfNum: number;
    if (value.startsWith('N/A')) {
      clfNum = parseInt(value.slice(2));
      if (clfNum == NaN) {
        throw new BadRequestException('Invalid Crown Lands File Number');
      }
    } else {
      clfNum = parseInt(value);
      if (clfNum == NaN) {
        throw new BadRequestException('Invalid Crown Lands File Number');
      }
    }

    return value;
  }
}
