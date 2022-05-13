import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import * as dotenv from 'dotenv';
import { lastValueFrom, map } from 'rxjs';
import { siteDto } from 'utils/types';
import {
  templateBase64,
  testData,
  testTemplate,
  testTemplateData,
} from 'utils/constants';
import * as base64 from 'base-64';
import * as utf8 from 'utf8';
var axios = require('axios');
import * as fs from 'fs';

dotenv.config();

const authoriationToken: string = '';

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
        }),
      ),
    );

    const responseData = await lastValueFrom(
      this.httpService.post(requestUrl, data, requestConfig).pipe(
        map((response) => {
          console.log('Post request');
          console.log(response.data);
          return response.data;
        }),
      ),
    );
    return { xd: 'hello' };
  }

  async getDocument(): Promise<{ xd: string }> {
    const htmlData = await this.getHtml();

    let utfHtmlData = utf8.encode(htmlData);
    let encodedHtmlData = base64.encode(utfHtmlData);

    const mailData = JSON.stringify({
      attachments: [
        {
          content: `${encodedHtmlData}`,
          contentType: 'string',
          encoding: 'base64',
          filename: 'testfile.pdf',
        },
      ],
      bodyType: 'html',
      body: `hello`,
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
          to: ['mike.smash21@gmail.com'],
        },
      ],
      encoding: 'utf-8',
      from: 'mike.smash21@gmail.com',
      priority: 'normal',
      subject: 'Hello {{ someone }}',
    });

    var emailConfig = {
      method: 'post',
      url: 'https://ches-dev.apps.silver.devops.gov.bc.ca/api/v1/emailMerge',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authoriationToken}`,
      },
      data: mailData,
    };

    axios(emailConfig)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    return { xd: 'hello' };
  }

  // sends preset data + base64 encoded html template and returns an html document with the data inserted
  async getHtml(): Promise<string> {
    let htmlData: string;

    var data = testData;

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
        content: `${templateBase64}`,
      },
    });

    var config = {
      method: 'post',
      url: 'https://cdogs-dev.apps.silver.devops.gov.bc.ca/api/v2/template/render',
      headers: {
        Authorization: `Bearer ${authoriationToken}`,
        'Content-Type': 'application/json',
      },
      data: md,
    };

    await axios(config)
      .then(function (response) {
        htmlData = response.data;
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    return htmlData;
  }

  // async getPdf(): Promise<string> {
  async getPdf(): Promise<{ xd: string }> {
    let pdfData: string;

    var data = testData;

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
        content: `${templateBase64}`,
        encodingType: 'base64',
        fileType: 'html',
      },
    });

    var config = {
      method: 'post',
      url: 'https://cdogs-dev.apps.silver.devops.gov.bc.ca/api/v2/template/render',
      headers: {
        Authorization: `Bearer ${authoriationToken}`,
        'Content-Type': 'application/json',
      },
      data: md,
    };

    await axios(config)
      .then(function (response) {
        pdfData = response.data;
        fs.writeFile('utils/test-report.pdf', pdfData, () => {});
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    // fs.writeFile('utils/test-report.pdf', pdfData, () => {});
    // return pdfData;
    return { xd: 'hello' };
  }
}
