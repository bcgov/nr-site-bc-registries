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
import { SrmeapopsService } from "./srmeapops.service";
import { CreateSrmeapopDto } from "./dto/create-srmeapop.dto";
import { UpdateSrmeapopDto } from "./dto/update-srmeapop.dto";

@ApiTags("srmeapops")
@Controller("srmeapops")
export class SrmeapopsController {
  constructor(private readonly srmeapopsService: SrmeapopsService) {}

  @Post()
  create(@Body() createSrmeapopDto: CreateSrmeapopDto) {
    return this.srmeapopsService.create(createSrmeapopDto);
  }

  @Get()
  findAll() {
    return this.srmeapopsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srmeapopsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrmeapopDto: UpdateSrmeapopDto) {
    return this.srmeapopsService.update(+id, updateSrmeapopDto);
  }

  @Delete()
  async removeAll() {
    const oldData = await this.srmeapopsService.findAll();
    let counter: number = 0;
    for (const entry of oldData) {
      await this.srmeapopsService.remove(entry.id);
      counter++;
    }
    return `${SrmeapopsController.name}: ${counter} entries of old data removed.`;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srmeapopsService.remove(+id);
  }
}
