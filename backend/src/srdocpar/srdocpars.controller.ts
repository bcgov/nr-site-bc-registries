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
import { SrdocparsService } from "./srdocpars.service";
import { CreateSrdocparDto } from "./dto/create-srdocpar.dto";
import { UpdateSrdocparDto } from "./dto/update-srdocpar.dto";

@ApiTags("srdocpars")
@Controller("srdocpars")
export class SrdocparsController {
  constructor(private readonly srdocparsService: SrdocparsService) {}

  @Post()
  create(@Body() createSrdocparDto: CreateSrdocparDto) {
    return this.srdocparsService.create(createSrdocparDto);
  }

  @Get()
  findAll() {
    return this.srdocparsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srdocparsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrdocparDto: UpdateSrdocparDto) {
    return this.srdocparsService.update(+id, updateSrdocparDto);
  }

  @Delete()
  async removeAll() {
    const oldData = await this.srdocparsService.findAll();
    let counter: number = 0;
    for (const entry of oldData) {
      await this.srdocparsService.remove(entry.id);
      counter++;
    }
    return `${SrdocparsController.name}: ${counter} entries of old data removed.`;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srdocparsService.remove(+id);
  }
}
