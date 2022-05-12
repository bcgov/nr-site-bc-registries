import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import * as dotenv from 'dotenv';
import { lastValueFrom, map } from 'rxjs';
import { siteDto } from 'utils/types';

dotenv.config();

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
    const requestUrl = `http://backend:3000/sites/`;
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const data: siteDto = {
      docid: 2,
      site_id: 1,
      siteid: 1,
      catid: 1,
      sequenceno: 1,
      pin: 1,
      pidno: 1,
      eventid: 1,
      associatedsiteid: 1,
      participant_id: 1,
      participantid: 1,
      questionid: 1,
      parentid: 1,
      ownerid: 1,
      contactid: 1,
      completorid: 1,
      aec_id: 1,
      lat: 1,
      latdeg: 1,
      latmin: 1,
      latsec: 1,
      lon: 1,
      londeg: 1,
      lonmin: 1,
      lonsec: 1,
      regdate: new Date(),
      eventdate: new Date(),
      approval_date: new Date(),
      moddate: new Date(),
      tombdate: new Date(),
      effectivedate: new Date(),
      enddate: new Date(),
      datenoted: new Date(),
      date_completed: new Date(),
      expirydate: new Date(),
      datecompleted: new Date(),
      datereceived: new Date(),
      datelocalauthority: new Date(),
      dateregistrar: new Date(),
      datedecision: new Date(),
      dateentered: new Date(),
      submissiondate: new Date(),
      documentdate: new Date(),
    };

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
}
