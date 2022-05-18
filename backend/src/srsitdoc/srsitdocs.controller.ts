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
import { SrsitdocsService } from "./srsitdocs.service";
import { CreateSrsitdocDto } from "./dto/create-srsitdoc.dto";
import { UpdateSrsitdocDto } from "./dto/update-srsitdoc.dto";

@ApiTags("srsitdocs")
@Controller("srsitdocs")
export class SrsitdocsController {
  constructor(private readonly srsitdocsService: SrsitdocsService) {}

  @Post()
  create(@Body() createSrsitdocDto: CreateSrsitdocDto) {
    return this.srsitdocsService.create(createSrsitdocDto);
  }

  @Get()
  findAll() {
    return this.srsitdocsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srsitdocsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrsitdocDto: UpdateSrsitdocDto) {
    return this.srsitdocsService.update(+id, updateSrsitdocDto);
  }

  @Delete()
  async removeAll() {
    return this.srsitdocsService.removeAll();
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srsitdocsService.remove(+id);
  }
}
