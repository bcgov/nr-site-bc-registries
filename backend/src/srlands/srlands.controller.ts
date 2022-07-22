import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SrlandsService } from './srlands.service';
import { CreateSrlandDto } from './dto/create-srland.dto';
import { UpdateSrlandDto } from './dto/update-srland.dto';

@ApiTags('srlands')
@Controller('srlands')
export class SrlandsController {
  constructor(private readonly srlandsService: SrlandsService) {}

  @Post()
  create(@Body() createSrlandDto: CreateSrlandDto) {
    return this.srlandsService.create(createSrlandDto);
  }

  @Get()
  findAll() {
    return this.srlandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.srlandsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSrlandDto: UpdateSrlandDto) {
    return this.srlandsService.update(+id, updateSrlandDto);
  }

  @Delete()
  async removeAll() {
    return this.srlandsService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.srlandsService.remove(+id);
  }
}
