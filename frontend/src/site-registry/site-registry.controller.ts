import { Get, Controller, Param, Session, UseFilters, UseGuards, Post, Body } from '@nestjs/common';
import { AuthenticationFilter } from '../authentication/authentication.filter';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { PayService } from '../pay/pay.service';
import { SearchResultsObject, SessionData } from 'utils/types';
import { SiteRegistryService } from './site-registry.service';

@Controller('site-registry')
@UseFilters(AuthenticationFilter)
@UseGuards(AuthenticationGuard)
export class SiteRegistryController {
  constructor(private siteRegistryService: SiteRegistryService, private payService: PayService) {}

  @Get('searchPid/:pid')
  async getPidSearch(
    @Param('pid') pid: string,
    @Session() session: { data?: SessionData }
  ): Promise<[SearchResultsObject] | { error: string }> {
    return this.siteRegistryService.searchPid(pid, session.data.access_token, session.data.account_id);
  }

  @Get('searchCLP/:pin')
  async getCLPSearch(
    @Param('pin') pin: string,
    @Session() session: { data?: SessionData }
  ): Promise<[SearchResultsObject] | { error: string }> {
    return this.siteRegistryService.searchCrownPin(pin, session.data.access_token, session.data.account_id);
  }

  @Get('searchCLF/:crownLandsFileNumber')
  async getCLFSearch(
    @Param('crownLandsFileNumber') crownLandsFileNumber: string,
    @Session() session: { data?: SessionData }
  ): Promise<[SearchResultsObject] | { error: string }> {
    return this.siteRegistryService.searchCrownFile(
      crownLandsFileNumber,
      session.data.access_token,
      session.data.account_id
    );
  }

  @Get('searchSiteId/:siteId')
  async getSiteIdSearch(
    @Param('siteId') siteId: string,
    @Session() session: { data?: SessionData }
  ): Promise<[SearchResultsObject] | { error: string }> {
    return this.siteRegistryService.searchSiteId(siteId, session.data.access_token, session.data.account_id);
  }

  @Post('searchAddr')
  async postAddressSearch(
    @Body('address') address: string,
    @Body('city') city: string,
    @Session() session: { data?: SessionData }
  ): Promise<[SearchResultsObject] | { error: string }> {
    return this.siteRegistryService.searchAddress(address, city, session.data.access_token, session.data.account_id);
  }

  @Get('searchArea/:lat/:lng/:size')
  async getSearchArea(
    @Param('lat') lat: string,
    @Param('lng') lng: string,
    @Param('size') size: string,
    @Session() session: { data?: SessionData }
  ): Promise<[SearchResultsObject] | { error: string }> {
    return this.siteRegistryService.searchArea(lat, lng, size, session.data.access_token, session.data.account_id);
  }
}
