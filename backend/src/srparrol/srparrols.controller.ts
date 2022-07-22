import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SrparrolsService } from './srparrols.service';
import { CreateSrparrolDto } from './dto/create-srparrol.dto';
import { UpdateSrparrolDto } from './dto/update-srparrol.dto';

@ApiTags('srparrols')
@Controller('srparrols')
export class SrparrolsController {
  constructor(private readonly srparrolsService: SrparrolsService) {}

  @Post()
  create(@Body() createSrparrolDto: CreateSrparrolDto) {
    return this.srparrolsService.create(createSrparrolDto);
  }

  @Get()
  findAll() {
    return this.srparrolsService.findAll();
  }

  @Get(':participantId')
  findOne(@Param('participantId') participantId: string) {
    return this.srparrolsService.findOne(participantId);
  }

  @Delete()
  async removeAll() {
    return this.srparrolsService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.srparrolsService.remove(+id);
  }
}
