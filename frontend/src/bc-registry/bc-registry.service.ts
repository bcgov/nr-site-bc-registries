import { HttpService } from '@nestjs/axios';
import { Injectable, StreamableFile } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { siteDto } from 'utils/types';
import { plainTextTemplate, synopsisTemplate } from 'utils/constants';
import * as base64 from 'base-64';
import * as utf8 from 'utf8';
var axios = require('axios');
import * as fs from 'fs';
import { URLSearchParams } from 'node:url';
let testData = '';
@Injectable()
export class BCRegistryService {
  constructor(private httpService: HttpService) {}

  async getText(): Promise<{ xd: string }> {
    // const requestUrl = `https://bcregistry-sandbox.apigee.net/pay/api/v1/accounts/${process.env.userid}/statements`;
    // const requestUrl = `https://bcregistry-sandbox.apigee.net/pay/api/v1/payment-requests`;
    // const requestUrl = `https://bcregistry-sandbox.apigee.net/pay/api/v1/accounts/${process.env.userid}/payments/queries`;
    // const requestUrl = `http://${process.env.host}/api/v1/payment-requests/2/receipts`;
    // const requestUrl = `http://${process.env.host}/pay/api/v1/payment-requests`;
    // const requestConfig: AxiosRequestConfig = {
    // //   headers: {
    // //     'Account-Id': `${process.env.userid}`,
    // //     Authorization: `Bearer ${process.env.secret}`,
    // //   },
    //   //   params: {
    //   //     bucket: process.env.bucket,
    //   //     secret: process.env.secret,
    //   //     userid: process.env.userid,
    //   //     sitesWeb: process.env.sitesWeb,
    //   //   },
    // };
    // const responseData = await lastValueFrom(
    //   this.httpService.post(requestUrl, null, requestConfig).pipe(
    //     map((response) => {
    //       console.log(response.data);
    //       return response.data;
    //     }),
    //   ),
    // );
    // console.log(responseData);
    // const readStream = fs.createReadStream(csvFile);
    // const writeStream = fs.createWriteStream(jsonOutput);
    // readStream.pipe(csvToJson()).pipe(writeStream);
    // console.log(postalCodeJSON);
    // fs.writeFile(jsonOutput, postalCodeJSON, {});
    const id = '8';
    const requestUrl = `http://localhost:3001/sites/`;
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data = testData;

    await lastValueFrom(
      this.httpService.get(requestUrl, requestConfig).pipe(
        map((response) => {
          console.log('Get request');
          console.log(response.data);
          return response.data;
        })
      )
    );

    const responseData = await lastValueFrom(
      this.httpService.post(requestUrl, data, requestConfig).pipe(
        map((response) => {
          console.log('Post request');
          console.log(response.data);
          return response.data;
        })
      )
    );
    return { xd: 'hello' };
  }

  // sends preset data + base64 encoded html template and returns an html document with the data inserted
  async getSynopsisHtml(data, token?: string): Promise<string> {
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
        content: `${synopsisTemplate}`,
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
    var data = testData;

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

  async getPdf(reportType: string, siteId: string): Promise<any> {
    const authorizationToken = await this.getToken();
    // const data = testData;
    const hostname = 'http://localhost';
    const port = '3001';

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
          content: `${synopsisTemplate}`,
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

    // get the report data & combine it with the template
    // these should be changed to env variables
    const hostname = 'http://localhost';
    const port = '3001';

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

    let htmlFile = '';
    if (requestUrl !== '') {
      let siteData = await lastValueFrom(
        this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
      );

      htmlFile = await this.getSynopsisHtml(siteData, authorizationToken.toString());
    }
    const textFile = await this.getPlainText(authorizationToken.toString());
    // const encodedTextFile = base64.encode(utf8.encode(textFile));

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
      from: 'testingedmail@asdfasdf.com',
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
