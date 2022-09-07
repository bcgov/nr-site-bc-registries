import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActionsService } from './actions.service';
import { UpdateActionDto } from './dto/update-action.dto';

@ApiTags('actions')
@Controller('actions')
export class ActionsController {
    constructor(private readonly actionsService: ActionsService) {}

    @Get()
    async firstEntry() {
      const actionsObject = await this.actionsService.findAll();
      return actionsObject[0]; // there will only ever be one entry
    }

    @Patch()
    update(@Body() updateActionDto: UpdateActionDto) {
      return this.actionsService.update(updateActionDto);
    }

    @Delete()
    removeAll() {
      return this.actionsService.removeAll();
    }
}
