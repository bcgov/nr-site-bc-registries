import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { plainTextTemplate } from 'utils/constants';
import * as base64 from 'base-64';
var axios = require('axios');
import { URLSearchParams } from 'url';
import * as fs from 'fs';
import * as path from 'path';
let synopsisTemplate: string;
let detailedPartialTemplate: string;
let hostname: string;
let port: number;

@Injectable()
export class BCRegistryService {
  constructor(private httpService: HttpService) {
    synopsisTemplate = base64.encode(fs.readFileSync(path.resolve(__dirname, './utils/templates/synopsisTemplate.html'), 'utf8'));
    detailedPartialTemplate = fs.readFileSync(path.resolve(__dirname, './utils/templates/detailedPartialTemplate.html'), 'utf8');
    // docker hostname is the container name, use localhost for local development
    hostname = process.env.BACKEND_URL ? `http://${process.env.BACKEND_URL}` : `http://localhost`;
    // local development backend port is 3001, docker backend port is 3000
    port = process.env.BACKEND_URL ? 3000 : 3001;
  }

  async getPdf(reportType: string, siteId: string): Promise<any> {
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
      let data = await lastValueFrom(
        this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
      );
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
          cacheReport: true,
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

      const response = await axios(config);
      return response.data;
    } else {
      return Error('No report type selected');
    }
  }

  async emailPdf(reportType: string, email: string, siteId: string): Promise<any> {
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
      let siteData = await lastValueFrom(
        this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
      );

      if (reportType == 'detailed') {
        documentTemplate = this.buildDetailedTemplate(siteData);
      } else {
        documentTemplate = synopsisTemplate;
      }
      htmlFile = await this.getHtml(siteData, documentTemplate, authorizationToken.toString());
    }

    var data = JSON.stringify({
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

    var config = {
      method: 'post',
      url: 'https://ches-dev.apps.silver.devops.gov.bc.ca/api/v1/emailMerge',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authorizationToken}`,
      },
      data: data,
    };

    return axios(config)
      .then((response) => {
        return 'Email Sent';
      })
      .catch(function (error) {
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

    var config = {
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
    var data = '';

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

    var config = {
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

  buildDetailedTemplate(data): string {
    let template: string = detailedPartialTemplate;
    template = template.concat('<hr size="3" color="black">');
    let notationsLength = data.notationsArray.length;
    let counter = 0;
    if (notationsLength > 0) {
      template = template.concat('<h4>NOTATIONS</h4>\n');
      for (let notation of data.notationsArray) {
        template = template.concat('<table>\n');
        template = template.concat(`<tr><th>Notation Type:</th><td>${notation.eventType}</td></tr>`);
        template = template.concat(`<tr><th>Notation Class:</th><td>${notation.eventClass}</td></tr>`);
        template = template.concat(`<tr><th>Initiated:</th><td>${notation.eventDate}</td></tr>`);
        template = template.concat(`<tr><th>Approved:</th><td>${notation.approvedDate}</td></tr>`);
        template = template.concat(`<tr><th>Ministry Contact:</th><td>${notation.ministryContact}</td></tr>`);
        template = template.concat(`</table>`);
        if (notation.participantsArray.length > 0) {
          template = template.concat(`<table><tr><th>Notation Participants</th></tr>`);
          for (let notationParticipant of notation.participantsArray) {
            template = template.concat(`<tr><td>${notationParticipant.nameString}</td></tr>`);
          }
          template = template.concat(`</table>`);
          template = template.concat(`<table><tr><th>Notation Roles</th></tr>`);
          for (let notationParticipant of notation.participantArray) {
            template = template.concat(`<tr><td>${notationParticipant.roleString}</td></tr>`);
          }
          template = template.concat(`</table>`);
        }
        template = template.concat(`<table><tr><th>Note:</th><td>${notation.noteString}</td></tr></table>`);
        counter++;
        if (counter < notationsLength) {
          template = template.concat('<hr>');
        }
      }
      template = template.concat('<hr size="2" color="black">');
    }
    let participantsLength = data.participantsArray.length;
    counter = 0;
    if (participantsLength > 0) {
      template = template.concat('<h4>SITE PARTICIPANTS</h4>\n');
      for (let participant of data.participantsArray) {
        template = template.concat('<table>\n');
        template = template.concat(`<tr><th>Participant:</th><td>${participant.nameString}</td></tr>`);
        template = template.concat(`<tr><th>Role(s):</th><td>${participant.participantType}</td></tr>`);
        template = template.concat(`<tr><th>Start Date:</th><td>${participant.effectiveDate}</td></tr>`);
        template = template.concat(`<tr><th>End Date:</th><td>${participant.endDate}</td></tr>`);
        template = template.concat(`<tr><th>Notes:</th><td>${participant.noteString}</td></tr>`);
        template = template.concat(`</table>`);
        counter++;
        if (counter < participantsLength) {
          template = template.concat('<hr>');
        }
      }
      template = template.concat('<hr size="2" color="black">');
    }
    template = template.concat('<p style="text-align: center">End of Detailed Report</p></div></body></html>');
    return base64.encode(template);
  }

  getToken(): Promise<Object> {
    let url = 'https://dev.oidc.gov.bc.ca/auth/realms/jbd6rnxw/protocol/openid-connect/token';
    let service_client_id = process.env.service_client_id;
    let service_client_secret = process.env.service_client_secret;
    const token = `${service_client_id}:${service_client_secret}`;
    const encodedToken = Buffer.from(token).toString('base64');
    let config = {
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
        console.log(error.response);
      });
  }
}
