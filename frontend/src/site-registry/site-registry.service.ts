import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { PayService } from '../pay/pay.service';

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

  async searchPid(pid: string, token: string, account_id: number): Promise<any> {
    const paymentStatus = await this.payService.createParcelSearchInvoice(token, account_id);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      const requestUrl = `${hostname}:${port}/srsites/searchPid/${pid}`;
      const requestConfig: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      let data = await lastValueFrom(
        this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
      );
      return data;
    } else {
      return { error: 'Status code = ' + paymentStatus };
    }
  }

  async searchCrownPin(pin: string, token: string, account_id: number): Promise<any> {
    const paymentStatus = await this.payService.createPINSearchInvoice(token, account_id);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      const requestUrl = `${hostname}:${port}/srsites/searchCrownPin/${pin}`;
      const requestConfig: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let data = await lastValueFrom(
        this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
      );
      return data;
    } else {
      return { error: 'Status code = ' + paymentStatus };
    }
  }

  async searchCrownFile(crownLandsFileNumber: string, token: string, account_id: number): Promise<any> {
    const paymentStatus = await this.payService.createFileSearchInvoice(token, account_id);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      const requestUrl = `${hostname}:${port}/srsites/searchCrownFile/${crownLandsFileNumber}`;
      const requestConfig: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let data = await lastValueFrom(
        this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
      );
      return data;
    } else {
      return { error: 'Status code = ' + paymentStatus };
    }
  }

  async searchSiteId(siteId: string, token: string, account_id: number): Promise<any> {
    const paymentStatus = await this.payService.createSiteSearchInvoice(token, account_id);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      const requestUrl = `${hostname}:${port}/srsites/searchSiteId/${siteId}`;
      const requestConfig: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let data = await lastValueFrom(
        this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
      );
      return data;
    } else {
      return { error: 'Status code = ' + paymentStatus };
    }
  }

  async searchAddress(address: string, city: string, token: string, account_id: number): Promise<any> {
    const paymentStatus = await this.payService.createAddressSearchInvoice(token, account_id);
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      const requestUrl = `${hostname}:${port}/srsites/searchAddress`;
      let data = await lastValueFrom(
        this.httpService.post(requestUrl, { city: city, address: address }).pipe(map((response) => response.data))
      );
      return data;
    } else {
      return { error: 'Status code = ' + paymentStatus };
    }
  }

  async searchArea(lat: string, lng: string, size: string, token: string, account_id: number): Promise<any> {
    let paymentStatus: string;
    if (size == 'Small') {
      paymentStatus = await this.payService.createSmallAreaSearchInvoice(token, account_id);
    } else if (size == 'Large') {
      paymentStatus = await this.payService.createLargeAreaSearchInvoice(token, account_id);
    } else {
      return { error: 'Area Size Error' };
    }
    if (paymentStatus == 'APPROVED' || paymentStatus == 'PAID' || paymentStatus == 'COMPLETED') {
      const requestUrl = `${hostname}:${port}/srsites/searchArea/${lat}/${lng}/${size}`;
      const requestConfig: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let data = await lastValueFrom(
        this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
      );
      return data;
    } else {
      return { error: 'Status code = ' + paymentStatus };
    }
  }
}
