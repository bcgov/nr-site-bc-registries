import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SrremmeasService } from './srremmeas.service';
import { CreateSrremmeaDto } from './dto/create-srremmea.dto';
import { UpdateSrremmeaDto } from './dto/update-srremmea.dto';

@ApiTags('srremmeas')
@Controller('srremmeas')
export class SrremmeasController {
  constructor(private readonly srremmeasService: SrremmeasService) {}

  @Post()
  create(@Body() createSrremmeaDto: CreateSrremmeaDto) {
    return this.srremmeasService.create(createSrremmeaDto);
  }

  @Get()
  findAll() {
    return this.srremmeasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.srremmeasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSrremmeaDto: UpdateSrremmeaDto) {
    return this.srremmeasService.update(+id, updateSrremmeaDto);
  }

  @Delete()
  removeAll() {
    return this.srremmeasService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.srremmeasService.remove(+id);
  }
}
