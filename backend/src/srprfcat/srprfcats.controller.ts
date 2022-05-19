import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ApiTags } from '@nestjs/swagger';
import { SrprfcatsService } from './srprfcats.service';
import { CreateSrprfcatDto } from './dto/create-srprfcat.dto';
import { UpdateSrprfcatDto } from './dto/update-srprfcat.dto';

@ApiTags('srprfcats')
@Controller('srprfcats')
export class SrprfcatsController {
  constructor(private readonly srprfcatsService: SrprfcatsService, private moduleRef: ModuleRef) {}

  @Post()
  create(@Body() createSrprfcatDto: CreateSrprfcatDto) {
    return this.srprfcatsService.create(createSrprfcatDto);
  }

  @Get()
  findAll() {
    return this.srprfcatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.srprfcatsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSrprfcatDto: UpdateSrprfcatDto) {
    return this.srprfcatsService.update(+id, updateSrprfcatDto);
  }

  @Delete()
  removeAll() {
    return this.srprfcatsService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.srprfcatsService.remove(+id);
  }
}
