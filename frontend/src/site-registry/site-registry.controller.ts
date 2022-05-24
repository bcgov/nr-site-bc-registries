import { Get, Controller, Param } from '@nestjs/common';
import { SiteRegistryService } from './site-registry.service';

@Controller('site-registry')
export class SiteRegistryController {
  constructor(private siteRegistryService: SiteRegistryService) {}

  @Get('test')
  setData(): Promise<any> {
    return this.siteRegistryService.testParse();
  }

  @Get('test-search/:participantId')
  async getTestSearch(@Param('participantId') participantId: string): Promise<any> {
    return this.siteRegistryService.testSearch(participantId);
  }
}
