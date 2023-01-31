import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import * as base64 from 'base-64';
import { URLSearchParams } from 'url';
import * as fs from 'fs';
import * as path from 'path';
import { SearchResultsJson, SearchResultsJsonObject } from 'utils/types';
import { newSiteProfileDate } from 'utils/util';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios'); //
    const html_to_pdf = require('html-pdf-node');
    const Mustache = require('mustache');

let synopsisTemplate: string;
let detailedPartialTemplate: string;
let nilTemplate: string;
let nilTemplate2: string;
let searchResultsTemplate: string;
let hostname: string;
let port: number;

@Injectable()
export class BCRegistryService {
  constructor(private httpService: HttpService) {
    synopsisTemplate = fs.readFileSync(path.resolve(__dirname, '../../utils/templates/synopsisTemplate.html'), 'utf8');
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
    searchResultsTemplate = fs.readFileSync(
      path.resolve(__dirname, '../../utils/templates/searchResultsPartialTemplate.html'),
      'utf8'
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
    const authorizationToken = await this.getCdogsToken();
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
        data['searchType'] = 'Land Title Parcel Identifier (PID)';
        data['searchCriteria1'] = 'Land Title PID: ' + searchCriteria1; // parcel id
        data['searchCriteria2'] = '';
        data['searchCriteria3'] = '';
        break;
      }
      case 'clf': {
        data['searchType'] = 'Crown Land File Number';
        data['searchCriteria1'] = 'Crown Land File Number: ' + searchCriteria1; // crown lands file number
        data['searchCriteria2'] = '';
        data['searchCriteria3'] = '';
        break;
      }
      case 'clp': {
        data['searchType'] = 'Crown Land Parcel Identification Number (PIN)';
        data['searchCriteria1'] = 'Crown Land PIN: ' + searchCriteria1; // crown lands pin
        data['searchCriteria2'] = '';
        data['searchCriteria3'] = '';
        break;
      }
      case 'sid': {
        data['searchType'] = 'Site Identification Number';
        data['searchCriteria1'] = 'Site ID: ' + searchCriteria1; // siteid
        data['searchCriteria2'] = '';
        data['searchCriteria3'] = '';
        break;
      }
      case 'adr': {
        data['searchType'] = 'Address';
        data['searchCriteria1'] = 'Address: ' + searchCriteria1; // address
        data['searchCriteria2'] = 'City: ' + searchCriteria2; // city
        data['searchCriteria3'] = '';
        break;
      }
      case 'coords': {
        data['searchType'] = 'Area';
        data['searchCriteria1'] = 'Latitude: ' + searchCriteria1; // lat
        data['searchCriteria2'] = 'Longitude: ' + searchCriteria2; // lon
        const rad = searchCriteria3 == 'Small' ? '0.5km' : '5.0km';
        data['searchCriteria3'] = 'Radius: ' + rad; // size
        break;
      }
      case 'postal': {
        data['searchType'] = 'Area';
        data['searchCriteria1'] = 'Postal Code: ' + searchCriteria1; // postalcode
        const rad = searchCriteria3 == 'Small' ? '0.5km' : '5.0km';
        data['searchCriteria2'] = 'Radius: ' + rad; // size
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
      url: `${process.env.cdogs_url}`,
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
      data: md,
    };

    return await axios(config)
      .then((response) => {
        console.log('Generated File 1');
        return response.data;
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  async requestNilSiteIdPdf(siteId: string, name: string) {
    const authorizationToken = await this.getCdogsToken();
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
    data['searchType'] = 'Site Identification Number';
    data['siteId'] = 'Site ID: ' + siteId; // siteid

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
      url: `${process.env.cdogs_url}`,
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
      data: md,
    };

    return await axios(config)
      .then((response) => {
        console.log('Generated File 2');
        return response.data;
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  // builds the pdf report to be sent back to the frontend
  async getPdf(reportType: string, siteId: string, name: string): Promise<any> {
    const authorizationToken = await this.getCdogsToken();

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
        documentTemplate = this.buildSynopsisTemplate(data);
      }
      let buff = Buffer.from(documentTemplate, 'base64');  
      let text = buff.toString('utf-8');

      const filledDocumentTemplate = Mustache.render(text, data);

      let options = { format: 'A4' };

      let file = { content: filledDocumentTemplate };


      //might be a more elegant way to do this
      let returnBuffer: any;
      await html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        //console.log('pdfBuffer: ' + pdfBuffer);
        returnBuffer = pdfBuffer;
      });
      return returnBuffer;
      /*
      former CDAWGS method

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
        url: `${process.env.cdogs_url}`,
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
        data: md,
      };

      const response = await axios(config)
        .then((response) => {
          console.log('Generated File 3');
          //return response.data;
        })
        .catch((error) => {
          console.log(error.response);
          throw error;
        });
        
      return response;*/
    } else {
      return Error('No report type selected');
    }
  }

  async getPdfSiteIdDirect(reportType: string, siteId: string, name: string): Promise<any> {
    const authorizationToken = await this.getCdogsToken();

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
        documentTemplate = this.buildSynopsisTemplate(data);
      }

      let buff = Buffer.from(documentTemplate, 'base64');  
      let text = buff.toString('utf-8');

      const filledDocumentTemplate = Mustache.render(text, data);

      let options = { format: 'A4',
                      timeout: 0 };

      let file = { content: filledDocumentTemplate };


      //might be a more elegant way to do this
      let returnBuffer: any;
      await html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        //console.log('pdfBuffer: ' + pdfBuffer);
        returnBuffer = pdfBuffer;
      });
      return returnBuffer;
      /*
      former CDAWGS method

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
        url: `${process.env.cdogs_url}`,
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
        data: md,
      };

      const response = await axios(config)
        .then((response) => {
          console.log('Generated File 4');
          //return response.data;
        })
        .catch((error) => {
          console.log(error.response);
          throw error;
        });
        
      return response;*/
    } else {
      return Error('No report type selected');
    }
  }

  async generateEmailHTML(reportType: string, siteId: string, name: string): Promise<any> {
    const cdogsToken = await this.getCdogsToken();

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
        documentTemplate = this.buildSynopsisTemplate(siteData);
      }
      htmlFile = await this.getHtml(siteData, documentTemplate, cdogsToken.toString());
    }
    return htmlFile;
  }

  // sends an email formatted with html that has all the report data
  async sendEmailHTML(reportType: string, email: string, siteId: string, htmlFile: string): Promise<string> {
    const chesToken = await this.getChesToken();

    const rt = reportType == 'detailed' ? 'Detailed' : 'Synopsis';
    const data = JSON.stringify({
      bodyType: 'html',
      body: `${htmlFile}`,
      contexts: [
        {
          context: {
            reportType: `${rt}`,
            siteId: `${siteId}`,
          },
          delayTS: 0,
          tag: 'tag',
          to: [`${email}`],
        },
      ],
      encoding: 'utf-8',
      from: 'BCOLHELP@gov.bc.ca',
      priority: 'normal',
      subject: `Site Registry {{ reportType }} Report for Site {{ siteId }}`,
    });

    const config = {
      method: 'post',
      url: `${process.env.ches_url}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chesToken}`,
      },
      data: data,
    };

    return await axios(config)
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

  // sends preset data + base64 encoded html template to cdogs and returns an html document with the data inserted
  async getHtml(data: any, template: string, token?: string): Promise<string> {
    const authorizationToken = token != null ? token : await this.getCdogsToken();
    let htmlData: string;
	console.log('Report Data: ' + data);
    const md = JSON.stringify({
      data,
      formatters:
        '{"myFormatter":"_function_myFormatter|function(data) { return data.slice(1); }","myOtherFormatter":"_function_myOtherFormatter|function(data) {return data.slice(2);}"}',
      options: {
        cacheReport: true,
        convertTo: 'html',
        overwrite: true,
        reportName: 'sr-report.html',
      },
      template: {
        encodingType: 'base64',
        fileType: 'html',
        content: `${template}`,
      },
    });

    const config = {
      method: 'post',
      url: `${process.env.cdogs_url}`,
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
        throw error;
      });

    return htmlData;
  }

  // sends an email formatted with html that has search results data
  async emailSearchResultsHTML(searchResultsJson: SearchResultsJson, name: string): Promise<string> {
    const cdogsToken = await this.getCdogsToken();
    const chesToken = await this.getChesToken();

    const requestUrl = `${hostname}:${port}/srsites/getSearchResultsData/1`;
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const documentTemplate = this.buildSearchResultsTemplate(searchResultsJson.searchData);
    let htmlFile: string;
    if (requestUrl !== '') {
      // construct the template data object
      const data = await lastValueFrom(
        this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
      );
      data['account'] = name;
      switch (searchResultsJson.searchInfo.searchType) {
        case 'pid': {
          data['searchType'] = 'Land Title Parcel Identifier (PID)';
          data['searchCriteria1'] = 'Land Title ID: ' + searchResultsJson.searchInfo.searchCriteria1; // parcel id
          data['searchCriteria2'] = '';
          data['searchCriteria3'] = '';
          break;
        }
        case 'clf': {
          data['searchType'] = 'Crown Land File Number';
          data['searchCriteria1'] = 'Crown Land File Number: ' + searchResultsJson.searchInfo.searchCriteria1; // crown lands file number
          data['searchCriteria2'] = '';
          data['searchCriteria3'] = '';
          break;
        }
        case 'clp': {
          data['searchType'] = 'Crown Land Parcel Identification Number (PIN)';
          data['searchCriteria1'] = 'Crown Land PIN: ' + searchResultsJson.searchInfo.searchCriteria1; // crown lands pin
          data['searchCriteria2'] = '';
          data['searchCriteria3'] = '';
          break;
        }
        case 'sid': {
          data['searchType'] = 'Site Identification Number';
          data['searchCriteria1'] = 'Site ID: ' + searchResultsJson.searchInfo.searchCriteria1; // siteid
          data['searchCriteria2'] = '';
          data['searchCriteria3'] = '';
          break;
        }
        case 'adr': {
          data['searchType'] = 'Address';
          data['searchCriteria1'] = 'Address: ' + searchResultsJson.searchInfo.searchCriteria1; // address
          data['searchCriteria2'] = 'City: ' + searchResultsJson.searchInfo.searchCriteria2; // city
          data['searchCriteria3'] = '';
          break;
        }
        case 'coords': {
          data['searchType'] = 'Area';
          data['searchCriteria1'] = 'Latitude: ' + searchResultsJson.searchInfo.searchCriteria1; // lat
          data['searchCriteria2'] = 'Longitude: ' + searchResultsJson.searchInfo.searchCriteria2; // lon
          const rad = searchResultsJson.searchInfo.searchCriteria3 == 'Small' ? '0.5km' : '5.0km';
          data['searchCriteria3'] = 'Radius: ' + rad; // size
          break;
        }
        case 'postal': {
          data['searchType'] = 'Area';
          data['searchCriteria1'] = 'Postal Code: ' + searchResultsJson.searchInfo.searchCriteria1; // postalcode
          const rad = searchResultsJson.searchInfo.searchCriteria2 == 'Small' ? '0.5km' : '5.0km';
          data['searchCriteria2'] = 'Radius: ' + rad; // size
          data['searchCriteria3'] = '';
          break;
        }
      }
      // merge the template data with the template
      htmlFile = await this.getSearchResultsHtml(data, documentTemplate, cdogsToken.toString());
    }

    // build the email object
    const data = JSON.stringify({
      bodyType: 'html',
      body: `${htmlFile}`,
      contexts: [
        {
          context: {},
          delayTS: 0,
          tag: 'tag',
          to: [`${searchResultsJson.email}`],
        },
      ],
      encoding: 'utf-8',
      from: 'BCOLHELP@gov.bc.ca',
      priority: 'normal',
      subject: `Site Registry Search Results`,
    });

    const config = {
      method: 'post',
      url: `${process.env.ches_url}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${chesToken}`,
      },
      data: data,
    };

    // send the email
    return await axios(config)
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

  // sends preset data + base64 encoded html template to cdogs and returns an html document with the data inserted
  async getSearchResultsHtml(data: any, template: string, token?: string): Promise<string> {
    const authorizationToken = token != null ? token : await this.getCdogsToken();
    let htmlData: string;

    const md = JSON.stringify({
      data,
      formatters:
        '{"myFormatter":"_function_myFormatter|function(data) { return data.slice(1); }","myOtherFormatter":"_function_myOtherFormatter|function(data) {return data.slice(2);}"}',
      options: {
        cacheReport: true,
        convertTo: 'html',
        overwrite: true,
        reportName: 'sr-search-results.html',
      },
      template: {
        encodingType: 'base64',
        fileType: 'html',
        content: `${template}`,
      },
    });

    const config = {
      method: 'post',
      url: `${process.env.cdogs_url}`,
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

  buildSynopsisTemplate(data): string {
    let template: string = synopsisTemplate;
    template = template.concat('<hr size="1" color="black">');
    // site profile
    if (data.siteProfileData != undefined && data.siteProfileData.length != 0) {
      for (const entry of data.siteProfileData) {
        // there will only be one site profile in the data
        if (entry.dateReceived && newSiteProfileDate(entry.dateReceived)) {
          template = template.concat('<h4>CURRENT SITE DISCLOSURE STATEMENT (SEC. III AND IV)</h4>\n');
        } else {
          template = template.concat('<h4>CURRENT SITE PROFILE INFORMATION (SEC. III AND X)</h4>\n');
        }
        template = template.concat('<hr color="white">');
        template = template.concat('<table>');
        template = template.concat(`<tr><th>Date Received:</th>`);
        template = entry.dateReceived
          ? template.concat(`<td>${entry.dateReceived}</td></tr>`)
          : template.concat(`<td></td></tr>`);
        template = template.concat(`<tr><th>Date Completed:</th>`);
        template = entry.dateCompleted
          ? template.concat(`<td>${entry.dateCompleted}</td></tr>`)
          : template.concat(`<td></td></tr>`);
        template = template.concat(`<tr><th>Date Local Authority Received:</th>`);
        template = entry.dateLocalAuthority
          ? template.concat(`<td>${entry.dateLocalAuthority}</td></tr>`)
          : template.concat(`<td></td></tr>`);
        template = template.concat(`<tr><th>Date Registrar:</th>`);
        template = entry.dateRegistrar
          ? template.concat(`<td>${entry.dateRegistrar}</td></tr>`)
          : template.concat(`<td></td></tr>`);
        if (!newSiteProfileDate(entry.dateReceived)) {
          template = template.concat(`<tr><th>Date Decision:</th>`);
          template = entry.dateDecision
            ? template.concat(`<td>${entry.dateDecision}</td></tr>`)
            : template.concat(`<td></td></tr>`);
        }
        template = template.concat(`<tr><th>Date Entered:</th>`);
        template = entry.dateEntered
          ? template.concat(`<td>${entry.dateEntered}</td></tr>`)
          : template.concat(`<td></td></tr>`);
        if (!newSiteProfileDate(entry.dateReceived)) {
          template = template.concat(`<tr><th>Decision:</th>`);
          template = entry.decisionText
            ? template.concat(`<td>${entry.decisionText}</td></tr>`)
            : template.concat(`<td></td></tr>`);
        }
        template = template.concat(`</table>`);
        template = template.concat('<hr>');

        // site profile land use
        if (data.landUse != undefined && data.landUse.length != 0) {
          template = template.concat('<h4>III   COMMERCIAL AND INDUSTRIAL PURPOSES OR ACTIVITIES ON SITE</h4>\n');
          template = template.concat('<table>\n');
          template = template.concat(`<tr><td><b>Schedule 2</b></td><td></td></tr>`);
          template = template.concat(`<tr><td><b>Reference</b></td><td><b>Description</b></td></tr>`);
          for (const item of data.landUse) {
            template = template.concat(`<tr><td>${item.code}</td><td>${item.codeString}</td></tr>`);
          }
          template = template.concat(`</table>`);

          template = template.concat('<hr>');
        }

        // site profile questions and answers
        if (entry.qna) {
          if (entry && entry.dateReceived && !newSiteProfileDate(entry.dateReceived)) {
            template = template.concat('<h4>AREAS OF POTENTIAL CONCERN</h4>\n');
            template = template.concat('<table>\n');
            template =
              entry.qna[0].answer != ''
                ? template.concat(`<tr><td>${entry.qna[0].question}............${entry.qna[0].answer}</td></tr>`)
                : template;
            template =
              entry.qna[1].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[1].question}............${entry.qna[1].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[2].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[2].question}............${entry.qna[2].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[19].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[19].question}............${entry.qna[19].answer}</td></tr>`
                  ))
                : template;
            template = template.concat(`</table>`);

            template = template.concat('<hr>');

            template = template.concat('<h4>FILL MATERIALS</h4>\n');
            template = template.concat('<table>\n');
            template =
              entry.qna[3].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[3].question}............${entry.qna[3].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[4].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[4].question}............${entry.qna[4].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[5].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[5].question}............${entry.qna[5].answer}</td></tr>`
                  ))
                : template;
            template = template.concat(`</table>`);

            template = template.concat('<hr>');

            template = template.concat('<h4>WASTE DISPOSAL</h4>\n');
            template = template.concat('<table>\n');

            template =
              entry.qna[6].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[6].question}............${entry.qna[6].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[7].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[7].question}............${entry.qna[7].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[8].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[8].question}............${entry.qna[8].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[9].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[9].question}............${entry.qna[9].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[10].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[10].question}............${entry.qna[10].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[20].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[20].question}............${entry.qna[20].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[21].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[21].question}............${entry.qna[21].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[22].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[22].question}............${entry.qna[22].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[23].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[23].question}............${entry.qna[23].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[24].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[24].question}............${entry.qna[24].answer}</td></tr>`
                  ))
                : template;
            template = template.concat(`</table>`);

            template = template.concat('<hr>');

            template = template.concat('<h4>TANKS OR CONTAINERS USED OR STORED</h4>\n');
            template = template.concat('<table>\n');
            template =
              entry.qna[11].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[11].question}............${entry.qna[11].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[12].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[12].question}............${entry.qna[12].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[25].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[25].question}............${entry.qna[25].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[26].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[26].question}............${entry.qna[26].answer}</td></tr>`
                  ))
                : template;
            template = template.concat(`</table>`);

            template = template.concat('<hr>');

            template = template.concat('<h4>SPECIAL (HAZARDOUS) WASTES OR SUBSTANCES</h4>\n');
            template = template.concat('<table>\n');
            template =
              entry.qna[13].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[13].question}............${entry.qna[13].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[14].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[14].question}............${entry.qna[14].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[15].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[15].question}............${entry.qna[15].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[27].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[27].question}............${entry.qna[27].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[28].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[28].question}............${entry.qna[28].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[29].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[29].question}............${entry.qna[29].answer}</td></tr>`
                  ))
                : template;
            template = template.concat(`</table>`);

            template = template.concat('<hr>');

            template = template.concat('<h4>LEGAL OR REGULATORY ACTIONS OR CONSTRAINTS</h4>\n');
            template = template.concat('<table>\n');
            template =
              entry.qna[16].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[16].question}............${entry.qna[16].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[17].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[17].question}............${entry.qna[17].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[18].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[18].question}............${entry.qna[18].answer}</td></tr>`
                  ))
                : template;
            template = template.concat(`</table>`);

            template = template.concat('<hr>');
          }
        }
        if (entry.dateReceived && newSiteProfileDate(entry.dateReceived)) {
          // site disclosure comments
          template = template.concat('<h4>IV  ADDITIONAL COMMENTS AND EXPLANATIONS</h4>\n');
          template = template.concat(
            `<p style="font-size: 18px; font-weight: bold">Provide a brief summary of the planned activity and proposed land use at the site.</p>`
          );
          template =
            entry.plannedActivityComment != ''
              ? template.concat(`<p style="font-size: 18px">${entry.plannedActivityComment}</p>`)
              : template.concat(`<p style="font-size: 18px"></p>`);
          template = template.concat(
            '<p style="font-size: 18px; font-weight: bold">Indicate the information used to complete this site disclosure statement including a list of record searches completed.</p>'
          );
          template =
            entry.siteDisclosureComment != ''
              ? template.concat(`<p style="font-size: 18px">${entry.siteDisclosureComment}</p>`)
              : template.concat(`<p style="font-size: 18px"></p>`);
          template = template.concat(
            '<p style="font-size: 18px; font-weight: bold">List any past or present government orders, permits, approvals, certificates or notifications pertaining to the environmental condition of the site.</p>'
          );
          template =
            entry.govDocumentsComment != ''
              ? template.concat(`<p style="font-size: 18px">${entry.govDocumentsComment}</p>`)
              : template.concat(`<p style="font-size: 18px"></p>`);
        } else {
          // site profile comments
          template = template.concat('<h4>X   ADDITIONAL COMMENTS AND EXPLANATIONS</h4>\n');
          template = template.concat(
            '<p style="font-size: 18px; font-weight: bold">Note 1: Please list any past or present government orders, permits, approvals, certificates and notifications pertaining to the environmental condition, use or quality of soil, surface water, groundwater or biota at the site.</p>'
          );
          template =
            entry.govDocumentsComment != ''
              ? template.concat(`<p style="font-size: 18px">${entry.govDocumentsComment}</p>`)
              : template.concat(`<p style="font-size: 18px"></p>`);
          template = template.concat(
            '<p style="font-size: 18px; font-weight: bold">Note 2: If completed by a consultant, receiver or trustee, please indicate the type and degree of access to information used to complete this site profile.</p>'
          );
          template =
            entry.commentString != ''
              ? template.concat(`<p style="font-size: 18px">${entry.commentString}</p>`)
              : template.concat(`<p style="font-size: 18px"></p>`);
        }
        template = template.concat('<hr size="1" color="black">');
      }
    } else {
      template = template.concat(
        '<div class="row"><div class="col-sm text-center">No site profile has been submitted for this site</div></div>'
      );

      template = template.concat('<hr size="1" color="black">');
    }
    template = template.concat('<p style="text-align: center; font-size: 18px">End of Site Synopsis Report</p>');
    template = template.concat(
      '<p class="disclaimer">Disclaimer: Site Registry information has been filed in accordance with the provisions of the <i>Environmental Management Act</i>. While we believe the information to be reliable, BC Registries and Online Services and the province of British Columbia make no representation or warranty as to its accuracy or completeness. Persons using this information do so at their own risk.</p></div></body></html>'
    );

    return Buffer.from(template).toString('base64');
  }

  // dynamically builds the detailed template with some data, the rest of the data is added in getPdf()
  buildDetailedTemplate(data): string {
    let template: string = detailedPartialTemplate;
    template = template.concat('<hr size="1" color="black">');
    // notations
    const notationsLength = data.notationsArray.length;
    let counter = 0;
    if (notationsLength > 0) {
      // sort notations chronologically
      data.notationsArray.sort(this.sortByProperty('eventDate'));

      template = template.concat('<h4>NOTATIONS</h4>\n');
      for (const notation of data.notationsArray) {
        if (counter > 0) {
          // template = template.concat('<div style="page-break-inside: avoid">\n');
        }
        template = template.concat('<table>\n');
        template = template.concat(`<tr><th>Notation Type:</th><td>${notation.eventType}</td></tr>`);
        template = template.concat(`<tr><th>Notation Class:</th><td>${notation.eventClass}</td></tr>`);
        template = template.concat(`<tr><th>Initiated:</th><td>${notation.eventDate}</td></tr>`);
        template = template.concat(`<tr><th>Approved:</th><td>${notation.approvedDate}</td></tr>`);
        template = template.concat(`<tr><th>Ministry Contact:</th><td>${notation.ministryContact}</td></tr>`);
        template = template.concat(`<tr><th>Note:</th><td>${notation.noteString}</td></tr>`);
        template = template.concat(`<tr><th>Required Actions:</th><td>${notation.requiredAction}</td></tr>`);
        template = template.concat(`</table>`);
        if (notation.participantsArray.length > 0) {
          template = template.concat('<br>');
          template = template.concat(`<h4 style="text-indent: 4em"><em>Notation Participants</em></h4>`);
          template = template.concat(`<table>`);
          for (const notationParticipant of notation.participantsArray) {
            template = template.concat(`<tr><th>Name:</th><td>${notationParticipant.nameString}</td></tr>`);
            template = template.concat(`<tr><th>Role:</th><td>${notationParticipant.roleString}</td></tr>`);
            template = template.concat(`<tr><th>&nbsp;</th><td>&nbsp;</td></tr>`);
          }
          template = template.concat(`</table>`);
        }

        counter++;
        if (counter < notationsLength) {
          template = template.concat('<hr>');
        }
      }
      template = template.concat('<hr size="1" color="black">');
    } else {
      template = template.concat(
        '<div class="row"><div class="col-sm text-center">No notations have been submitted for this site</div></div>'
      );

      template = template.concat('<hr size="1" color="black">');
    }
    // participants
    const participantsLength = data.participantsArray.length;
    counter = 0;
    if (participantsLength > 0) {
      // sort participants chronologically
      data.participantsArray.sort(this.sortByProperty('effectiveDate'));

      template = template.concat('<h4>SITE PARTICIPANTS</h4>\n');
      for (const participant of data.participantsArray) {
        if (counter > 0) {
          // template = template.concat('<div style="page-break-inside: avoid">\n');
        }
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
      template = template.concat('<hr size="1" color="black">');
    } else {
      template = template.concat(
        '<div class="row"><div class="col-sm text-center">No participants have been submitted for this site</div></div>'
      );

      template = template.concat('<hr size="1" color="black">');
    }
    // documents
    const documentsLength = data.documentsArray.length;
    counter = 0;
    if (documentsLength > 0) {
      // sort documents chronologically
      data.documentsArray.sort(this.sortByProperty('documentDate'));

      template = template.concat('<h4>DOCUMENTS</h4>\n');
      for (const document of data.documentsArray) {
        if (counter > 0) {
          // template = template.concat('<div style="page-break-inside: avoid">\n');
        }
        template = template.concat('<table>\n');
        template = template.concat(`<tr><th>Title:</th><td>${document.titleString}</td></tr>`);
        template = template.concat(`<tr><th>Authored:</th><td>${document.documentDate}</td></tr>`);
        template = template.concat(`<tr><th>Submitted:</th><td>${document.submissionDate}</td></tr>`);
        template = template.concat(`</table>`);
        if (document.participantsArray.length > 0) {
          template = template.concat('<br>');
          template = template.concat(`<h4 style="text-indent: 4em"><em>Document Participants</em></h4>`);
          template = template.concat(`<table>`);
          for (const documentParticipant of document.participantsArray) {
            template = template.concat(`<tr><th>Name:</th><td>${documentParticipant.nameString}</td></tr>`);
            template = template.concat(`<tr><th>Role:</th><td>${documentParticipant.roleString}</td></tr>`);
            template = template.concat(`<tr><th>&nbsp;</th><td>&nbsp;</td></tr>`);
          }
          template = template.concat(`</table>`);
        }

        counter++;
        if (counter < documentsLength) {
          template = template.concat('<hr>');
        }
      }
      template = template.concat('<hr size="1" color="black">');
    } else {
      template = template.concat(
        '<div class="row"><div class="col-sm text-center">No documents have been submitted for this site</div></div>'
      );

      template = template.concat('<hr size="1" color="black">');
    }

    // associated sites
    const assocSitesLength = data.associatedSitesArray.length;
    counter = 0;
    if (assocSitesLength > 0) {
      // sort associated sites chronologically
      data.associatedSitesArray.sort(this.sortByProperty('effectDate'));

      template = template.concat('<h4>ASSOCIATED SITES</h4>\n');
      for (const associatedSite of data.associatedSitesArray) {
        if (counter > 0) {
          // template = template.concat('<div style="page-break-inside: avoid">\n');
        }
        template = template.concat('<table>\n');
        template = template.concat(`<tr><th>Site ID:</th><td>${associatedSite.siteId}</td></tr>`);
        template = template.concat(`<tr><th>Effect Date:</th><td>${associatedSite.effectDate}</td></tr>`);
        template = template.concat(`<tr><th>Notes:</th><td>${associatedSite.noteString}</td></tr>`);
        template = template.concat(`</table>`);

        counter++;
        if (counter < assocSitesLength) {
          template = template.concat('<hr>');
        }
      }
      template = template.concat('<hr size="1" color="black">');
    } else {
      template = template.concat(
        '<div class="row"><div class="col-sm text-center">No associated sites have been submitted for this site</div></div>'
      );

      template = template.concat('<hr size="1" color="black">');
    }

    // suspect land uses
    const suspectLandUsesLength = data.suspectLandUsesArray.length;
    counter = 0;
    if (suspectLandUsesLength > 0) {
      template = template.concat('<h4>SUSPECT LAND USES</h4>\n');
      for (const suspectLandUse of data.suspectLandUsesArray) {
        if (counter > 0) {
          // template = template.concat('<div style="page-break-inside: avoid">\n');
        }
        template = template.concat('<table>\n');
        template = template.concat(`<tr><th>Land Use:</th><td>${suspectLandUse.landUse}</td></tr>`);
        template = template.concat(`<tr><th>Notes:</th><td>${suspectLandUse.noteString}</td></tr>`);
        template = template.concat(`</table>`);

        counter++;
        if (counter < suspectLandUsesLength) {
          template = template.concat('<hr>');
        }
      }
      template = template.concat('<hr size="1" color="black">');
    } else {
      template = template.concat(
        '<div class="row"><div class="col-sm text-center">No suspect land uses have been submitted for this site</div></div>'
      );

      template = template.concat('<hr size="1" color="black">');
    }

    // parcel descriptions
    const parcelDescriptionsLength = data.parcelDescriptionsArray.length;
    counter = 0;
    if (parcelDescriptionsLength > 0) {
      // sort parcel descriptions chronologically
      data.parcelDescriptionsArray.sort(this.sortByProperty('dateNoted'));

      template = template.concat('<h4>PARCEL DESCRIPTIONS</h4>\n');
      for (const parcelDescription of data.parcelDescriptionsArray) {
        if (counter > 0) {
          // template = template.concat('<div style="page-break-inside: avoid">\n');
        }
        template = template.concat('<table>\n');
        template = template.concat(`<tr><th>Date Noted:</th><td>${parcelDescription.dateNoted}</td></tr>`);
        template = template.concat(`<tr><th>Crown Land PIN:</th><td>${parcelDescription.pin}</td></tr>`);
        template = template.concat(`<tr><th>Parcel ID:</th><td>${parcelDescription.pid}</td></tr>`);
        template = template.concat(
          `<tr><th>Crown Lands File Number:</th><td>${parcelDescription.crownLandsFileNumber}</td></tr>`
        );
        template = template.concat(`<tr><th>Land Description:</th><td>${parcelDescription.legalDescription}</td></tr>`);
        template = template.concat(`</table>`);

        counter++;
        if (counter < parcelDescriptionsLength) {
          template = template.concat('<hr>');
        }
      }
      template = template.concat('<hr size="1" color="black">');
    } else {
      template = template.concat(
        '<div class="row"><div class="col-sm text-center">No parcel descriptions have been submitted for this site</div></div>'
      );

      template = template.concat('<hr size="1" color="black">');
    }

    // site profile
    if (data.siteProfileData != undefined && data.siteProfileData.length != 0) {
      template = template.concat('<h4>SITE PROFILE/SITE DISCLOSURE STATEMENT HISTORY</h4>\n');
      for (const entry of data.siteProfileData) {
        if (entry.dateReceived) {
          if (newSiteProfileDate(entry.dateReceived)) {
            template = template.concat('<h4>SITE DISCLOSURE STATEMENT (SEC. III AND IV)</h4>\n');
          } else {
            template = template.concat('<h4>SITE PROFILE INFORMATION (SEC. III AND X)</h4>\n');
          }
        } else {
          template = template.concat('<h4>SITE PROFILE INFORMATION (SEC. III AND X)</h4>\n');
        }
        template = template.concat('<hr color="white">');
        template = template.concat('<table>');
        template = template.concat(`<tr><th>Date Received:</th>`);
        template = entry.dateReceived
          ? template.concat(`<td>${entry.dateReceived}</td></tr>`)
          : template.concat(`<td></td></tr>`);
        template = template.concat(`<tr><th>Date Completed:</th>`);
        template = entry.dateCompleted
          ? template.concat(`<td>${entry.dateCompleted}</td></tr>`)
          : template.concat(`<td></td></tr>`);
        template = template.concat(`<tr><th>Date Local Authority Received:</th>`);
        template = entry.dateLocalAuthority
          ? template.concat(`<td>${entry.dateLocalAuthority}</td></tr>`)
          : template.concat(`<td></td></tr>`);
        template = template.concat(`<tr><th>Date Registrar:</th>`);
        template = entry.dateRegistrar
          ? template.concat(`<td>${entry.dateRegistrar}</td></tr>`)
          : template.concat(`<td></td></tr>`);
        if (!newSiteProfileDate(entry.dateReceived)) {
          template = template.concat(`<tr><th>Date Decision:</th>`);
          template = entry.dateDecision
            ? template.concat(`<td>${entry.dateDecision}</td></tr>`)
            : template.concat(`<td></td></tr>`);
        }
        template = template.concat(`<tr><th>Date Entered:</th>`);
        template = entry.dateEntered
          ? template.concat(`<td>${entry.dateEntered}</td></tr>`)
          : template.concat(`<td></td></tr>`);
        if (!newSiteProfileDate(entry.dateReceived)) {
          template = template.concat(`<tr><th>Decision:</th>`);
          template = entry.decisionText
            ? template.concat(`<td>${entry.decisionText}</td></tr>`)
            : template.concat(`<td></td></tr>`);
        }
        template = template.concat(`</table>`);
        counter++;
        template = template.concat('<hr>');

        // site profile land use
        if (data.landUse != undefined && data.landUse.length != 0) {
          template = template.concat('<h4>III   COMMERCIAL AND INDUSTRIAL PURPOSES OR ACTIVITIES ON SITE</h4>\n');
          template = template.concat('<table>\n');
          template = template.concat(`<tr><td><b>Schedule 2</b></td><td></td></tr>`);
          template = template.concat(`<tr><td><b>Reference</b></td><td><b>Description</b></td></tr>`);
          for (const item of data.landUse) {
            template = template.concat(`<tr><td>${item.code}</td><td>${item.codeString}</td></tr>`);
          }
          template = template.concat(`</table>`);

          counter++;
          template = template.concat('<hr>');
        }

        // site profile questions and answers
        if (entry.qna) {
          if (entry && entry.dateReceived && !newSiteProfileDate(entry.dateReceived)) {
            template = template.concat('<h4>AREAS OF POTENTIAL CONCERN</h4>\n');
            template = template.concat('<table>\n');
            template =
              entry.qna[0].answer != ''
                ? template.concat(`<tr><td>${entry.qna[0].question}............${entry.qna[0].answer}</td></tr>`)
                : template;
            template =
              entry.qna[1].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[1].question}............${entry.qna[1].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[2].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[2].question}............${entry.qna[2].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[19].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[19].question}............${entry.qna[19].answer}</td></tr>`
                  ))
                : template;
            template = template.concat(`</table>`);

            template = template.concat('<hr>');

            template = template.concat('<h4>FILL MATERIALS</h4>\n');
            template = template.concat('<table>\n');
            template =
              entry.qna[3].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[3].question}............${entry.qna[3].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[4].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[4].question}............${entry.qna[4].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[5].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[5].question}............${entry.qna[5].answer}</td></tr>`
                  ))
                : template;
            template = template.concat(`</table>`);

            template = template.concat('<hr>');

            template = template.concat('<h4>WASTE DISPOSAL</h4>\n');
            template = template.concat('<table>\n');

            template =
              entry.qna[6].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[6].question}............${entry.qna[6].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[7].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[7].question}............${entry.qna[7].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[8].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[8].question}............${entry.qna[8].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[9].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[9].question}............${entry.qna[9].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[10].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[10].question}............${entry.qna[10].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[20].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[20].question}............${entry.qna[20].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[21].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[21].question}............${entry.qna[21].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[22].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[22].question}............${entry.qna[22].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[23].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[23].question}............${entry.qna[23].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[24].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[24].question}............${entry.qna[24].answer}</td></tr>`
                  ))
                : template;
            template = template.concat(`</table>`);

            template = template.concat('<hr>');

            template = template.concat('<h4>TANKS OR CONTAINERS USED OR STORED</h4>\n');
            template = template.concat('<table>\n');
            template =
              entry.qna[11].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[11].question}............${entry.qna[11].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[12].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[12].question}............${entry.qna[12].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[25].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[25].question}............${entry.qna[25].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[26].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[26].question}............${entry.qna[26].answer}</td></tr>`
                  ))
                : template;
            template = template.concat(`</table>`);

            template = template.concat('<hr>');

            template = template.concat('<h4>SPECIAL (HAZARDOUS) WASTES OR SUBSTANCES</h4>\n');
            template = template.concat('<table>\n');
            template =
              entry.qna[13].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[13].question}............${entry.qna[13].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[14].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[14].question}............${entry.qna[14].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[15].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[15].question}............${entry.qna[15].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[27].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[27].question}............${entry.qna[27].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[28].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[28].question}............${entry.qna[28].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[29].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[29].question}............${entry.qna[29].answer}</td></tr>`
                  ))
                : template;
            template = template.concat(`</table>`);

            template = template.concat('<hr>');

            template = template.concat('<h4>LEGAL OR REGULATORY ACTIONS OR CONSTRAINTS</h4>\n');
            template = template.concat('<table>\n');
            template =
              entry.qna[16].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[16].question}............${entry.qna[16].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[17].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[17].question}............${entry.qna[17].answer}</td></tr>`
                  ))
                : template;
            template =
              entry.qna[18].answer != ''
                ? (template = template.concat(
                    `<tr><td>${entry.qna[18].question}............${entry.qna[18].answer}</td></tr>`
                  ))
                : template;
            template = template.concat(`</table>`);

            template = template.concat('<hr>');
          }
        }
        if (entry.dateReceived && newSiteProfileDate(entry.dateReceived)) {
          // site disclosure comments
          template = template.concat('<h4>IV  ADDITIONAL COMMENTS AND EXPLANATIONS</h4>\n');
          template = template.concat(
            `<p style="font-size: 18px; font-weight: bold">Provide a brief summary of the planned activity and proposed land use at the site.</p>`
          );
          template =
            entry.plannedActivityComment != ''
              ? template.concat(`<p style="font-size: 18px">${entry.plannedActivityComment}</p>`)
              : template.concat(`<p style="font-size: 18px"></p>`);
          template = template.concat(
            '<p style="font-size: 18px; font-weight: bold">Indicate the information used to complete this site disclosure statement including a list of record searches completed.</p>'
          );
          template =
            entry.siteDisclosureComment != ''
              ? template.concat(`<p style="font-size: 18px">${entry.siteDisclosureComment}</p>`)
              : template.concat(`<p style="font-size: 18px"></p>`);
          template = template.concat(
            '<p style="font-size: 18px; font-weight: bold">List any past or present government orders, permits, approvals, certificates or notifications pertaining to the environmental condition of the site.</p>'
          );
          template =
            entry.govDocumentsComment != ''
              ? template.concat(`<p style="font-size: 18px">${entry.govDocumentsComment}</p>`)
              : template.concat(`<p style="font-size: 18px"></p>`);
        } else {
          // site profile comments
          template = template.concat('<h4>X   ADDITIONAL COMMENTS AND EXPLANATIONS</h4>\n');
          template = template.concat(
            '<p style="font-size: 18px; font-weight: bold">Note 1: Please list any past or present government orders, permits, approvals, certificates and notifications pertaining to the environmental condition, use or quality of soil, surface water, groundwater or biota at the site.</p>'
          );
          template =
            entry.govDocumentsComment != ''
              ? template.concat(`<p style="font-size: 18px">${entry.govDocumentsComment}</p>`)
              : template.concat(`<p style="font-size: 18px"></p>`);
          template = template.concat(
            '<p style="font-size: 18px; font-weight: bold">Note 2: If completed by a consultant, receiver or trustee, please indicate the type and degree of access to information used to complete this site profile.</p>'
          );
          template =
            entry.commentString != ''
              ? template.concat(`<p style="font-size: 18px">${entry.commentString}</p>`)
              : template.concat(`<p style="font-size: 18px"></p>`);
        }
        template = template.concat('<hr size="1" color="black">');
      }
    } else {
      template = template.concat(
        '<div class="row"><div class="col-sm text-center">No site profile has been submitted for this site</div></div>'
      );

      template = template.concat('<hr size="1" color="black">');
    }
    template = template.concat('<p style="text-align: center; font-size: 18px">End of Site Details Report</p>');
    template = template.concat(
      '<p class="disclaimer">Disclaimer: Site Registry information has been filed in accordance with the provisions of the <i>Environmental Management Act</i>. While we believe the information to be reliable, BC Registries and Online Services and the province of British Columbia make no representation or warranty as to its accuracy or completeness. Persons using this information do so at their own risk.</p></div></body></html>'
    );

    return Buffer.from(template).toString('base64');
  }

  sortByProperty(property) {
    return function (a, b) {
      if (a[property] > b[property]) return 1;
      else if (a[property] < b[property]) return -1;
      return 0;
    };
  }

  buildSearchResultsTemplate(data: [SearchResultsJsonObject]): string {
    let template: string = searchResultsTemplate;
    // search results
    const searchResultsLength = data.length;
    if (searchResultsLength > 0) {
      // sort notations chronologically
      data.sort(this.sortByProperty('siteId'));
      for (const entry of data) {
        template = template.concat(`<tr><td>${entry.siteId}</td>`);
        template = template.concat(`<td>${entry.city}</td>`);
        template = template.concat(`<td>${entry.updatedDate}</td></tr>`);
      }
      template = template.concat(`</table>`);
    } else {
      template = template.concat(`</table>`);
      template = template.concat(
        `<div style="text-align: center">No sites were found with the given search criteria</div>`
      );
    }
    template = template.concat('<hr />');
    template = template.concat('<div style="text-align: center; font-size: 18px">End of Search Results</div>');
    template = template.concat(
      '<p class="disclaimer">Disclaimer: Site Registry information has been filed in accordance with the provisions of the <i>Environmental Management Act</i>. While we believe the information to be reliable, BC Registries and Online Services and the province of British Columbia make no representation or warranty as to its accuracy or completeness. Persons using this information do so at their own risk.</p></div></body></html>'
    );

    return Buffer.from(template).toString('base64');
  }

  // get token for use with CDOGS
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getCdogsToken(): Promise<Object> {
    const url = `${process.env.common_service_keycloak_base_url}${process.env.service_realm}/protocol/openid-connect/token`;
    const encodedToken = Buffer.from(
      `${process.env.cdogs_service_client_id}:${process.env.cdogs_service_client_secret}`
    ).toString('base64');
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

  // get token for use with CHES
  // eslint-disable-next-line @typescript-eslint/ban-types
  async getChesToken(): Promise<Object> {
    const url = `${process.env.common_service_keycloak_base_url}${process.env.service_realm}/protocol/openid-connect/token`;
    const encodedToken = Buffer.from(
      `${process.env.ches_service_client_id}:${process.env.ches_service_client_secret}`
    ).toString('base64');
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