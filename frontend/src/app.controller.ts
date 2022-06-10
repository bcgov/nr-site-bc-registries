import { Get, Controller, Render, UseGuards, UseFilters } from '@nestjs/common';
import { AuthenticatedUser, AuthGuard, Unprotected } from 'nest-keycloak-connect';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { PAGE_TITLES } from 'utils/constants';
import { AuthenticationFilter } from './authentication/authentication.filter';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Render('index')
  @Unprotected()
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
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
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
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
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
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
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
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
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
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
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
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
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
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
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
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
