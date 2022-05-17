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
import { SrremitmsService } from "./srremitms.service";
import { CreateSrremitmDto } from "./dto/create-srremitm.dto";
import { UpdateSrremitmDto } from "./dto/update-srremitm.dto";

@ApiTags("srremitms")
@Controller("srremitms")
export class SrremitmsController {
  constructor(private readonly srremitmsService: SrremitmsService) {}

  @Post()
  create(@Body() createSrremitmDto: CreateSrremitmDto) {
    return this.srremitmsService.create(createSrremitmDto);
  }

  @Get()
  findAll() {
    return this.srremitmsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srremitmsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrremitmDto: UpdateSrremitmDto) {
    return this.srremitmsService.update(+id, updateSrremitmDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srremitmsService.remove(+id);
  }
}
