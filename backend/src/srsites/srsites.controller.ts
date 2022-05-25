import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SrsitesService } from './srsites.service';
import { CreateSrsiteDto } from './dto/create-srsite.dto';
import { UpdateSrsiteDto } from './dto/update-srsite.dto';
import { Srsite } from './entities/srsite.entity';

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
  searchPid(@Param('pid') pid: string): Promise<Srsite> {
    return this.srsitesService.searchPid(pid);
  }

  @Get('searchCrownPin/:pin')
  searchCrownPin(@Param('pin') pin: string): Promise<Srsite> {
    return this.srsitesService.searchCrownPin(pin);
  }

  @Get('searchCrownFile/:crownLandsFileNumber')
  searchCrownFile(@Param('crownLandsFileNumber') crownLandsFileNumber: string): Promise<Srsite> {
    return this.srsitesService.searchCrownFile(crownLandsFileNumber);
  }

  @Get('searchSiteId/:siteId')
  searchSiteId(@Param('siteId') siteId: string): Promise<Srsite> {
    return this.srsitesService.searchSiteId(siteId);
  }

  @Get('searchAddress/:address')
  searchAddress(@Param('address') address: string): Promise<Srsite> {
    return this.srsitesService.searchAddress(address);
  }

  @Get('searchArea/:lat/:lng/:size')
  searchArea(@Param('lat') lat: string, @Param('lng') lng: string, @Param('size') size: string): Promise<Srsite> {
    return this.srsitesService.searchArea(lat, lng, size);
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
