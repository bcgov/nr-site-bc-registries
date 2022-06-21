import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SrsitesService } from './srsites.service';
import { CreateSrsiteDto } from './dto/create-srsite.dto';
import { UpdateSrsiteDto } from './dto/update-srsite.dto';
import { MinimalSiteData } from 'utils/constants';

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
    return this.srsitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.srsitesService.findOne(+id);
  }

  @Get('searchPid/:pid')
  searchPid(@Param('pid') pid: string): Promise<MinimalSiteData[]> | [] {
    return this.srsitesService.searchPid(pid);
  }

  @Get('searchCrownPin/:pin')
  searchCrownPin(@Param('pin') pin: string): Promise<MinimalSiteData[]> | [] {
    return this.srsitesService.searchCrownPin(pin);
  }

  @Get('searchCrownFile/:crownLandsFileNumber')
  searchCrownFile(@Param('crownLandsFileNumber') crownLandsFileNumber: string): Promise<MinimalSiteData[]> | [] {
    return this.srsitesService.searchCrownFile(crownLandsFileNumber);
  }

  @Get('searchSiteId/:siteId')
  searchSiteId(@Param('siteId') siteId: string): Promise<MinimalSiteData[]> | [] {
    return this.srsitesService.searchSiteId(siteId);
  }

  @Post('searchAddress')
  searchAddress(@Body('address') address: string, @Body('city') city: string): Promise<MinimalSiteData[]> | [] {
    return this.srsitesService.searchAddress(address, city);
  }

  @Get('searchArea/:lat/:lng/:size')
  searchArea(
    @Param('lat') lat: string,
    @Param('lng') lng: string,
    @Param('size') size: string
  ): Promise<MinimalSiteData[]> | [] {
    return this.srsitesService.searchArea(lat, lng, size);
  }

  @Get('synopsisReport/:siteId')
  getSynopsisReportData(@Param('siteId') siteId: string) {
    return this.srsitesService.getSynopsisReportData(siteId);
  }

  @Get('detailedReport/:siteId')
  getDetailedReportData(@Param('siteId') siteId: string) {
    return this.srsitesService.getDetailedReportData(siteId);
  }

  // id is unused, it's necessary for this route to work though
  @Get('getNilReportData/:id')
  getNilReportData() {
    return this.srsitesService.getNilReportData();
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
