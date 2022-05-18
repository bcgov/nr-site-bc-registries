import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SrprfusesService } from "./srprfuses.service";
import { CreateSrprfuseDto } from "./dto/create-srprfuse.dto";
import { UpdateSrprfuseDto } from "./dto/update-srprfuse.dto";

@ApiTags("srprfuses")
@Controller("srprfuses")
export class SrprfusesController {
  constructor(private readonly srprfusesService: SrprfusesService) {}

  @Post()
  create(@Body() createSrprfuseDto: CreateSrprfuseDto) {
    return this.srprfusesService.create(createSrprfuseDto);
  }

  @Get()
  findAll() {
    return this.srprfusesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srprfusesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrprfuseDto: UpdateSrprfuseDto) {
    return this.srprfusesService.update(+id, updateSrprfuseDto);
  }
  
  @Delete()
  async removeAll() {
    return this.srprfusesService.removeAll();
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srprfusesService.remove(+id);
  }
}
