import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SrdatesService } from './srdates.service';
import { CreateSrdateDto } from './dto/create-srdate.dto';
import { UpdateSrdateDto } from './dto/update-srdate.dto';

@ApiTags('srdates')
@Controller('srdates')
export class SrdatesController {
  constructor(private readonly srdatesService: SrdatesService) {}

  @Post()
  create(@Body() createSrdateDto: CreateSrdateDto) {
    return this.srdatesService.create(createSrdateDto);
  }

  @Get()
  async firstEntry() {
    const dateObject = await this.srdatesService.findAll();
    const isoDate = dateObject[0].downloaddate;
    const date = new Date(isoDate);
    const month = date.toLocaleString('default', { month: 'long' });
    const updateString = month + ' ' + date.getUTCDate() + ', ' + date.getUTCFullYear();
    return updateString;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.srdatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSrdateDto: UpdateSrdateDto) {
    return this.srdatesService.update(+id, updateSrdateDto);
  }

  @Delete()
  removeAll() {
    return this.srdatesService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.srdatesService.remove(+id);
  }
}
