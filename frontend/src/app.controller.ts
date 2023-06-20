import { Get, Controller, Render, UseGuards, UseFilters, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { PAGE_TITLES } from 'utils/constants';
import { SessionData } from 'utils/types';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { AuthenticationFilter } from './authentication/authentication.filter';
import { AccountGuard } from './account/account.guard';
import { AccountFilter } from './account/account.filter';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  @Render('index')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async root(@Session() session: { data?: SessionData }) {
    const username = session.data.name;
    const label =
      session.data.activeAccount !== null &&
      session.data.activeAccount !== undefined &&
      session.data.accounts &&
      session.data.accounts.length <= 1
        ? session.data.activeAccount.label
        : session.data.accounts.length == 0
        ? '~'
        : '-';
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.INDEX,
          username: username,
          label: label,
          accounts: session.data.accounts,
          downloaddate: 'Site Registry data current to' + this.appService.getDownloadDate(),
        }
      : {
          title: PAGE_TITLES.INDEX,
          username: username,
          label: label,
          accounts: session.data.accounts,
          downloaddate: 'Site Registry data current to' + this.appService.getDownloadDate(),
        };
  }

  @Get('parcel-id')
  @Render('parcel-id')
  @UseFilters(AccountFilter)
  @UseGuards(AccountGuard)
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getParcelId(@Session() session: { data?: SessionData }) {
    const username = session.data.name;
    const label =
      session.data.activeAccount !== null && session.data.activeAccount !== undefined
        ? session.data.activeAccount.label
        : session.data.accounts.length == 0
        ? '~'
        : '-';
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.PARCEL_ID,
          username: username,
          label: label,
          downloaddate: 'Site Registry data current to' + this.appService.getDownloadDate(),
        }
      : {
          title: PAGE_TITLES.PARCEL_ID,
          username: username,
          label: label,
          downloaddate: 'Site Registry data current to' + this.appService.getDownloadDate(),
        };
  }

  @Get('crown-lands-pin')
  @Render('crown-lands-pin')
  @UseFilters(AccountFilter)
  @UseGuards(AccountGuard)
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getCrownLandsPin(@Session() session: { data?: SessionData }) {
    const username = session.data.name;
    const label =
      session.data.activeAccount !== null && session.data.activeAccount !== undefined
        ? session.data.activeAccount.label
        : session.data.accounts.length == 0
        ? '~'
        : '-';
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.CROWN_PIN,
          username: username,
          label: label,
          downloaddate: 'Site Registry data current to' + this.appService.getDownloadDate(),
        }
      : {
          title: PAGE_TITLES.CROWN_PIN,
          username: username,
          label: label,
          downloaddate: 'Site Registry data current to' + this.appService.getDownloadDate(),
        };
  }

  @Get('crown-lands-file')
  @Render('crown-lands-file')
  @UseFilters(AccountFilter)
  @UseGuards(AccountGuard)
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getCrownLandsFile(@Session() session: { data?: SessionData }) {
    const username = session.data.name;
    const label =
      session.data.activeAccount !== null && session.data.activeAccount !== undefined
        ? session.data.activeAccount.label
        : session.data.accounts.length == 0
        ? '~'
        : '-';
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.CROWN_FILE,
          username: username,
          label: label,
          downloaddate: 'Site Registry data current to' + this.appService.getDownloadDate(),
        }
      : {
          title: PAGE_TITLES.CROWN_FILE,
          username: username,
          label: label,
          downloaddate: 'Site Registry data current to' + this.appService.getDownloadDate(),
        };
  }

  @Get('site-id-search')
  @Render('site-id-search')
  @UseFilters(AccountFilter)
  @UseGuards(AccountGuard)
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getSiteIdSearch(@Session() session: { data?: SessionData }) {
    const username = session.data.name;
    const label =
      session.data.activeAccount !== null && session.data.activeAccount !== undefined
        ? session.data.activeAccount.label
        : session.data.accounts.length == 0
        ? '~'
        : '-';
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.SITE_ID_SEARCH,
          username: username,
          label: label,
          downloaddate: 'Site Registry data current to' + this.appService.getDownloadDate(),
        }
      : {
          title: PAGE_TITLES.SITE_ID_SEARCH,
          username: username,
          label: label,
          downloaddate: 'Site Registry data current to' + this.appService.getDownloadDate(),
        };
  }

  @Get('address-search')
  @Render('address-search')
  @UseFilters(AccountFilter)
  @UseGuards(AccountGuard)
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getAddressSearch(@Session() session: { data?: SessionData }) {
    const username = session.data.name;
    const label =
      session.data.activeAccount !== null && session.data.activeAccount !== undefined
        ? session.data.activeAccount.label
        : session.data.accounts.length == 0
        ? '~'
        : '-';
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.ADDRESS_SEARCH,
          username: username,
          label: label,
          downloaddate: 'Site Registry data current to' + this.appService.getDownloadDate(),
        }
      : {
          title: PAGE_TITLES.ADDRESS_SEARCH,
          username: username,
          label: label,
          downloaddate: 'Site Registry data current to' + this.appService.getDownloadDate(),
        };
  }

  @Get('area-search')
  @Render('area-search')
  @UseFilters(AccountFilter)
  @UseGuards(AccountGuard)
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getAreaSearch(@Session() session: { data?: SessionData }) {
    const username = session.data.name;
    const label =
      session.data.activeAccount !== null && session.data.activeAccount !== undefined
        ? session.data.activeAccount.label
        : session.data.accounts.length == 0
        ? '~'
        : '-';
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.AREA_SEARCH,
          username: username,
          label: label,
          downloaddate: 'Site Registry data current to' + this.appService.getDownloadDate(),
        }
      : {
          title: PAGE_TITLES.AREA_SEARCH,
          username: username,
          label: label,
          downloaddate: 'Site Registry data current to' + this.appService.getDownloadDate(),
        };
  }

  @Get('view-search-results')
  @Render('view-search-results')
  @UseFilters(AccountFilter)
  @UseGuards(AccountGuard)
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getViewSearchResults(@Session() session: { data?: SessionData }) {
    const username = session.data.name;
    const label =
      session.data.activeAccount !== null && session.data.activeAccount !== undefined
        ? session.data.activeAccount.label
        : session.data.accounts.length == 0
        ? '~'
        : '-';
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.VIEW_SEARCH_RESULTS,
          username: username,
          label: label,
          downloaddate: 'Site Registry data current to' + this.appService.getDownloadDate(),
          emails: { emails: session.data.contacts },
        }
      : {
          title: PAGE_TITLES.VIEW_SEARCH_RESULTS,
          username: username,
          label: label,
          downloaddate: 'Site Registry data current to' + this.appService.getDownloadDate(),
          emails: { emails: session.data.contacts },
        };
  }

  @Get('error')
  @Render('error')
  async getErrorPage() {
    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.ERROR_PAGE,
          username: '',
          label: '',
          downloaddate: '',
          emails: { emails: [] },
        }
      : {
          title: PAGE_TITLES.ERROR_PAGE,
          username: '',
          label: '',
          downloaddate: '',
          emails: { emails: [] },
        };
  }
}
