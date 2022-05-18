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
import { SrremmeasService } from "./srremmeas.service";
import { CreateSrremmeaDto } from "./dto/create-srremmea.dto";
import { UpdateSrremmeaDto } from "./dto/update-srremmea.dto";

@ApiTags("srremmeas")
@Controller("srremmeas")
export class SrremmeasController {
  constructor(private readonly srremmeasService: SrremmeasService) {}

  @Post()
  create(@Body() createSrremmeaDto: CreateSrremmeaDto) {
    return this.srremmeasService.create(createSrremmeaDto);
  }

  @Get()
  findAll() {
    return this.srremmeasService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srremmeasService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrremmeaDto: UpdateSrremmeaDto) {
    return this.srremmeasService.update(+id, updateSrremmeaDto);
  }

  @Delete()
  async removeAll() {
    const oldData = await this.srremmeasService.findAll();
    let counter: number = 0;
    for (const entry of oldData) {
      await this.srremmeasService.remove(entry.id);
      counter++;
    }
    return `${SrremmeasController.name}: ${counter} entries of old data removed.`;
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srremmeasService.remove(+id);
  }
}
