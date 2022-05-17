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
import { SrsitparsService } from "./srsitpars.service";
import { CreateSrsitparDto } from "./dto/create-srsitpar.dto";
import { UpdateSrsitparDto } from "./dto/update-srsitpar.dto";

@ApiTags("srsitpars")
@Controller("srsitpars")
export class SrsitparsController {
  constructor(private readonly srsitparsService: SrsitparsService) {}

  @Post()
  create(@Body() createSrsitparDto: CreateSrsitparDto) {
    return this.srsitparsService.create(createSrsitparDto);
  }

  @Get()
  findAll() {
    return this.srsitparsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srsitparsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrsitparDto: UpdateSrsitparDto) {
    return this.srsitparsService.update(+id, updateSrsitparDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srsitparsService.remove(+id);
  }
}
