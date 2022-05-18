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
import { SreventsService } from "./srevents.service";
import { CreateSreventDto } from "./dto/create-srevent.dto";
import { UpdateSreventDto } from "./dto/update-srevent.dto";

@ApiTags("srevents")
@Controller("srevents")
export class SreventsController {
  constructor(private readonly sreventsService: SreventsService) {}

  @Post()
  create(@Body() createSreventDto: CreateSreventDto) {
    return this.sreventsService.create(createSreventDto);
  }

  @Get()
  findAll() {
    return this.sreventsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.sreventsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSreventDto: UpdateSreventDto) {
    return this.sreventsService.update(+id, updateSreventDto);
  }

  @Delete()
  removeAll() {
    return this.sreventsService.removeAll();
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.sreventsService.remove(+id);
  }
}
