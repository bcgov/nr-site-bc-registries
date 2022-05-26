import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SraecassService } from './sraecass.service';
import { CreateSraecassDto } from './dto/create-sraecass.dto';
import { UpdateSraecassDto } from './dto/update-sraecass.dto';

@ApiTags('sraecass')
@Controller('sraecass')
export class SraecassController {
  constructor(private readonly sraecassService: SraecassService) {}

  @Post()
  create(@Body() createSraecassDto: CreateSraecassDto) {
    return this.sraecassService.create(createSraecassDto);
  }

  @Get()
  findAll() {
    return this.sraecassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sraecassService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSraecassDto: UpdateSraecassDto) {
    return this.sraecassService.update(+id, updateSraecassDto);
  }

  @Delete()
  removeAll() {
    return this.sraecassService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sraecassService.remove(+id);
  }
}
