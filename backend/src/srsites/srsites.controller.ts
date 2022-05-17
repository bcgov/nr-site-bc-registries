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
import { SrsitesService } from "./srsites.service";
import { CreateSrsiteDto } from "./dto/create-srsite.dto";
import { UpdateSrsiteDto } from "./dto/update-srsite.dto";

@ApiTags("srsites")
@Controller("srsites")
export class SrsitesController {
  constructor(private readonly srsitesService: SrsitesService) {}

  @Post()
  create(@Body() createSrsiteDto: CreateSrsiteDto) {
    return this.srsitesService.create(createSrsiteDto);
  }

  @Get()
  findAll() {
    return this.srsitesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srsitesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrsiteDto: UpdateSrsiteDto) {
    return this.srsitesService.update(+id, updateSrsiteDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srsitesService.remove(+id);
  }
}
