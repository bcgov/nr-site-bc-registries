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
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
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
    @Session() session: { data?: SessionData },
    @Res() response: Response
  ): Promise<any> {
    const isSaved = this.bcRegistryService.isReportSaved(siteId, reportType, session.data.savedReports);
    let paymentStatus: string;
    let fileBuffer: any;
    try {
      fileBuffer = await this.bcRegistryService.getPdf(reportType, siteId, session.data.name);
    } catch (err) {
      console.log(err);
      response.status(HttpStatus.BAD_REQUEST).send('FAILED TO GENERATE FILE');
      return null;
    }
    if (isSaved) {
      response.status(200).send(fileBuffer);
      return null;
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
        response.status(200).send(fileBuffer);
        return null;
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
    @Session() session: { data?: SessionData },
    @Res() response: Response
  ): Promise<StreamableFile | null> {
    siteId = prependZeroesToSiteId(siteId); // siteId's are stored in the db with prepended zeroes
    const isSaved = this.bcRegistryService.isReportSaved(siteId, reportType, session.data.savedReports);
    let paymentStatus: string;
    let fileBuffer: any;
    try {
      fileBuffer = await this.bcRegistryService.getPdfSiteIdDirect(reportType, siteId, session.data.name);
    } catch (err) {
      console.log(err);
      response.status(HttpStatus.BAD_REQUEST).send('FAILED TO GENERATE FILE');
      return err;
    }
    if (isSaved) {
      response.status(200).send(fileBuffer);
      return null;
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
      console.log('paymentStatus: ' + paymentStatus);
      if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
        session.data.savedReports.push([siteId, reportType]);
        response.status(200).send(fileBuffer);
        return null;
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
    @Session() session: { data?: SessionData },
    @Res() response: Response
  ): Promise<{ message: string }> {
    const isSaved = this.bcRegistryService.isReportSaved(siteId, reportType, session.data.savedReports);
    let paymentStatus: string;
    let reportHtml: string;
    try {
      reportHtml = await this.bcRegistryService.generateEmailHTML(reportType, siteId, session.data.name);
    } catch (err) {
      console.log(err);
      response.status(HttpStatus.BAD_REQUEST).send('FAILED TO GENERATE EMAIL');
      return err;
    }
    if (isSaved) {
      const emailSent = {
        message: await this.bcRegistryService.sendEmailHTML(reportType, email, siteId, reportHtml),
      };
      response.status(200).send(emailSent);
      return null;
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
        response.status(200).send({ message: 'Report type error' });
        return null;
      }
      if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
        session.data.savedReports.push([siteId, reportType]);
        const emailSent = {
          message: await this.bcRegistryService.sendEmailHTML(reportType, email, siteId, reportHtml),
        };
        response.status(200).send(emailSent);
        return null;
      } else {
        response.status(200).send({ message: 'Payment Error' });
        return null;
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
