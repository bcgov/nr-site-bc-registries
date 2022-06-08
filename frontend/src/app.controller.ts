import { Get, Controller, Render, UseGuards } from '@nestjs/common';
import { AuthGuard, Unprotected } from 'nest-keycloak-connect';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { PAGE_TITLES } from 'utils/constants';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Render('index')
  @Unprotected()
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
  @Unprotected()
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
  // @UseGuards(AuthenticationGuard)
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
  // @UseGuards(AuthenticationGuard)
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
  // @UseGuards(AuthenticationGuard)
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
  // @UseGuards(AuthenticationGuard)
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
  // @UseGuards(AuthenticationGuard)
  getAreaSearch() {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.AREA_SEARCH,
        }
      : {
          title: PAGE_TITLES.AREA_SEARCH,
        };
  }

  @Get('view-search-results')
  @Render('view-search-results')
  // @UseGuards(AuthenticationGuard)
  getViewSearchResults() {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.VIEW_SEARCH_RESULTS,
        }
      : {
          title: PAGE_TITLES.VIEW_SEARCH_RESULTS,
        };
  }
}
