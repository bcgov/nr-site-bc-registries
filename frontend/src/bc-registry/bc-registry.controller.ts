import { Get, Param, Controller, Header, Session } from '@nestjs/common';
import { PayService } from 'src/pay/pay.service';
import { SessionData } from 'utils/types';
import { BCRegistryService } from './bc-registry.service';

@Controller('bc-registry')
export class BCRegistryController {
  constructor(private bcRegistryService: BCRegistryService, private payService: PayService) {}

  @Get('download-pdf/:reportType/:siteId')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=report.pdf')
  async getPdf(
    @Param('reportType') reportType: string,
    @Param('siteId') siteId: string,
    @Session() session: { data?: SessionData }
  ): Promise<any> {
    return this.bcRegistryService.requestPdf(
      reportType,
      siteId,
      session.data.name,
      session.data.access_token,
      session.data.account_id
    );
  }

  @Get('email-pdf/:reportType/:email/:siteId')
  async getEmail(
    @Param('reportType') reportType: string,
    @Param('email') email: string,
    @Param('siteId') siteId: string,
    @Session() session: { data?: SessionData }
  ): Promise<any> {
    return this.bcRegistryService.requestEmail(
      reportType,
      decodeURI(email),
      siteId,
      session.data.name,
      session.data.access_token,
      session.data.account_id
    );
  }
}
