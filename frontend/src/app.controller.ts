import { Get, Controller, Render, UseGuards, UseFilters, Req, Param, Query, Res } from '@nestjs/common';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { PAGE_TITLES } from 'utils/constants';
import { AuthenticationFilter } from './authentication/authentication.filter';
import { Response } from 'express';
import { AuthenticationService } from './authentication/authentication.service';

@Controller()
export class AppController {
  constructor(private authenticationService: AuthenticationService) {}

  @Get()
  @Render('index')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async root(@Res() res: Response) {
    const token = res.locals.token;
    const userObject = await this.authenticationService.getUserDetails(token);
    console.log(userObject);
    const userSettings = await this.authenticationService.getUserSettings(token, userObject.keycloakGuid);
    console.log(userSettings[0].id); // id for pay api

    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.INDEX,
          username: userObject.name,
        }
      : {
          title: PAGE_TITLES.INDEX,
          username: userObject.name,
        };
  }

  @Get('parcel-id')
  @Render('parcel-id')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getParcelId(@Res() res: Response) {
    const token = res.locals.token;
    const userObject = await this.authenticationService.getUserDetails(token);

    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.PARCEL_ID,
          username: userObject.name,
        }
      : {
          title: PAGE_TITLES.PARCEL_ID,
          username: userObject.name,
        };
  }

  @Get('crown-lands-pin')
  @Render('crown-lands-pin')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getCrownLandsPin(@Res() res: Response) {
    const token = res.locals.token;
    const userObject = await this.authenticationService.getUserDetails(token);

    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.CROWN_PIN,
          username: userObject.name,
        }
      : {
          title: PAGE_TITLES.CROWN_PIN,
          username: userObject.name,
        };
  }

  @Get('crown-lands-file')
  @Render('crown-lands-file')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getCrownLandsFile(@Res() res: Response) {
    const token = res.locals.token;
    const userObject = await this.authenticationService.getUserDetails(token);

    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.CROWN_FILE,
          username: userObject.name,
        }
      : {
          title: PAGE_TITLES.CROWN_FILE,
          username: userObject.name,
        };
  }

  @Get('site-id-search')
  @Render('site-id-search')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getSiteIdSearch(@Res() res: Response) {
    const token = res.locals.token;
    const userObject = await this.authenticationService.getUserDetails(token);

    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.SITE_ID_SEARCH,
          username: userObject.name,
        }
      : {
          title: PAGE_TITLES.SITE_ID_SEARCH,
          username: userObject.name,
        };
  }

  @Get('address-search')
  @Render('address-search')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getAddressSearch(@Res() res: Response) {
    const token = res.locals.token;
    const userObject = await this.authenticationService.getUserDetails(token);

    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.ADDRESS_SEARCH,
          username: userObject.name,
        }
      : {
          title: PAGE_TITLES.ADDRESS_SEARCH,
          username: userObject.name,
        };
  }

  @Get('area-search')
  @Render('area-search')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getAreaSearch(@Res() res: Response) {
    const token = res.locals.token;
    const userObject = await this.authenticationService.getUserDetails(token);

    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.AREA_SEARCH,
          username: userObject.name,
        }
      : {
          title: PAGE_TITLES.AREA_SEARCH,
          username: userObject.name,
        };
  }

  @Get('view-search-results')
  @Render('view-search-results')
  @UseFilters(AuthenticationFilter)
  @UseGuards(AuthenticationGuard)
  async getViewSearchResults(@Res() res: Response) {
    const token = res.locals.token;
    const userObject = await this.authenticationService.getUserDetails(token);

    return process.env.site_environment == 'DEVELOPMENT'
      ? {
          title: 'DEVELOPMENT - ' + PAGE_TITLES.VIEW_SEARCH_RESULTS,
          username: userObject.name,
        }
      : {
          title: PAGE_TITLES.VIEW_SEARCH_RESULTS,
          username: userObject.name,
        };
  }
}
