import { Get, Controller, Render, UseGuards, UseFilters, Session } from '@nestjs/common';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { PAGE_TITLES } from 'utils/constants';
import { AuthenticationFilter } from './authentication/authentication.filter';
import { SessionData } from 'utils/types';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  @Render('index')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async root(@Session() session: { data?: SessionData }) {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.INDEX,
          username: session.data.name,
          label: session.data.label,
          downloaddate: 'As Of ' + this.appService.getDownloadDate(),
        }
      : {
          title: PAGE_TITLES.INDEX,
          username: session.data.name,
          label: session.data.label,
          downloaddate: 'As Of ' + this.appService.getDownloadDate(),
        };
  }

  @Get('parcel-id')
  @Render('parcel-id')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getParcelId(@Session() session: { data?: SessionData }) {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.PARCEL_ID,
          username: session.data.name,
          label: session.data.label,
          downloaddate: 'As Of ' + this.appService.getDownloadDate(),
        }
      : {
          title: PAGE_TITLES.PARCEL_ID,
          username: session.data.name,
          label: session.data.label,
          downloaddate: 'As Of ' + this.appService.getDownloadDate(),
        };
  }

  @Get('crown-lands-pin')
  @Render('crown-lands-pin')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getCrownLandsPin(@Session() session: { data?: SessionData }) {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.CROWN_PIN,
          username: session.data.name,
          label: session.data.label,
          downloaddate: 'As Of ' + this.appService.getDownloadDate(),
        }
      : {
          title: PAGE_TITLES.CROWN_PIN,
          username: session.data.name,
          label: session.data.label,
          downloaddate: 'As Of ' + this.appService.getDownloadDate(),
        };
  }

  @Get('crown-lands-file')
  @Render('crown-lands-file')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getCrownLandsFile(@Session() session: { data?: SessionData }) {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.CROWN_FILE,
          username: session.data.name,
          label: session.data.label,
          downloaddate: 'As Of ' + this.appService.getDownloadDate(),
        }
      : {
          title: PAGE_TITLES.CROWN_FILE,
          username: session.data.name,
          label: session.data.label,
          downloaddate: 'As Of ' + this.appService.getDownloadDate(),
        };
  }

  @Get('site-id-search')
  @Render('site-id-search')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getSiteIdSearch(@Session() session: { data?: SessionData }) {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.SITE_ID_SEARCH,
          username: session.data.name,
          label: session.data.label,
          downloaddate: 'As Of ' + this.appService.getDownloadDate(),
        }
      : {
          title: PAGE_TITLES.SITE_ID_SEARCH,
          username: session.data.name,
          label: session.data.label,
          downloaddate: 'As Of ' + this.appService.getDownloadDate(),
        };
  }

  @Get('address-search')
  @Render('address-search')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getAddressSearch(@Session() session: { data?: SessionData }) {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.ADDRESS_SEARCH,
          username: session.data.name,
          label: session.data.label,
          downloaddate: 'As Of ' + this.appService.getDownloadDate(),
        }
      : {
          title: PAGE_TITLES.ADDRESS_SEARCH,
          username: session.data.name,
          label: session.data.label,
          downloaddate: 'As Of ' + this.appService.getDownloadDate(),
        };
  }

  @Get('area-search')
  @Render('area-search')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getAreaSearch(@Session() session: { data?: SessionData }) {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.AREA_SEARCH,
          username: session.data.name,
          label: session.data.label,
          downloaddate: 'As Of ' + this.appService.getDownloadDate(),
        }
      : {
          title: PAGE_TITLES.AREA_SEARCH,
          username: session.data.name,
          label: session.data.label,
          downloaddate: 'As Of ' + this.appService.getDownloadDate(),
        };
  }

  @Get('view-search-results')
  @Render('view-search-results')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getViewSearchResults(@Session() session: { data?: SessionData }) {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.VIEW_SEARCH_RESULTS,
          username: session.data.name,
          label: session.data.label,
          downloaddate: 'As Of ' + this.appService.getDownloadDate(),
        }
      : {
          title: PAGE_TITLES.VIEW_SEARCH_RESULTS,
          username: session.data.name,
          label: session.data.label,
          downloaddate: 'As Of ' + this.appService.getDownloadDate(),
        };
  }
}
