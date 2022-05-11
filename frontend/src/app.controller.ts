import { Get, Controller, Render } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { PAGE_TITLES } from 'utils/constants';
import { AppService } from './app.service';

dotenv.config();

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.INDEX,
        }
      : {
          title: PAGE_TITLES.INDEX,
        };
  }

  @Get('parcel-id')
  @Render('parcel-id')
  getParcelId() {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.PARCEL_ID,
        }
      : {
          title: PAGE_TITLES.PARCEL_ID,
        };
  }

  @Get('crown-lands-pin')
  @Render('crown-lands-pin')
  getCrownLandsPin() {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.CROWN_PIN,
        }
      : {
          title: PAGE_TITLES.CROWN_PIN,
        };
  }

  @Get('crown-lands-file')
  @Render('crown-lands-file')
  getCrownLandsFile() {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.CROWN_FILE,
        }
      : {
          title: PAGE_TITLES.CROWN_FILE,
        };
  }

  @Get('site-id-search')
  @Render('site-id-search')
  getSiteIdSearch() {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.SITE_ID_SEARCH,
        }
      : {
          title: PAGE_TITLES.SITE_ID_SEARCH,
        };
  }

  @Get('address-search')
  @Render('address-search')
  getAddressSearch() {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.ADDRESS_SEARCH,
        }
      : {
          title: PAGE_TITLES.ADDRESS_SEARCH,
        };
  }

  @Get('area-search')
  @Render('area-search')
  getAreaSearch() {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.AREA_SEARCH,
        }
      : {
          title: PAGE_TITLES.AREA_SEARCH,
        };
  }
}
