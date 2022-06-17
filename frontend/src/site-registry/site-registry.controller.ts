import { Get, Controller, Param, Session, UseFilters, UseGuards } from '@nestjs/common';
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
    const paymentStatus = await this.payService.createSearchInvoice(session.data.access_token, session.data.account_id);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      return this.siteRegistryService.searchPid(pid);
    } else {
      return { error: 'Status code = ' + paymentStatus };
    }
  }

  @Get('searchCLP/:pin')
  async getCLPSearch(
    @Param('pin') pin: string,
    @Session() session: { data?: SessionData }
  ): Promise<[SearchResultsObject] | { error: string }> {
    const paymentStatus = await this.payService.createSearchInvoice(session.data.access_token, session.data.account_id);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      return this.siteRegistryService.searchCrownPin(pin);
    } else {
      return { error: 'Status code = ' + paymentStatus };
    }
  }

  @Get('searchCLF/:crownLandsFileNumber')
  async getCLFSearch(
    @Param('crownLandsFileNumber') crownLandsFileNumber: string,
    @Session() session: { data?: SessionData }
  ): Promise<[SearchResultsObject] | { error: string }> {
    const paymentStatus = await this.payService.createSearchInvoice(session.data.access_token, session.data.account_id);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      return this.siteRegistryService.searchCrownFile(crownLandsFileNumber);
    } else {
      return { error: 'Status code = ' + paymentStatus };
    }
  }

  @Get('searchSiteId/:siteId')
  async getSiteIdSearch(
    @Param('siteId') siteId: string,
    @Session() session: { data?: SessionData }
  ): Promise<[SearchResultsObject] | { error: string }> {
    const paymentStatus = await this.payService.createSearchInvoice(session.data.access_token, session.data.account_id);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      return this.siteRegistryService.searchSiteId(siteId);
    } else {
      return { error: 'Status code = ' + paymentStatus };
    }
  }

  @Get('searchAddr/:address/:city')
  async getAddressSearch(
    @Param('address') address: string,
    @Param('city') city: string,
    @Session() session: { data?: SessionData }
  ): Promise<[SearchResultsObject] | { error: string }> {
    const paymentStatus = await this.payService.createSearchInvoice(session.data.access_token, session.data.account_id);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      return this.siteRegistryService.searchAddress(address, city);
    } else {
      return { error: 'Status code = ' + paymentStatus };
    }
  }

  @Get('searchArea/:lat/:lng/:size')
  async getSearchArea(
    @Param('lat') lat: string,
    @Param('lng') lng: string,
    @Param('size') size: string,
    @Session() session: { data?: SessionData }
  ): Promise<[SearchResultsObject] | { error: string }> {
    const paymentStatus = await this.payService.createSearchInvoice(session.data.access_token, session.data.account_id);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      return this.siteRegistryService.searchArea(lat, lng, size);
    } else {
      return { error: 'Status code = ' + paymentStatus };
    }
  }
}
