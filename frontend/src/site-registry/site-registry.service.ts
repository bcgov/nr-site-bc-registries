import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { PayService } from 'src/pay/pay.service';

let hostname: string;
let port: number;

@Injectable()
export class SiteRegistryService {
  constructor(
    private httpService: HttpService,
    private payService: PayService
  ) {
    // docker hostname is the container name, use localhost for local development
    hostname = process.env.BACKEND_URL ? process.env.BACKEND_URL : `http://localhost`;
    // local development backend port is 3001, docker backend port is 3000
    port = process.env.BACKEND_URL ? 3000 : 3001;
  }

  async searchPid(pid: string, token: string, account_id: number, folioNumber: string): Promise<any> {
    // Parcel ID searches are now free - no payment required
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
  }

  async searchCrownPin(pin: string, token: string, account_id: number, folioNumber: string): Promise<any> {
    // Crown Lands PIN searches are now free - no payment required
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
  }

  async searchCrownFile(
    crownLandsFileNumber: string,
    token: string,
    account_id: number,
    folioNumber: string
  ): Promise<any> {
    // Crown Lands File # searches are now free - no payment required
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
  }

  async searchSiteId(siteId: string, token: string, account_id: number, folioNumber: string): Promise<any> {
    // Site ID searches are now free - no payment required
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
  }

  async searchAddress(
    address: string,
    city: string,
    token: string,
    account_id: number,
    folioNumber: string
  ): Promise<any> {
    // Address searches are now free - no payment required
    const requestUrl = `${hostname}:${port}/srsites/searchAddress`;
    const data = await lastValueFrom(
      this.httpService.post(requestUrl, { city: city, address: address }).pipe(map((response) => response.data))
    );
    return data;
  }

  async searchArea(
    lat: string,
    lng: string,
    size: string,
    token: string,
    account_id: number,
    folioNumber: string
  ): Promise<any> {
    // Area searches are now free - no payment required
    if (size !== 'Small' && size !== 'Large') {
      return { error: 'Area Size Error' }; // should never reach here
    }

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
  }
}
