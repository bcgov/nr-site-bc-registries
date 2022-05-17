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
import { SrpcocsService } from "./srpcocs.service";
import { CreateSrpcocDto } from "./dto/create-srpcoc.dto";
import { UpdateSrpcocDto } from "./dto/update-srpcoc.dto";

@ApiTags("srpcocs")
@Controller("srpcocs")
export class SrpcocsController {
  constructor(private readonly srpcocsService: SrpcocsService) {}

  @Post()
  create(@Body() createSrpcocDto: CreateSrpcocDto) {
    return this.srpcocsService.create(createSrpcocDto);
  }

  @Get()
  findAll() {
    return this.srpcocsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srpcocsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrpcocDto: UpdateSrpcocDto) {
    return this.srpcocsService.update(+id, updateSrpcocDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srpcocsService.remove(+id);
  }
}
