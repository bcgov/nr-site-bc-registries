import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as base64 from 'base-64';
const filePath = path.resolve('../../utils/postalCodes.json');

const PAGE_TITLES = {
  INDEX: 'BC Site Registry',
  PARCEL_ID: 'Parcel ID Search',
  CROWN_PIN: 'Crown Lands PIN',
  CROWN_FILE: 'Crown Lands File #',
  SITE_ID_SEARCH: 'Site ID Search',
  ADDRESS_SEARCH: 'Address Search',
  AREA_SEARCH: 'Area Search',
  VIEW_SEARCH_RESULTS: 'View Search Results',
};

@Injectable()
export class UtilsService {
  getPageTitles(): any {
    return PAGE_TITLES;
  }

  getPostalCodes(): any {
    try {
      if (fs.existsSync(path.resolve(__dirname, '../../utils/postalCodes.json'))) {
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../utils/postalCodes.json'), 'utf-8'));
      }
    } catch (err) {
      return null;
    }
  }

  getSynopsisTemplate(): any {
    return base64.encode(
      fs.readFileSync(path.resolve(__dirname, '../../utils/templates/synopsisTemplate.html'), 'utf8')
    );
  }

  getDetailedPartialTemplate(): any {
    return base64.encode(
      fs.readFileSync(path.resolve(__dirname, '../../utils/templates/detailedPartialTemplate.html'), 'utf8')
    );
  }

  getNilTemplate(): any {
    return base64.encode(fs.readFileSync(path.resolve(__dirname, '../../utils/templates/nilTemplate.html'), 'utf8'));
  }
}
