import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

let ESRA_PARCEL_SRCH: string;
let ESRA_PIN_SRCH: string;
let ESRA_FILE_SRCH: string;
let ESRA_SITE_SRCH: string;
let ESRA_AREA_SRCH_SM: string;
let ESRA_AREA_SRCH_LG: string;
let ESRA_ADDRESS_SRCH: string;
let ESRA_DTL_RPT: string;
let ESRA_SYN_RPT: string;

@Injectable()
export class PayService {
  constructor() {
    ESRA_PARCEL_SRCH = 'BCINC';
    ESRA_SITE_SRCH = 'BCINC';
    ESRA_AREA_SRCH_SM = 'BCINC';
    ESRA_AREA_SRCH_LG = 'BCINC';
    // ESRA_PARCEL_SRCH = 'ESRA_PARCEL_SRCH';
    // ESRA_SITE_SRCH = 'ESRA_SITE_SRCH';
    // ESRA_AREA_SRCH_SM = 'ESRA_AR_SRCH_SM';
    // ESRA_AREA_SRCH_LG = 'ESRA_AR_SRCH_LG';
    ESRA_PIN_SRCH = 'BCINC';
    ESRA_FILE_SRCH = 'BCINC';
    ESRA_ADDRESS_SRCH = 'BCINC';
    ESRA_DTL_RPT = 'BCINC';
    ESRA_SYN_RPT = 'BCINC';
  }

  async createParcelSearchInvoice(token: string, account_id: number) {
    return this.createInvoice(token, account_id, ESRA_PARCEL_SRCH);
  }

  async createPINSearchInvoice(token: string, account_id: number) {
    return this.createInvoice(token, account_id, ESRA_PIN_SRCH);
  }

  async createFileSearchInvoice(token: string, account_id: number) {
    return this.createInvoice(token, account_id, ESRA_FILE_SRCH);
  }

  async createSiteSearchInvoice(token: string, account_id: number) {
    return this.createInvoice(token, account_id, ESRA_SITE_SRCH);
  }

  async createSmallAreaSearchInvoice(token: string, account_id: number) {
    return this.createInvoice(token, account_id, ESRA_AREA_SRCH_SM);
  }

  async createLargeAreaSearchInvoice(token: string, account_id: number) {
    return this.createInvoice(token, account_id, ESRA_AREA_SRCH_LG);
  }

  async createAddressSearchInvoice(token: string, account_id: number) {
    return this.createInvoice(token, account_id, ESRA_ADDRESS_SRCH);
  }

  async createSynopsisInvoice(token: string, account_id: number) {
    return this.createInvoice(token, account_id, ESRA_DTL_RPT);
  }

  async createDetailedInvoice(token: string, account_id: number) {
    return this.createInvoice(token, account_id, ESRA_SYN_RPT);
  }

  async createInvoice(token: string, account_id: number, filingTypeCode: string): Promise<string> {
    // send the request to pay api to create the invoice
    const data = JSON.stringify({
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

    const config = {
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
