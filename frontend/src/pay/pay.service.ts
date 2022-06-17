import { Injectable } from '@nestjs/common';
var axios = require('axios');

let FILING_TYPE_CODE_1: string;
let FILING_TYPE_CODE_2: string;
let FILING_TYPE_CODE_3: string;

@Injectable()
export class PayService {
  constructor() {
    FILING_TYPE_CODE_1 = 'BCINC'; // search
    FILING_TYPE_CODE_2 = 'BCINC'; // synopsis
    FILING_TYPE_CODE_3 = 'BCINC'; // detailed
  }

  async createSearchInvoice(token: string, account_id: number) {
    return this.createInvoice(token, account_id, FILING_TYPE_CODE_1);
  }

  async createSynopsisInvoice(token: string, account_id: number) {
    return this.createInvoice(token, account_id, FILING_TYPE_CODE_2);
  }

  async createDetailedInvoice(token: string, account_id: number) {
    return this.createInvoice(token, account_id, FILING_TYPE_CODE_3);
  }

  async createInvoice(token: string, account_id: number, filingTypeCode: string): Promise<string> {
    // send the request to pay api to create the invoice
    var data = JSON.stringify({
      filingInfo: {
        filingTypes: [
          {
            priority: true,
            futureEffective: false,
            filingTypeCode: filingTypeCode,
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
