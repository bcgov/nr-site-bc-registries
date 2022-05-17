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
import { SrremedsService } from "./srremeds.service";
import { CreateSrremedDto } from "./dto/create-srremed.dto";
import { UpdateSrremedDto } from "./dto/update-srremed.dto";

@ApiTags("srremeds")
@Controller("srremeds")
export class SrremedsController {
  constructor(private readonly srremedsService: SrremedsService) {}

  @Post()
  create(@Body() createSrremedDto: CreateSrremedDto) {
    return this.srremedsService.create(createSrremedDto);
  }

  @Get()
  findAll() {
    return this.srremedsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srremedsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrremedDto: UpdateSrremedDto) {
    return this.srremedsService.update(+id, updateSrremedDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srremedsService.remove(+id);
  }
}
