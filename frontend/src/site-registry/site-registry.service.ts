import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { PayService } from 'src/pay/pay.service';

let hostname: string;
let port: number;

@Injectable()
export class SiteRegistryService {
  constructor(private httpService: HttpService, private payService: PayService) {
    // docker hostname is the container name, use localhost for local development
    hostname = process.env.BACKEND_URL ? process.env.BACKEND_URL : `http://localhost`;
    // local development backend port is 3001, docker backend port is 3000
    port = process.env.BACKEND_URL ? 3000 : 3001;
  }

  async searchPid(pid: string, token: string, account_id: number, folioNumber: string): Promise<any> {
    const paymentStatus = await this.payService.createParcelSearchInvoice(token, account_id, folioNumber);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      const requestUrl = `${hostname}:${port}/srsites/searchPid/${pid}`;
      const requestConfig: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const data = await lastValueFrom(
        this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
      );
      return data;
    } else {
      return { error: 'Status code = ' + paymentStatus + '.  Please ensure that you have a premium account selected.' };
    }
  }

  async searchCrownPin(pin: string, token: string, account_id: number, folioNumber: string): Promise<any> {
    const paymentStatus = await this.payService.createPINSearchInvoice(token, account_id, folioNumber);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      const requestUrl = `${hostname}:${port}/srsites/searchCrownPin/${pin}`;
      const requestConfig: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const data = await lastValueFrom(
        this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
      );
      return data;
    } else {
      return { error: 'Status code = ' + paymentStatus + '.  Please ensure that you have a premium account selected.' };
    }
  }

  async searchCrownFile(
    crownLandsFileNumber: string,
    token: string,
    account_id: number,
    folioNumber: string
  ): Promise<any> {
    const paymentStatus = await this.payService.createFileSearchInvoice(token, account_id, folioNumber);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      const requestUrl = `${hostname}:${port}/srsites/searchCrownFile/${encodeURIComponent(crownLandsFileNumber)}`;
      const requestConfig: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const data = await lastValueFrom(
        this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
      );
      return data;
    } else {
      return { error: 'Status code = ' + paymentStatus + '.  Please ensure that you have a premium account selected.' };
    }
  }

  async searchSiteId(siteId: string, token: string, account_id: number, folioNumber: string): Promise<any> {
    const paymentStatus = await this.payService.createSiteSearchInvoice(token, account_id, folioNumber);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      const requestUrl = `${hostname}:${port}/srsites/searchSiteId/${siteId}`;
      const requestConfig: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const data = await lastValueFrom(
        this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
      );
      return data;
    } else {
      return { error: 'Status code = ' + paymentStatus + '.  Please ensure that you have a premium account selected.' };
    }
  }

  async searchAddress(
    address: string,
    city: string,
    token: string,
    account_id: number,
    folioNumber: string
  ): Promise<any> {
    const paymentStatus = await this.payService.createAddressSearchInvoice(token, account_id, folioNumber);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      const requestUrl = `${hostname}:${port}/srsites/searchAddress`;
      const data = await lastValueFrom(
        this.httpService.post(requestUrl, { city: city, address: address }).pipe(map((response) => response.data))
      );
      return data;
    } else {
      return { error: 'Status code = ' + paymentStatus + '.  Please ensure that you have a premium account selected.' };
    }
  }

  async searchArea(
    lat: string,
    lng: string,
    size: string,
    token: string,
    account_id: number,
    folioNumber: string
  ): Promise<any> {
    let paymentStatus: string;
    if (size == 'Small') {
      paymentStatus = await this.payService.createSmallAreaSearchInvoice(token, account_id, folioNumber);
    } else if (size == 'Large') {
      paymentStatus = await this.payService.createLargeAreaSearchInvoice(token, account_id, folioNumber);
    } else {
      return { error: 'Area Size Error' }; // should never reach here
    }
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      const requestUrl = `${hostname}:${port}/srsites/searchArea/${lat}/${lng}/${size}`;
      const requestConfig: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const data = await lastValueFrom(
        this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
      );
      return data;
    } else {
      return { error: 'Status code = ' + paymentStatus + '.  Please ensure that you have a premium account selected.' };
    }
  }
}
