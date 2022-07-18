import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { plainTextTemplate } from 'utils/constants';
import * as base64 from 'base-64';
import { URLSearchParams } from 'url';
import * as fs from 'fs';
import { PayService } from 'src/pay/pay.service';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

let synopsisTemplate: string;
let detailedPartialTemplate: string;
let nilTemplate: string;
let nilTemplate2: string;
let hostname: string;
let port: number;

@Injectable()
export class BCRegistryService {
  constructor(private httpService: HttpService, private payService: PayService) {
    synopsisTemplate = base64.encode(
      fs.readFileSync(path.resolve(__dirname, '../../utils/templates/synopsisTemplate.html'), 'utf8')
    );
    detailedPartialTemplate = fs.readFileSync(
      path.resolve(__dirname, '../../utils/templates/detailedPartialTemplate.html'),
      'utf8'
    );
    nilTemplate = base64.encode(
      fs.readFileSync(path.resolve(__dirname, '../../utils/templates/nilTemplate.html'), 'utf8')
    );
    nilTemplate2 = base64.encode(
      fs.readFileSync(path.resolve(__dirname, '../../utils/templates/nilPdfTemplate.html'), 'utf8')
    );
    // docker hostname is the container name, use localhost for local development
    hostname = process.env.BACKEND_URL ? process.env.BACKEND_URL : `http://localhost`;
    // local development backend port is 3001, docker backend port is 3000
    port = process.env.BACKEND_URL ? 3000 : 3001;
  }

  isReportSaved(siteId: string, reportType: string, savedReports: [string, string][]): boolean {
    for (const entry of savedReports) {
      if (entry[0] == siteId && entry[1] == reportType) {
        return true;
      }
    }
    return false;
  }

  async requestNilPdf(
    searchType: string,
    searchCriteria1: string,
    searchCriteria2: string,
    searchCriteria3: string,
    name: string
  ) {
    const authorizationToken = await this.getToken();
    const documentTemplate = nilTemplate;
    const requestUrl = `${hostname}:${port}/srsites/getNilReportData/1`;
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // grabs download date
    const data = await lastValueFrom(
      this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
    );
    data['account'] = name;

    switch (searchType) {
      case 'pid': {
        data['searchType'] = 'Parcel ID';
        data['searchCriteria1'] = searchCriteria1; // parcel id
        data['searchCriteria2'] = '';
        data['searchCriteria3'] = '';
        break;
      }
      case 'clf': {
        data['searchType'] = 'Crown Lands File Number';
        data['searchCriteria1'] = searchCriteria1; // crown lands file number
        data['searchCriteria2'] = '';
        data['searchCriteria3'] = '';
        break;
      }
      case 'clp': {
        data['searchType'] = 'Crown Lands PIN';
        data['searchCriteria1'] = searchCriteria1; // crown lands pin
        data['searchCriteria2'] = '';
        data['searchCriteria3'] = '';
        break;
      }
      case 'sid': {
        data['searchType'] = 'Site ID';
        data['searchCriteria1'] = searchCriteria1; // siteid
        data['searchCriteria2'] = '';
        data['searchCriteria3'] = '';
        break;
      }
      case 'adr': {
        data['searchType'] = 'Address';
        data['searchCriteria1'] = searchCriteria1; // address
        data['searchCriteria2'] = searchCriteria2; // city
        data['searchCriteria3'] = '';
        break;
      }
      case 'coords': {
        data['searchType'] = 'Area';
        data['searchCriteria1'] = searchCriteria1; // lat
        data['searchCriteria2'] = searchCriteria2; // lon
        data['searchCriteria3'] = searchCriteria3; // size
        break;
      }
      case 'postal': {
        data['searchType'] = 'Area';
        data['searchCriteria1'] = searchCriteria1; // postalcode
        data['searchCriteria2'] = searchCriteria2; // size
        data['searchCriteria3'] = '';
        break;
      }
    }

    const md = JSON.stringify({
      data,
      formatters:
        '{"myFormatter":"_function_myFormatter|function(data) { return data.slice(1); }","myOtherFormatter":"_function_myOtherFormatter|function(data) {return data.slice(2);}"}',
      options: {
        cacheReport: false,
        convertTo: 'pdf',
        overwrite: true,
        reportName: 'test-report',
      },
      template: {
        content: `${documentTemplate}`,
        encodingType: 'base64',
        fileType: 'html',
      },
    });

    const config = {
      method: 'post',
      url: 'https://cdogs-dev.apps.silver.devops.gov.bc.ca/api/v2/template/render',
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
      data: md,
    };

    return await axios(config)
      .then((response) => {
        console.log('Generated File');
        return response.data;
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  async requestNilSiteIdPdf(siteId: string, name: string) {
    const authorizationToken = await this.getToken();
    const documentTemplate = nilTemplate2;
    const requestUrl = `${hostname}:${port}/srsites/getNilReportData/1`;
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // grabs download date
    const data = await lastValueFrom(
      this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
    );
    data['account'] = name;
    data['searchType'] = 'Site ID';
    data['siteId'] = siteId; // siteid

    const md = JSON.stringify({
      data,
      formatters:
        '{"myFormatter":"_function_myFormatter|function(data) { return data.slice(1); }","myOtherFormatter":"_function_myOtherFormatter|function(data) {return data.slice(2);}"}',
      options: {
        cacheReport: false,
        convertTo: 'pdf',
        overwrite: true,
        reportName: 'test-report',
      },
      template: {
        content: `${documentTemplate}`,
        encodingType: 'base64',
        fileType: 'html',
      },
    });

    const config = {
      method: 'post',
      url: 'https://cdogs-dev.apps.silver.devops.gov.bc.ca/api/v2/template/render',
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
      data: md,
    };

    return await axios(config)
      .then((response) => {
        console.log('Generated File');
        return response.data;
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  // builds the pdf report to be sent back to the frontend
  async getPdf(reportType: string, siteId: string, name: string): Promise<any> {
    const authorizationToken = await this.getToken();

    const requestUrl =
      reportType == 'synopsis'
        ? `${hostname}:${port}/srsites/synopsisReport/${siteId}`
        : reportType == 'detailed'
        ? `${hostname}:${port}/srsites/detailedReport/${siteId}`
        : '';
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (requestUrl !== '') {
      // try to set the data, if no data found then return the nil pdf
      // this should only ever occur on direct download requests on the siteId search page
      const data = await lastValueFrom(
        this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
      );
      data['account'] = name;

      let documentTemplate: string;
      if (reportType == 'detailed') {
        documentTemplate = this.buildDetailedTemplate(data);
      } else {
        documentTemplate = synopsisTemplate;
      }
      const md = JSON.stringify({
        data,
        formatters:
          '{"myFormatter":"_function_myFormatter|function(data) { return data.slice(1); }","myOtherFormatter":"_function_myOtherFormatter|function(data) {return data.slice(2);}"}',
        options: {
          cacheReport: false,
          convertTo: 'pdf',
          overwrite: true,
          reportName: 'test-report.pdf',
        },
        template: {
          content: `${documentTemplate}`,
          encodingType: 'base64',
          fileType: 'html',
        },
      });

      const config = {
        method: 'post',
        url: 'https://cdogs-dev.apps.silver.devops.gov.bc.ca/api/v2/template/render',
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
        data: md,
      };

      const response = await axios(config)
        .then((response) => {
          console.log('Generated File');
          return response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
      return response;
    } else {
      return Error('No report type selected');
    }
  }

  async getPdfSiteIdDirect(reportType: string, siteId: string, name: string): Promise<any> {
    const authorizationToken = await this.getToken();

    const requestUrl =
      reportType == 'synopsis'
        ? `${hostname}:${port}/srsites/synopsisReport/${siteId}`
        : reportType == 'detailed'
        ? `${hostname}:${port}/srsites/detailedReport/${siteId}`
        : '';
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (requestUrl !== '') {
      let data: any;
      try {
        data = await lastValueFrom(
          this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
        );
      } catch (err) {
        console.log('caught error');
        return this.requestNilSiteIdPdf(parseInt(siteId).toString(), name);
      }
      data['account'] = name;

      let documentTemplate: string;
      if (reportType == 'detailed') {
        documentTemplate = this.buildDetailedTemplate(data);
      } else {
        documentTemplate = synopsisTemplate;
      }
      const md = JSON.stringify({
        data,
        formatters:
          '{"myFormatter":"_function_myFormatter|function(data) { return data.slice(1); }","myOtherFormatter":"_function_myOtherFormatter|function(data) {return data.slice(2);}"}',
        options: {
          cacheReport: false,
          convertTo: 'pdf',
          overwrite: true,
          reportName: 'test-report.pdf',
        },
        template: {
          content: `${documentTemplate}`,
          encodingType: 'base64',
          fileType: 'html',
        },
      });

      const config = {
        method: 'post',
        url: 'https://cdogs-dev.apps.silver.devops.gov.bc.ca/api/v2/template/render',
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
        data: md,
      };

      const response = await axios(config)
        .then((response) => {
          console.log('Generated File');
          return response.data;
        })
        .catch((error) => {
          console.log(error.response);
        });
      return response;
    } else {
      return Error('No report type selected');
    }
  }

  // sends an email formatted with html that has all the report data
  async emailHTML(reportType: string, email: string, siteId: string, name: string): Promise<string> {
    const authorizationToken = await this.getToken();

    const requestUrl =
      reportType == 'synopsis'
        ? `${hostname}:${port}/srsites/synopsisReport/${siteId}`
        : reportType == 'detailed'
        ? `${hostname}:${port}/srsites/detailedReport/${siteId}`
        : '';
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let documentTemplate: string;
    let htmlFile: string;
    if (requestUrl !== '') {
      const siteData = await lastValueFrom(
        this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
      );
      siteData['account'] = name;

      if (reportType == 'detailed') {
        documentTemplate = this.buildDetailedTemplate(siteData);
      } else {
        documentTemplate = synopsisTemplate;
      }
      htmlFile = await this.getHtml(siteData, documentTemplate, authorizationToken.toString());
    }

    const data = JSON.stringify({
      bodyType: 'html',
      body: `${htmlFile}`,
      contexts: [
        {
          context: {
            something: {
              greeting: 'Hello',
              target: 'World',
            },
            someone: 'user',
          },
          delayTS: 0,
          tag: 'tag',
          to: [`${email}`],
        },
      ],
      encoding: 'utf-8',
      from: 'BCOLHELP@gov.bc.ca',
      priority: 'normal',
      subject: 'Hello {{ someone }}',
    });

    const config = {
      method: 'post',
      url: 'https://ches-dev.apps.silver.devops.gov.bc.ca/api/v1/emailMerge',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authorizationToken}`,
      },
      data: data,
    };

    return axios(config)
      .then(() => {
        return 'Email Sent';
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('Response:');
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('Request:');
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log('Error config:');
        console.log(error.config);
        console.log(error);
      });
  }

  // sends preset data + base64 encoded html template and returns an html document with the data inserted
  async getHtml(data: any, template: string, token?: string): Promise<string> {
    const authorizationToken = token != null ? token : await this.getToken();
    let htmlData: string;

    const md = JSON.stringify({
      data,
      formatters:
        '{"myFormatter":"_function_myFormatter|function(data) { return data.slice(1); }","myOtherFormatter":"_function_myOtherFormatter|function(data) {return data.slice(2);}"}',
      options: {
        cacheReport: true,
        convertTo: 'html',
        overwrite: true,
        reportName: 'test-report.html',
      },
      template: {
        encodingType: 'base64',
        fileType: 'html',
        content: `${template}`,
      },
    });

    const config = {
      method: 'post',
      url: 'https://cdogs-dev.apps.silver.devops.gov.bc.ca/api/v2/template/render',
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
        'Content-Type': 'application/json',
      },
      data: md,
    };

    await axios(config)
      .then(function (response) {
        htmlData = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    return htmlData;
  }

  async getPlainText(token?: string): Promise<string> {
    const authorizationToken = token != null ? token : await this.getToken();
    let plainTextData: string;
    const data = '';

    const md = JSON.stringify({
      data,
      formatters:
        '{"myFormatter":"_function_myFormatter|function(data) { return data.slice(1); }","myOtherFormatter":"_function_myOtherFormatter|function(data) {return data.slice(2);}"}',
      options: {
        cacheReport: true,
        convertTo: 'txt',
        overwrite: true,
        reportName: 'test-report.txt',
      },
      template: {
        encodingType: 'base64',
        fileType: 'html',
        content: `${plainTextTemplate}`,
      },
    });

    const config = {
      method: 'post',
      url: 'https://cdogs-dev.apps.silver.devops.gov.bc.ca/api/v2/template/render',
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
        'Content-Type': 'application/json',
      },
      data: md,
    };

    await axios(config)
      .then(function (response) {
        plainTextData = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    return plainTextData;
  }

  // dynamically builds the detailed template with some data, the rest of the data is added in getPdf()
  buildDetailedTemplate(data): string {
    let template: string = detailedPartialTemplate;
    template = template.concat('<hr size="3" color="black">');
    // notations
    const notationsLength = data.notationsArray.length;
    let counter = 0;
    if (notationsLength > 0) {
      // sort notations chronologically
      data.notationsArray.sort(this.sortByProperty('eventDate'));
      template = template.concat('<div style="page-break-inside: avoid">');
      template = template.concat('<h4>NOTATIONS</h4>\n');
      for (const notation of data.notationsArray) {
        if (counter > 0) {
          template = template.concat('<div style="page-break-inside: avoid">\n');
        }
        template = template.concat('<table>\n');
        template = template.concat(`<tr><th>Notation Type:</th><td>${notation.eventType}</td></tr>`);
        template = template.concat(`<tr><th>Notation Class:</th><td>${notation.eventClass}</td></tr>`);
        template = template.concat(`<tr><th>Initiated:</th><td>${notation.eventDate}</td></tr>`);
        template = template.concat(`<tr><th>Approved:</th><td>${notation.approvedDate}</td></tr>`);
        template = template.concat(`<tr><th>Ministry Contact:</th><td>${notation.ministryContact}</td></tr>`);
        template = template.concat(`<tr><th>Note:</th><td>${notation.noteString}</td></tr>`);
        template = template.concat(
          `<tr><th style="font-size: 16px;">Required Actions:</th><td>${notation.requiredAction}</td></tr>`
        );
        template = template.concat(`</table>`);
        if (notation.participantsArray.length > 0) {
          template = template.concat('<br>');
          template = template.concat(`<h5 style="text-indent: 4em"><em>Notation Participants</em></h5>`);
          template = template.concat(`<table>`);
          for (const notationParticipant of notation.participantsArray) {
            template = template.concat(`<tr><th>Name:</th><td>${notationParticipant.nameString}</td></tr>`);
            template = template.concat(`<tr><th>Role:</th><td>${notationParticipant.roleString}</td></tr>`);
            template = template.concat(`<tr><th>&nbsp;</th><td>&nbsp;</td></tr>`);
          }
          template = template.concat(`</table>`);
        }
        template = template.concat('</div>');
        counter++;
        if (counter < notationsLength) {
          template = template.concat('<hr>');
        }
      }
      template = template.concat('<hr size="2" color="black">');
    } else {
      template = template.concat('<div style="page-break-inside: avoid">');
      template = template.concat(
        '<div class="row"><div class="col-sm text-center">No notations have been submitted for this site</div></div>'
      );
      template = template.concat('</div>');
      template = template.concat('<hr size="2" color="black">');
    }
    // participants
    const participantsLength = data.participantsArray.length;
    counter = 0;
    if (participantsLength > 0) {
      // sort participants chronologically
      data.participantsArray.sort(this.sortByProperty('effectiveDate'));
      template = template.concat('<div style="page-break-inside: avoid">');
      template = template.concat('<h4>SITE PARTICIPANTS</h4>\n');
      for (const participant of data.participantsArray) {
        if (counter > 0) {
          template = template.concat('<div style="page-break-inside: avoid">\n');
        }
        template = template.concat('<table>\n');
        template = template.concat(`<tr><th>Participant:</th><td>${participant.nameString}</td></tr>`);
        template = template.concat(`<tr><th>Role(s):</th><td>${participant.participantType}</td></tr>`);
        template = template.concat(`<tr><th>Start Date:</th><td>${participant.effectiveDate}</td></tr>`);
        template = template.concat(`<tr><th>End Date:</th><td>${participant.endDate}</td></tr>`);
        template = template.concat(`<tr><th>Notes:</th><td>${participant.noteString}</td></tr>`);
        template = template.concat(`</table></div>`);
        counter++;
        if (counter < participantsLength) {
          template = template.concat('<hr>');
        }
      }
      template = template.concat('<hr size="2" color="black">');
    } else {
      template = template.concat('<div style="page-break-inside: avoid">');
      template = template.concat(
        '<div class="row"><div class="col-sm text-center">No participants have been submitted for this site</div></div>'
      );
      template = template.concat('</div>');
      template = template.concat('<hr size="2" color="black">');
    }
    // documents
    const documentsLength = data.documentsArray.length;
    counter = 0;
    if (documentsLength > 0) {
      // sort documents chronologically
      data.documentsArray.sort(this.sortByProperty('documentDate'));
      template = template.concat('<div style="page-break-inside: avoid">');
      template = template.concat('<h4>DOCUMENTS</h4>\n');
      for (const document of data.documentsArray) {
        if (counter > 0) {
          template = template.concat('<div style="page-break-inside: avoid">\n');
        }
        template = template.concat('<table>\n');
        template = template.concat(`<tr><th>Title:</th><td>${document.titleString}</td></tr>`);
        template = template.concat(`<tr><th>Authored:</th><td>${document.documentDate}</td></tr>`);
        template = template.concat(`<tr><th>Submitted:</th><td>${document.submissionDate}</td></tr>`);
        template = template.concat(`</table>`);
        if (document.participantsArray.length > 0) {
          template = template.concat('<br>');
          template = template.concat(`<h5 style="text-indent: 4em"><em>Document Participants</em></h5>`);
          template = template.concat(`<table>`);
          for (const documentParticipant of document.participantsArray) {
            template = template.concat(`<tr><th>Name:</th><td>${documentParticipant.nameString}</td></tr>`);
            template = template.concat(`<tr><th>Role:</th><td>${documentParticipant.roleString}</td></tr>`);
            template = template.concat(`<tr><th>&nbsp;</th><td>&nbsp;</td></tr>`);
          }
          template = template.concat(`</table>`);
        }
        template = template.concat('</div>');
        counter++;
        if (counter < documentsLength) {
          template = template.concat('<hr>');
        }
      }
      template = template.concat('<hr size="2" color="black">');
    } else {
      template = template.concat('<div style="page-break-inside: avoid">');
      template = template.concat(
        '<div class="row"><div class="col-sm text-center">No documents have been submitted for this site</div></div>'
      );
      template = template.concat('</div>');
      template = template.concat('<hr size="2" color="black">');
    }

    // associated sites
    const assocSitesLength = data.associatedSitesArray.length;
    counter = 0;
    if (assocSitesLength > 0) {
      // sort associated sites chronologically
      data.associatedSitesArray.sort(this.sortByProperty('effectDate'));
      template = template.concat('<div style="page-break-inside: avoid">');
      template = template.concat('<h4>ASSOCIATED SITES</h4>\n');
      for (const associatedSite of data.associatedSitesArray) {
        if (counter > 0) {
          template = template.concat('<div style="page-break-inside: avoid">\n');
        }
        template = template.concat('<table>\n');
        template = template.concat(`<tr><th>Site ID:</th><td>${associatedSite.siteId}</td></tr>`);
        template = template.concat(`<tr><th>Effect Date:</th><td>${associatedSite.effectDate}</td></tr>`);
        template = template.concat(`<tr><th>Notes:</th><td>${associatedSite.noteString}</td></tr>`);
        template = template.concat(`</table>`);
        template = template.concat('</div>');
        counter++;
        if (counter < assocSitesLength) {
          template = template.concat('<hr>');
        }
      }
      template = template.concat('<hr size="2" color="black">');
    } else {
      template = template.concat('<div style="page-break-inside: avoid">');
      template = template.concat(
        '<div class="row"><div class="col-sm text-center">No associated sites have been submitted for this site</div></div>'
      );
      template = template.concat('</div>');
      template = template.concat('<hr size="2" color="black">');
    }

    // suspect land uses
    const suspectLandUsesLength = data.suspectLandUsesArray.length;
    counter = 0;
    if (suspectLandUsesLength > 0) {
      template = template.concat('<div style="page-break-inside: avoid">');
      template = template.concat('<h4>SUSPECT LAND USES</h4>\n');
      for (const suspectLandUse of data.suspectLandUsesArray) {
        if (counter > 0) {
          template = template.concat('<div style="page-break-inside: avoid">\n');
        }
        template = template.concat('<table>\n');
        template = template.concat(`<tr><th>Land Use:</th><td>${suspectLandUse.landUse}</td></tr>`);
        template = template.concat(`<tr><th>Notes:</th><td>${suspectLandUse.noteString}</td></tr>`);
        template = template.concat(`</table>`);
        template = template.concat('</div>');
        counter++;
        if (counter < suspectLandUsesLength) {
          template = template.concat('<hr>');
        }
      }
      template = template.concat('<hr size="2" color="black">');
    } else {
      template = template.concat('<div style="page-break-inside: avoid">');
      template = template.concat(
        '<div class="row"><div class="col-sm text-center">No suspect land uses have been submitted for this site</div></div>'
      );
      template = template.concat('</div>');
      template = template.concat('<hr size="2" color="black">');
    }

    // parcel descriptions
    const parcelDescriptionsLength = data.parcelDescriptionsArray.length;
    counter = 0;
    if (parcelDescriptionsLength > 0) {
      // sort parcel descriptions chronologically
      data.parcelDescriptionsArray.sort(this.sortByProperty('dateNoted'));
      template = template.concat('<div style="page-break-inside: avoid">');
      template = template.concat('<h4>PARCEL DESCRIPTIONS</h4>\n');
      for (const parcelDescription of data.parcelDescriptionsArray) {
        if (counter > 0) {
          template = template.concat('<div style="page-break-inside: avoid">\n');
        }
        template = template.concat('<table>\n');
        template = template.concat(`<tr><th>Date Noted:</th><td>${parcelDescription.dateNoted}</td></tr>`);
        template = template.concat(`<tr><th>Crown Lands PIN:</th><td>${parcelDescription.pin}</td></tr>`);
        template = template.concat(`<tr><th>Parcel ID:</th><td>${parcelDescription.pid}</td></tr>`);
        template = template.concat(
          `<tr><th>Crown Lands File Number:</th><td>${parcelDescription.crownLandsFileNumber}</td></tr>`
        );
        template = template.concat(`<tr><th>Land Description:</th><td>${parcelDescription.legalDescription}</td></tr>`);
        template = template.concat(`</table>`);
        template = template.concat('</div>');
        counter++;
        if (counter < parcelDescriptionsLength) {
          template = template.concat('<hr>');
        }
      }
      template = template.concat('<hr size="2" color="black">');
    } else {
      template = template.concat('<div style="page-break-inside: avoid">');
      template = template.concat(
        '<div class="row"><div class="col-sm text-center">No parcel descriptions have been submitted for this site</div></div>'
      );
      template = template.concat('</div>');
      template = template.concat('<hr size="2" color="black">');
    }

    // site profile
    if (data.siteProfileData != undefined) {
      template = template.concat('<div style="page-break-inside: avoid">');
      template = template.concat('<h4>SITE PROFILE</h4>\n');
      template = template.concat('<table>\n');
      template = template.concat(`<tr><th>Date Received:</th><td>${data.siteProfileData.dateReceived}</td></tr>`);
      template = template.concat(`<tr><th>Date Completed:</th><td>${data.siteProfileData.dateCompleted}</td></tr>`);
      template = template.concat(
        `<tr><th>Date Local Authority:</th><td>${data.siteProfileData.dateLocalAuthority}</td></tr>`
      );
      template = template.concat(`<tr><th>Date Registrar:</th><td>${data.siteProfileData.dateRegistrar}</td></tr>`);
      template = template.concat(`<tr><th>Date Decision:</th><td>${data.siteProfileData.dateDecision}</td></tr>`);
      template = template.concat(`<tr><th>Date Entered:</th><td>${data.siteProfileData.dateEntered}</td></tr>`);
      template = template.concat(`<tr><th>Decision:</th><td>${data.siteProfileData.decisionText}</td></tr>`);
      template = template.concat(`<tr><th>Comments:</th><td>${data.siteProfileData.commentString}</td></tr>`);
      template = template.concat(`</table>`);
      template = template.concat('</div>');
      counter++;
      template = template.concat('<hr size="2" color="black">');
    } else {
      template = template.concat('<div style="page-break-inside: avoid">');
      template = template.concat(
        '<div class="row"><div class="col-sm text-center">No site profile has been submitted for this site</div></div>'
      );
      template = template.concat('</div>');
      template = template.concat('<hr size="2" color="black">');
    }

    template = template.concat('<p style="text-align: center">End of Detailed Report</p></div></body></html>');

    return base64.encode(template);
  }

  sortByProperty(property) {
    return function (a, b) {
      if (a[property] > b[property]) return 1;
      else if (a[property] < b[property]) return -1;
      return 0;
    };
  }

  // get token for use with CDOGS
  // eslint-disable-next-line @typescript-eslint/ban-types
  getToken(): Promise<Object> {
    const url = `https://dev.oidc.gov.bc.ca/auth/realms/${process.env.service_realm}/protocol/openid-connect/token`;
    const service_client_id = process.env.service_client_id;
    const service_client_secret = process.env.service_client_secret;
    const token = `${service_client_id}:${service_client_secret}`;
    const encodedToken = Buffer.from(token).toString('base64');
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + encodedToken,
      },
    };
    const grantTypeParam = new URLSearchParams();
    grantTypeParam.append('grant_type', 'client_credentials');
    return axios
      .post(url, grantTypeParam, config)
      .then((response) => {
        return response.data.access_token;
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('Response:');
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('Request:');
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log('Error config:');
        console.log(error.config);
        console.log(error);
      });
  }
}
