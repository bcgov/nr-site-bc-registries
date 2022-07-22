import {
  Get,
  Param,
  Controller,
  Header,
  Session,
  UseFilters,
  UseGuards,
  StreamableFile,
  Post,
  Body,
} from '@nestjs/common';
import { AuthenticationFilter } from 'src/authentication/authentication.filter';
import { AuthenticationGuard } from 'src/authentication/authentication.guard';
import { PayService } from 'src/pay/pay.service';
import { SearchResultsJson, SessionData } from 'utils/types';
import { prependZeroesToSiteId } from 'utils/util';
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
  ): Promise<StreamableFile | null> {
    const isSaved = this.bcRegistryService.isReportSaved(siteId, reportType, session.data.savedReports);
    let paymentStatus: string;
    if (isSaved) {
      return new StreamableFile(await this.bcRegistryService.getPdf(reportType, siteId, session.data.name));
    } else {
      if (reportType == 'synopsis') {
        paymentStatus = await this.payService.createSynopsisInvoice(
          session.data.access_token,
          session.data.activeAccount.id
        );
      } else if (reportType == 'detailed') {
        paymentStatus = await this.payService.createDetailedInvoice(
          session.data.access_token,
          session.data.activeAccount.id
        );
      } else {
        return null; // report type error, payment api does not get called
      }
      if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
        session.data.savedReports.push([siteId, reportType]);
        return new StreamableFile(await this.bcRegistryService.getPdf(reportType, siteId, session.data.name));
      } else {
        return null;
      }
    }
  }

  // this route is specifically for the siteId search page report downloads
  @Get('download-pdf2/:reportType/:siteId')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'inline; filename=report.pdf')
  async getPdfSiteId(
    @Param('reportType') reportType: string,
    @Param('siteId') siteId: string,
    @Session() session: { data?: SessionData }
  ): Promise<StreamableFile | null> {
    siteId = prependZeroesToSiteId(siteId); // siteId's are stored in the db with prepended zeroes
    const isSaved = this.bcRegistryService.isReportSaved(siteId, reportType, session.data.savedReports);
    let paymentStatus: string;
    if (isSaved) {
      return new StreamableFile(await this.bcRegistryService.getPdfSiteIdDirect(reportType, siteId, session.data.name));
    } else {
      if (reportType == 'synopsis') {
        paymentStatus = await this.payService.createSynopsisInvoice(
          session.data.access_token,
          session.data.activeAccount.id
        );
      } else if (reportType == 'detailed') {
        paymentStatus = await this.payService.createDetailedInvoice(
          session.data.access_token,
          session.data.activeAccount.id
        );
      } else {
        return null; // report type error, payment api does not get called
      }
      if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
        session.data.savedReports.push([siteId, reportType]);
        return new StreamableFile(
          await this.bcRegistryService.getPdfSiteIdDirect(reportType, siteId, session.data.name)
        );
      } else {
        return null;
      }
    }
  }

  @Get('email-pdf/:reportType/:email/:siteId')
  async getEmail(
    @Param('reportType') reportType: string,
    @Param('email') email: string,
    @Param('siteId') siteId: string,
    @Session() session: { data?: SessionData }
  ): Promise<{ message: string }> {
    const isSaved = this.bcRegistryService.isReportSaved(siteId, reportType, session.data.savedReports);
    let paymentStatus: string;
    if (isSaved) {
      return {
        message: await this.bcRegistryService.emailHTML(reportType, email, siteId, session.data.name),
      };
    } else {
      if (reportType == 'synopsis') {
        paymentStatus = await this.payService.createSynopsisInvoice(
          session.data.access_token,
          session.data.activeAccount.id
        );
      } else if (reportType == 'detailed') {
        paymentStatus = await this.payService.createDetailedInvoice(
          session.data.access_token,
          session.data.activeAccount.id
        );
      } else {
        return { message: 'Report type error' };
      }
      if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
        session.data.savedReports.push([siteId, reportType]);
        return {
          message: await this.bcRegistryService.emailHTML(reportType, email, siteId, session.data.name),
        };
      } else {
        return { message: 'Payment Error' };
      }
    }
  }

  @Post('email-search-results')
  async emailSearchResults(
    @Body() searchResultsJson: SearchResultsJson,
    @Session() session: { data?: SessionData }
  ): Promise<{ message: string }> {
    return {
      message: await this.bcRegistryService.emailSearchResultsHTML(searchResultsJson, session.data.name),
    };
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
  ): Promise<StreamableFile> {
    return new StreamableFile(
      await this.bcRegistryService.requestNilPdf(
        searchType,
        decodeURI(searchCriteria1),
        decodeURI(searchCriteria2),
        decodeURI(searchCriteria3),
        session.data.name
      )
    );
  }
}
