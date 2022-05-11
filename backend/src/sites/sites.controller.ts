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
import { SitesService } from "./sites.service";
import { CreateSiteDto } from "./dto/create-site.dto";
import { UpdateSiteDto } from "./dto/update-site.dto";

@ApiTags("sites")
@Controller("sites")
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Post()
  create(@Body() createSiteDto: CreateSiteDto) {
    return this.sitesService.create(createSiteDto);
  }

  @Get()
  findAll() {
    return this.sitesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.sitesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSiteDto: UpdateSiteDto) {
    return this.sitesService.update(+id, updateSiteDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.sitesService.remove(+id);
  }
}
