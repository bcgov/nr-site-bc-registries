import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import * as dotenv from 'dotenv';
import { lastValueFrom, map } from 'rxjs';

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
    return { xd: 'hello' };
  }
}
