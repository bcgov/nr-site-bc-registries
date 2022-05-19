import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SrsourcesService } from './srsources.service';
import { CreateSrsourceDto } from './dto/create-srsource.dto';
import { UpdateSrsourceDto } from './dto/update-srsource.dto';

@ApiTags('srsources')
@Controller('srsources')
export class SrsourcesController {
  constructor(private readonly srsourcesService: SrsourcesService) {}

  @Post()
  create(@Body() createSrsourceDto: CreateSrsourceDto) {
    return this.srsourcesService.create(createSrsourceDto);
  }

  @Get()
  findAll() {
    return this.srsourcesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.srsourcesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSrsourceDto: UpdateSrsourceDto) {
    return this.srsourcesService.update(+id, updateSrsourceDto);
  }

  @Delete()
  removeAll() {
    return this.srsourcesService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.srsourcesService.remove(+id);
  }
}
