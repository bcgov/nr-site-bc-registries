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
import { SrdatesService } from "./srdates.service";
import { CreateSrdateDto } from "./dto/create-srdate.dto";
import { UpdateSrdateDto } from "./dto/update-srdate.dto";

@ApiTags("srdates")
@Controller("srdates")
export class SrdatesController {
  constructor(private readonly srdatesService: SrdatesService) {}

  @Post()
  create(@Body() createSrdateDto: CreateSrdateDto) {
    return this.srdatesService.create(createSrdateDto);
  }

  @Get()
  findAll() {
    return this.srdatesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srdatesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrdateDto: UpdateSrdateDto) {
    return this.srdatesService.update(+id, updateSrdateDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srdatesService.remove(+id);
  }
}
