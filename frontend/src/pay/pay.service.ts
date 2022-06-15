import { Injectable } from '@nestjs/common';
var axios = require('axios');

@Injectable()
export class PayService {
  async createInvoice(token: string, account_id: number): Promise<string> {
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
        'Account-Id': account_id,
        'x-apikey': process.env.KEYCLOAK_XAPIKEY,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
