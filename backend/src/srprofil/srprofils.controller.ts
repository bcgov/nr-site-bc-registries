import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SrprofilsService } from './srprofils.service';
import { CreateSrprofilDto } from './dto/create-srprofil.dto';
import { UpdateSrprofilDto } from './dto/update-srprofil.dto';

@ApiTags('srprofils')
@Controller('srprofils')
export class SrprofilsController {
  constructor(private readonly srprofilsService: SrprofilsService) {}

  @Post()
  create(@Body() createSrprofilDto: CreateSrprofilDto) {
    return this.srprofilsService.create(createSrprofilDto);
  }

  @Get()
  findAll() {
    return this.srprofilsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.srprofilsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSrprofilDto: UpdateSrprofilDto) {
    return this.srprofilsService.update(+id, updateSrprofilDto);
  }

  @Delete()
  async removeAll() {
    return this.srprofilsService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.srprofilsService.remove(+id);
  }
}
