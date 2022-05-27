import { Injectable } from '@nestjs/common';
var axios = require('axios');

@Injectable()
export class PayService {
  async createInvoice(): Promise<any> {
    // test api data
    var data = JSON.stringify({
      filingInfo: {
        filingTypes: [
          {
            priority: true,
            futureEffective: false,
            filingTypeCode: 'BCINC',
          },
        ],
      },
      businessInfo: {
        corpType: 'BC',
        businessIdentifier: 'BC1000000',
      },
    });

    var config = {
      method: 'post',
      url: process.env.baseUrl,
      headers: {
        Accept: 'application/json',
        Prefer: 'example=/api/v1/payment-requests',
        'Account-Id': process.env.account_id,
        'x-apikey': process.env.apikey,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    return axios(config)
      .then((response) => response.data.statusCode)
      .catch(function (error) {
        console.log(error);
      });
  }
}
