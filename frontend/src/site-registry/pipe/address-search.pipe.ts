import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class AddressSearchPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    let city = value.city.replace(/\*/g, '');
    if (city.length < 2) {
      throw new BadRequestException('City String too short');
    }
    city = city.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape any characters that could break regex
    let address = value.address.replace(/\*/g, '');
    address = address.replace(/\\'/g, "'"); // replace \' with '
    address = address.replace(/'/g, "''"); // replace ' with ''

    return { address: address, city: city };
  }
}
