import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SrprfansService } from './srprfans.service';
import { CreateSrprfanDto } from './dto/create-srprfan.dto';
import { UpdateSrprfanDto } from './dto/update-srprfan.dto';

@ApiTags('srprfans')
@Controller('srprfans')
export class SrprfansController {
  constructor(private readonly srprfansService: SrprfansService) {}

  @Post()
  create(@Body() createSrprfanDto: CreateSrprfanDto) {
    return this.srprfansService.create(createSrprfanDto);
  }

  @Get()
  findAll() {
    return this.srprfansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.srprfansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSrprfanDto: UpdateSrprfanDto) {
    return this.srprfansService.update(+id, updateSrprfanDto);
  }

  @Delete()
  async removeAll() {
    return this.srprfansService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.srprfansService.remove(+id);
  }
}
