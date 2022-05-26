import { Get, Controller, Param, Body, Post } from '@nestjs/common';
import { SiteRegistryService } from './site-registry.service';

@Controller('site-registry')
export class SiteRegistryController {
  constructor(private siteRegistryService: SiteRegistryService) {}

  @Get('searchPid/:pid')
  async getPidSearch(@Param('pid') pid: string): Promise<any> {
    return this.siteRegistryService.searchPid(pid);
  }

  @Get('searchCLP/:pin')
  async getCLPSearch(@Param('pin') pin: string): Promise<any> {
    return this.siteRegistryService.searchCrownPin(pin);
  }

  @Get('searchCLF/:crownLandsFileNumber')
  async getCLFSearch(@Param('crownLandsFileNumber') crownLandsFileNumber: string): Promise<any> {
    return this.siteRegistryService.searchCrownFile(crownLandsFileNumber);
  }

  @Get('searchSiteId/:siteId')
  async getSiteIdSearch(@Param('siteId') siteId: string): Promise<any> {
    return this.siteRegistryService.searchSiteId(siteId);
  }

  @Get('searchAddr/:address')
  async getAddressSearch(@Param('address') address: string): Promise<any> {
    return this.siteRegistryService.searchAddress(address);
  }

  @Get('searchArea/:lat/:lng/:size')
  async getSearchArea(@Param('lat') lat: string, @Param('lng') lng: string, @Param('size') size: string): Promise<any> {
    return this.siteRegistryService.searchArea(lat, lng, size);
  }
}
