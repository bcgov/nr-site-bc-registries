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
import { SrsourcesService } from "./srsources.service";
import { CreateSrsourceDto } from "./dto/create-srsource.dto";
import { UpdateSrsourceDto } from "./dto/update-srsource.dto";

@ApiTags("srsources")
@Controller("srsources")
export class SrsourcesController {
  constructor(private readonly srsourcesService: SrsourcesService) {}

  @Post()
  create(@Body() createSrsourceDto: CreateSrsourceDto) {
    return this.srsourcesService.create(createSrsourceDto);
  }

  @Get()
  findAll() {
    return this.srsourcesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srsourcesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrsourceDto: UpdateSrsourceDto) {
    return this.srsourcesService.update(+id, updateSrsourceDto);
  }

  @Delete()
  async removeAll() {
    const oldData = await this.srsourcesService.findAll();
    let counter: number = 0;
    for (const entry of oldData) {
      await this.srsourcesService.remove(entry.id);
      counter++;
    }
    return `${SrsourcesController.name}: ${counter} entries of old data removed.`;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srsourcesService.remove(+id);
  }
}
