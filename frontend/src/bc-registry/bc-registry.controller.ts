import { Get, Param, Controller, StreamableFile, Header, Session } from '@nestjs/common';
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
    const paymentStatus = await this.payService.createInvoice(session.data.access_token, session.data.account_id);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      return new StreamableFile(await this.bcRegistryService.getPdf(reportType, siteId));
    } else {
      return null;
    }
  }

  @Get('email-pdf/:reportType/:email/:siteId')
  async getEmail(
    @Param('reportType') reportType: string,
    @Param('email') email: string,
    @Param('siteId') siteId: string,
    @Session() session: { data?: SessionData }
  ): Promise<any> {
    const paymentStatus = await this.payService.createInvoice(session.data.access_token, session.data.account_id);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      return this.bcRegistryService.emailPdf(reportType, email, siteId);
    } else {
      return 'Payment error';
    }
  }
}
