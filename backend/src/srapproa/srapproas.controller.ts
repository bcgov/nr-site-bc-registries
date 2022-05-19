import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SrapproasService } from './srapproas.service';
import { CreateSrapproaDto } from './dto/create-srapproa.dto';
import { UpdateSrapproaDto } from './dto/update-srapproa.dto';

@ApiTags('srapproas')
@Controller('srapproas')
export class SrapproasController {
  constructor(private readonly srapproasService: SrapproasService) {}

  @Post()
  create(@Body() createSrapproaDto: CreateSrapproaDto) {
    return this.srapproasService.create(createSrapproaDto);
  }

  @Get()
  findAll() {
    return this.srapproasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.srapproasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSrapproaDto: UpdateSrapproaDto) {
    return this.srapproasService.update(+id, updateSrapproaDto);
  }

  @Delete()
  removeAll() {
    return this.srapproasService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.srapproasService.remove(+id);
  }
}
