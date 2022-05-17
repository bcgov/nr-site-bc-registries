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
import { SrprfquesService } from "./srprfques.service";
import { CreateSrprfqueDto } from "./dto/create-srprfque.dto";
import { UpdateSrprfqueDto } from "./dto/update-srprfque.dto";

@ApiTags("srprfques")
@Controller("srprfques")
export class SrprfquesController {
  constructor(private readonly srprfquesService: SrprfquesService) {}

  @Post()
  create(@Body() createSrprfqueDto: CreateSrprfqueDto) {
    return this.srprfquesService.create(createSrprfqueDto);
  }

  @Get()
  findAll() {
    return this.srprfquesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.srprfquesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSrprfqueDto: UpdateSrprfqueDto) {
    return this.srprfquesService.update(+id, updateSrprfqueDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.srprfquesService.remove(+id);
  }
}
