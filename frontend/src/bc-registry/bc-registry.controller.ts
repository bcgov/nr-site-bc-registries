import { Get, Controller } from '@nestjs/common';
import { BCRegistryService } from './bc-registry.service';

@Controller('bc-registry')
export class BCRegistryController {
  constructor(private testService: BCRegistryService) {}

  @Get('testapi')
  getTest(): Promise<{ xd: string }> {
    return this.testService.getText();
  }
}
