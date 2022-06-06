import { Get, Param, Controller, StreamableFile, Header } from '@nestjs/common';
import { BCRegistryService } from './bc-registry.service';

@Controller('bc-registry')
export class BCRegistryController {
  constructor(private bcRegistryService: BCRegistryService) {}

  @Get('download-pdf/:reportType/:siteId')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=cool.pdf')
  async getPdf(@Param('reportType') reportType: string, @Param('siteId') siteId: string): Promise<any> {
    return new StreamableFile(await this.bcRegistryService.getPdf(reportType, siteId));
  }

  @Get('email-pdf/:reportType/:email/:siteId')
  getTest2(
    @Param('reportType') reportType: string,
    @Param('email') email: string,
    @Param('siteId') siteId: string
  ): Promise<any> {
    return this.bcRegistryService.emailPdf(reportType, email, siteId);
  }
}
