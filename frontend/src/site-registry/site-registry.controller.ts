import { Get, Controller } from '@nestjs/common';
import { SiteRegistryService } from './site-registry.service';

@Controller('site-registry')
export class SiteRegistryController {
  constructor(private siteRegistryService: SiteRegistryService) {}

  @Get('test')
  async setData(): Promise<any> {
    return await this.siteRegistryService.testParse();
  }
}
