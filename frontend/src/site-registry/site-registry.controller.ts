import {
  Get,
  Controller,
  Param,
  Session,
  UseFilters,
  UseGuards,
  Post,
  Body,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { AuthenticationFilter } from '../authentication/authentication.filter';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { SearchResultsObject, SessionData } from 'utils/types';
import { SiteRegistryService } from './site-registry.service';
import { AddressSearchPipe } from './pipe/address-search.pipe';
import { AreaSearchPipe } from './pipe/area-search.pipe';
import { CrownLandsFileSearchPipe } from './pipe/crown-lands-file-search.pipe';

type AddressSearchObject = { address: string; city: string };
type AreaSearchObject = { lat: string; lng: string; size: string };

@Controller('site-registry')
@UseFilters(AuthenticationFilter)
@UseGuards(AuthenticationGuard)
export class SiteRegistryController {
  constructor(private siteRegistryService: SiteRegistryService) {}

  @Get('searchPid/:pid')
  async getPidSearch(
    @Param('pid', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) pid: string,
    @Session() session: { data?: SessionData }
  ): Promise<[SearchResultsObject] | { error: string }> {
    return this.siteRegistryService.searchPid(pid, session.data.access_token, session.data.activeAccount.id);
  }

  @Get('searchCLP/:pin')
  async getCLPSearch(
    @Param('pin', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) pin: string,
    @Session() session: { data?: SessionData }
  ): Promise<[SearchResultsObject] | { error: string }> {
    return this.siteRegistryService.searchCrownPin(pin, session.data.access_token, session.data.activeAccount.id);
  }

  @Get('searchCLF/:crownLandsFileNumber')
  async getCLFSearch(
    @Param('crownLandsFileNumber', CrownLandsFileSearchPipe) crownLandsFileNumber: string,
    @Session() session: { data?: SessionData }
  ): Promise<[SearchResultsObject] | { error: string }> {
    return this.siteRegistryService.searchCrownFile(
      crownLandsFileNumber,
      session.data.access_token,
      session.data.activeAccount.id
    );
  }

  @Get('searchSiteId/:siteId')
  async getSiteIdSearch(
    @Param('siteId', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST })) siteId: string,
    @Session() session: { data?: SessionData }
  ): Promise<[SearchResultsObject] | { error: string }> {
    return this.siteRegistryService.searchSiteId(siteId, session.data.access_token, session.data.activeAccount.id);
  }

  @Post('searchAddr')
  async postAddressSearch(
    @Body(AddressSearchPipe) searchObject: AddressSearchObject,
    @Session() session: { data?: SessionData }
  ): Promise<[SearchResultsObject] | { error: string }> {
    return this.siteRegistryService.searchAddress(
      searchObject.address,
      searchObject.city,
      session.data.access_token,
      session.data.activeAccount.id
    );
  }

  @Post('searchArea')
  async postAreaSearch(
    @Body(AreaSearchPipe) searchObject: AreaSearchObject,
    @Session() session: { data?: SessionData }
  ): Promise<[SearchResultsObject] | { error: string }> {
    return this.siteRegistryService.searchArea(
      searchObject.lat,
      searchObject.lng,
      searchObject.size,
      session.data.access_token,
      session.data.activeAccount.id
    );
  }
}
