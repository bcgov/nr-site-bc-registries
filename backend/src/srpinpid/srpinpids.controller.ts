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
import { SrpinpidsService } from "./srpinpids.service";
import { CreateSrpinpidDto } from "./dto/create-srpinpid.dto";
import { UpdateSrpinpidDto } from "./dto/update-srpinpid.dto";

@ApiTags("srpinpids")
@Controller("srpinpids")
export class SrpinpidsController {
  constructor(private readonly srpinpidsService: SrpinpidsService) {}

  @Post()
  create(@Body() createSrpinpidDto: CreateSrpinpidDto) {
    return this.srpinpidsService.create(createSrpinpidDto);
  }

  @Get()
  findAll() {
    return this.srpinpidsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srpinpidsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrpinpidDto: UpdateSrpinpidDto) {
    return this.srpinpidsService.update(+id, updateSrpinpidDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srpinpidsService.remove(+id);
  }
}
