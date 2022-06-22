import { Get, Param, Controller, Header, Session, UseFilters, UseGuards } from '@nestjs/common';
import { AuthenticationFilter } from 'src/authentication/authentication.filter';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';
import { PayService } from 'src/pay/pay.service';
import { SessionData } from '../../util-files/types';
import { BCRegistryService } from './bc-registry.service';

@Controller('bc-registry')
@UseFilters(AuthenticationFilter)
@UseGuards(AuthenticationGuard)
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

  @Get('nil-pdf/:searchType/:searchCriteria1/:searchCriteria2/:searchCriteria3')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename=report.pdf')
  async getNilPdf(
    @Param('searchType') searchType: string,
    @Param('searchCriteria1') searchCriteria1: string,
    @Param('searchCriteria2') searchCriteria2: string,
    @Param('searchCriteria3') searchCriteria3: string,
    @Session() session: { data?: SessionData }
  ): Promise<any> {
    return this.bcRegistryService.requestNilPdf(
      searchType,
      decodeURI(searchCriteria1),
      decodeURI(searchCriteria2),
      decodeURI(searchCriteria3),
      session.data.name
    );
  }
}
