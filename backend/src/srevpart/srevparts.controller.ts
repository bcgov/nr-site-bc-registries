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
import { SrevpartsService } from "./srevparts.service";
import { CreateSrevpartDto } from "./dto/create-srevpart.dto";
import { UpdateSrevpartDto } from "./dto/update-srevpart.dto";

@ApiTags("srevparts")
@Controller("srevparts")
export class SrevpartsController {
  constructor(private readonly srevpartsService: SrevpartsService) {}

  @Post()
  create(@Body() createSrevpartDto: CreateSrevpartDto) {
    return this.srevpartsService.create(createSrevpartDto);
  }

  @Get()
  findAll() {
    return this.srevpartsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srevpartsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrevpartDto: UpdateSrevpartDto) {
    return this.srevpartsService.update(+id, updateSrevpartDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srevpartsService.remove(+id);
  }
}
