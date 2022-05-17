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
import { SrprfcatsService } from "./srprfcats.service";
import { CreateSrprfcatDto } from "./dto/create-srprfcat.dto";
import { UpdateSrprfcatDto } from "./dto/update-srprfcat.dto";

@ApiTags("srprfcats")
@Controller("srprfcats")
export class SrprfcatsController {
  constructor(private readonly srprfcatsService: SrprfcatsService) {}

  @Post()
  create(@Body() createSrprfcatDto: CreateSrprfcatDto) {
    console.log("POST REQUEST");
    return this.srprfcatsService.create(createSrprfcatDto);
  }

  @Get()
  findAll() {
    console.log("GET REQUEST");
    return this.srprfcatsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srprfcatsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSrprfcatDto: UpdateSrprfcatDto
  ) {
    return this.srprfcatsService.update(+id, updateSrprfcatDto);
  }

  @Delete()
  async removeAll() {
    console.log("DELETE REQUEST");
    const oldData = await this.srprfcatsService.findAll();
    for (const entry of oldData) {
      await this.srprfcatsService.remove(entry.id);
    }
    return "Old data has been removed";
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srprfcatsService.remove(+id);
  }
}
