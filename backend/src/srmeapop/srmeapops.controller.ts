import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SrmeapopsService } from './srmeapops.service';
import { CreateSrmeapopDto } from './dto/create-srmeapop.dto';
import { UpdateSrmeapopDto } from './dto/update-srmeapop.dto';

@ApiTags('srmeapops')
@Controller('srmeapops')
export class SrmeapopsController {
  constructor(private readonly srmeapopsService: SrmeapopsService) {}

  @Post()
  create(@Body() createSrmeapopDto: CreateSrmeapopDto) {
    return this.srmeapopsService.create(createSrmeapopDto);
  }

  @Get()
  findAll() {
    return this.srmeapopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.srmeapopsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSrmeapopDto: UpdateSrmeapopDto) {
    return this.srmeapopsService.update(+id, updateSrmeapopDto);
  }

  @Delete()
  removeAll() {
    return this.srmeapopsService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.srmeapopsService.remove(+id);
  }
}
