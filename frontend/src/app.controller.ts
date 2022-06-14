import { Get, Controller, Render, UseGuards, UseFilters, Req, Res, Session } from '@nestjs/common';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { PAGE_TITLES } from 'utils/constants';
import { AuthenticationFilter } from './authentication/authentication.filter';
import { AuthenticationService } from './authentication/authentication.service';

@Controller()
export class AppController {
  constructor(private authenticationService: AuthenticationService) {}

  @Get()
  @Render('index')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async root(@Session() session: { token?: string }) {
    const token = session.token;
    const userObject = await this.authenticationService.getUserDetails(token);
    const name = userObject.firstname + ' ' + userObject.lastname;
    // console.log(userObject);
    // const userSettings = await this.authenticationService.getUserSettings(token, userObject.keycloakGuid);
    // console.log(userSettings[0].id); // id for pay api

    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.INDEX,
          username: name,
        }
      : {
          title: PAGE_TITLES.INDEX,
          username: name,
        };
  }

  @Get('parcel-id')
  @Render('parcel-id')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getParcelId(@Session() session: { token?: string }) {
    const token = session.token;
    const userObject = await this.authenticationService.getUserDetails(token);
    const name = userObject.firstname + ' ' + userObject.lastname;

    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.PARCEL_ID,
          username: name,
        }
      : {
          title: PAGE_TITLES.PARCEL_ID,
          username: name,
        };
  }

  @Get('crown-lands-pin')
  @Render('crown-lands-pin')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getCrownLandsPin(@Session() session: { token?: string }) {
    const token = session.token;
    const userObject = await this.authenticationService.getUserDetails(token);
    const name = userObject.firstname + ' ' + userObject.lastname;

    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.CROWN_PIN,
          username: name,
        }
      : {
          title: PAGE_TITLES.CROWN_PIN,
          username: name,
        };
  }

  @Get('crown-lands-file')
  @Render('crown-lands-file')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getCrownLandsFile(@Session() session: { token?: string }) {
    const token = session.token;
    const userObject = await this.authenticationService.getUserDetails(token);
    const name = userObject.firstname + ' ' + userObject.lastname;

    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.CROWN_FILE,
          username: name,
        }
      : {
          title: PAGE_TITLES.CROWN_FILE,
          username: name,
        };
  }

  @Get('site-id-search')
  @Render('site-id-search')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getSiteIdSearch(@Session() session: { token?: string }) {
    const token = session.token;
    const userObject = await this.authenticationService.getUserDetails(token);
    const name = userObject.firstname + ' ' + userObject.lastname;

    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.SITE_ID_SEARCH,
          username: name,
        }
      : {
          title: PAGE_TITLES.SITE_ID_SEARCH,
          username: name,
        };
  }

  @Get('address-search')
  @Render('address-search')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getAddressSearch(@Session() session: { token?: string }) {
    const token = session.token;
    const userObject = await this.authenticationService.getUserDetails(token);
    const name = userObject.firstname + ' ' + userObject.lastname;

    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.ADDRESS_SEARCH,
          username: name,
        }
      : {
          title: PAGE_TITLES.ADDRESS_SEARCH,
          username: name,
        };
  }

  @Get('area-search')
  @Render('area-search')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getAreaSearch(@Session() session: { token?: string }) {
    const token = session.token;
    const userObject = await this.authenticationService.getUserDetails(token);
    const name = userObject.firstname + ' ' + userObject.lastname;

    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.AREA_SEARCH,
          username: name,
        }
      : {
          title: PAGE_TITLES.AREA_SEARCH,
          username: name,
        };
  }

  @Get('view-search-results')
  @Render('view-search-results')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getViewSearchResults(@Session() session: { token?: string }) {
    const token = session.token;
    const userObject = await this.authenticationService.getUserDetails(token);
    const name = userObject.firstname + ' ' + userObject.lastname;

    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.VIEW_SEARCH_RESULTS,
          username: name,
        }
      : {
          title: PAGE_TITLES.VIEW_SEARCH_RESULTS,
          username: name,
        };
  }
}
