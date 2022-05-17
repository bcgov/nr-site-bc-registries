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
import { SrmediasService } from "./srmedias.service";
import { CreateSrmediaDto } from "./dto/create-srmedia.dto";
import { UpdateSrmediaDto } from "./dto/update-srmedia.dto";

@ApiTags("srmedias")
@Controller("srmedias")
export class SrmediasController {
  constructor(private readonly srmediasService: SrmediasService) {}

  @Post()
  create(@Body() createSrmediaDto: CreateSrmediaDto) {
    return this.srmediasService.create(createSrmediaDto);
  }

  @Get()
  findAll() {
    return this.srmediasService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srmediasService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrmediaDto: UpdateSrmediaDto) {
    return this.srmediasService.update(+id, updateSrmediaDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srmediasService.remove(+id);
  }
}
