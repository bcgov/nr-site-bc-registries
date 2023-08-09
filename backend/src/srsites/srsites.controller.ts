import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SrsitesService } from './srsites.service';
import { CreateSrsiteDto } from './dto/create-srsite.dto';
import { UpdateSrsiteDto } from './dto/update-srsite.dto';
import { MinimalSiteData } from 'utils/constants';
import { logCurrentTimePST } from 'utils/util';
//
@ApiTags('srsites')
@Controller('srsites')
export class SrsitesController {
  constructor(private readonly srsitesService: SrsitesService) {}

  @Post()
  create(@Body() createSrsiteDto: CreateSrsiteDto) {
    return this.srsitesService.create(createSrsiteDto);
  }

  @Get()
  findAll() {
    logCurrentTimePST('findAll');
    return this.srsitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    logCurrentTimePST('findOne');
    return this.srsitesService.findOne(+id);
  }

  @Get('searchPid/:pid')
  searchPid(@Param('pid') pid: string): Promise<MinimalSiteData[]> | [] {
    logCurrentTimePST('searchPid');
    return this.srsitesService.searchPid(pid);
  }

  @Get('searchCrownPin/:pin')
  searchCrownPin(@Param('pin') pin: string): Promise<MinimalSiteData[]> | [] {
    logCurrentTimePST('searchCrownPin');
    return this.srsitesService.searchCrownPin(pin);
  }

  @Get('searchCrownFile/:crownLandsFileNumber')
  searchCrownFile(@Param('crownLandsFileNumber') crownLandsFileNumber: string): Promise<MinimalSiteData[]> | [] {
    logCurrentTimePST('searchCrownFile');
    return this.srsitesService.searchCrownFile(decodeURIComponent(crownLandsFileNumber));
  }

  @Get('searchSiteId/:siteId')
  searchSiteId(@Param('siteId') siteId: string): Promise<MinimalSiteData[]> | [] {
    logCurrentTimePST('searchSiteId');
    return this.srsitesService.searchSiteId(siteId);
  }

  @Post('searchAddress')
  searchAddress(@Body('address') address: string, @Body('city') city: string): Promise<MinimalSiteData[]> | [] {
    logCurrentTimePST('searchAddress');
    return this.srsitesService.searchAddress(address, city);
  }

  @Get('searchArea/:lat/:lng/:size')
  searchArea(
    @Param('lat') lat: string,
    @Param('lng') lng: string,
    @Param('size') size: string
  ): Promise<MinimalSiteData[]> | [] {
    logCurrentTimePST('searchArea');
    return this.srsitesService.searchArea(lat, lng, size);
  }

  @Get('synopsisReport/:siteId')
  getSynopsisReportData(@Param('siteId') siteId: string) {
    logCurrentTimePST('synopsisReport');
    return this.srsitesService.getSynopsisReportData(siteId);
  }

  @Get('detailsReport/:siteId')
  getDetailsReportData(@Param('siteId') siteId: string) {
    logCurrentTimePST('detailsReport');
    return this.srsitesService.getDetailsReportData(siteId);
  }

  // id is unused, it's necessary for this route to work though
  @Get('getNilReportData/:id')
  getNilReportData() {
    logCurrentTimePST('getNilReportData');
    return this.srsitesService.getNilReportData();
  }

  // only queries the db for the downloaddate, id is unused
  @Get('getSearchResultsData/:id')
  getSearchResultsData() {
    logCurrentTimePST('getSearchResultsData');
    return this.srsitesService.getSearchResultsData();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSrsiteDto: UpdateSrsiteDto) {
    return this.srsitesService.update(+id, updateSrsiteDto);
  }

  @Delete()
  async removeAll() {
    return this.srsitesService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.srsitesService.remove(+id);
  }
}
