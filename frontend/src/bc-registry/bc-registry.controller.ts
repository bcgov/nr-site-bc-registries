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
    let paymentStatus: string;
    if (reportType == 'synopsis') {
      paymentStatus = await this.payService.createSynopsisInvoice(session.data.access_token, session.data.account_id);
    } else if (reportType == 'detailed') {
      paymentStatus = await this.payService.createDetailedInvoice(session.data.access_token, session.data.account_id);
    } else {
      return null; // report type error, payment api does not get called
    }
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      return new StreamableFile(await this.bcRegistryService.getPdf(reportType, siteId, session.data.name));
    } else {
      return null; // payment error
    }
  }

  @Get('email-pdf/:reportType/:email/:siteId')
  async getEmail(
    @Param('reportType') reportType: string,
    @Param('email') email: string,
    @Param('siteId') siteId: string,
    @Session() session: { data?: SessionData }
  ): Promise<any> {
    let paymentStatus: string;
    if (reportType == 'synopsis') {
      paymentStatus = await this.payService.createSynopsisInvoice(session.data.access_token, session.data.account_id);
    } else if (reportType == 'detailed') {
      paymentStatus = await this.payService.createDetailedInvoice(session.data.access_token, session.data.account_id);
    } else {
      return { message: 'Report type error' };
    }
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      return {
        message: await this.bcRegistryService.emailPdf(reportType, decodeURI(email), siteId, session.data.name),
      };
    } else {
      return { message: 'Payment error' };
    }
  }
}
