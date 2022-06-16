import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';

let hostname: string;
let port: number;

@Injectable()
export class SiteRegistryService {
  constructor(private httpService: HttpService) {
    // docker hostname is the container name, use localhost for local development
    hostname = process.env.BACKEND_URL ? `http://${process.env.BACKEND_URL}` : `http://localhost`;
    // local development backend port is 3001, docker backend port is 3000
    port = process.env.BACKEND_URL ? 3000 : 3001;
  }

  async searchPid(pid: string): Promise<any> {
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
  }

  async searchCrownPin(pin: string): Promise<any> {
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
  }

  async searchCrownFile(crownLandsFileNumber: string): Promise<any> {
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
  }

  async searchSiteId(siteId: string): Promise<any> {
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
  }

  async searchAddress(address: string, city: string): Promise<any> {
    const requestUrl = `${hostname}:${port}/srsites/searchAddress/${address}/${city}`;
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let data = await lastValueFrom(
      this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
    );
    return data;
  }

  async searchArea(lat: string, lng: string, size: string): Promise<any> {
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
  }
}
