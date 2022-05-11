import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { postalCodeJSON } from 'utils/types';
import { getPostalCodes } from 'utils/util';

var postalCodes: [postalCodeJSON];

@Injectable()
export class MapService {
  constructor() {
    postalCodes = getPostalCodes();
  }
  async getLatLngByPostalCode(postalCode: string): Promise<{
    lat: number;
    lng: number;
  }> {
    let lat: number;
    let lng: number;
    // if no postal codes json file, use geocoder which is slower and less reliable
    if (postalCodes == null) {
      const url = `https://geocoder.ca/${postalCode}?json=1`;
      await fetch(url)
        .then(function (response) {
          if (response.status == 403) {
            console.log('API request failed');
            return null;
          }
          return response.json();
        })
        .then(function (data: any) {
          if (data !== null) {
            lat = parseFloat(data.latt);
            lng = parseFloat(data.longt);
          }
        })
        .catch(function () {
          console.log('Failed to fetch the postal code coordinates');
        });
    }
    // postal codes json file exists
    else {
      // add a whitespace after the third character
      postalCode = postalCode.toUpperCase();
      postalCode =
        postalCode.substring(0, 3) + ' ' + postalCode.substring(3, 6);
      const jsonObj: postalCodeJSON = postalCodes.find((item) => {
        return item.POSTAL_CODE == postalCode;
      });
      lat = parseFloat(jsonObj.LATITUDE);
      lng = parseFloat(jsonObj.LONGITUDE);
    }
    return { lat, lng };
  }
}
