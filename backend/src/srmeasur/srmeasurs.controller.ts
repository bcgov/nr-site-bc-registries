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
import { SrmeasursService } from "./srmeasurs.service";
import { CreateSrmeasurDto } from "./dto/create-srmeasur.dto";
import { UpdateSrmeasurDto } from "./dto/update-srmeasur.dto";

@ApiTags("srmeasurs")
@Controller("srmeasurs")
export class SrmeasursController {
  constructor(private readonly srmeasursService: SrmeasursService) {}

  @Post()
  create(@Body() createSrmeasurDto: CreateSrmeasurDto) {
    return this.srmeasursService.create(createSrmeasurDto);
  }

  @Get()
  findAll() {
    return this.srmeasursService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srmeasursService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrmeasurDto: UpdateSrmeasurDto) {
    return this.srmeasursService.update(+id, updateSrmeasurDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srmeasursService.remove(+id);
  }
}
