import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ModuleRef } from "@nestjs/core"
import { ApiTags } from "@nestjs/swagger";
import { SitesService } from "./sites.service";
import { CreateSiteDto } from "./dto/create-site.dto";
import { UpdateSiteDto } from "./dto/update-site.dto";

@ApiTags("sites")
@Controller("sites")
export class SitesController {
  constructor(private readonly sitesService: SitesService, private moduleRef: ModuleRef) {}

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

  @Delete()
  async removeAll() {
    const oldData = await this.sitesService.findAll();
    let counter: number = 0;
    for (const entry of oldData) {
      await this.sitesService.remove(entry.id);
      counter++;
    }
    return `${SitesController.name}: ${counter} entries of old data removed.`;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.sitesService.remove(+id);
  }
}
