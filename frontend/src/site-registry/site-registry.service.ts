import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class SiteRegistryService {
  constructor(private httpService: HttpService) {}

  async searchPid(pid: string): Promise<any> {
    // hostname+port change in docker-compose
    const hostname = 'http://localhost';
    const port = '3001';

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
    // hostname+port change in docker-compose
    const hostname = 'http://localhost';
    const port = '3001';

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
    // hostname+port change in docker-compose
    const hostname = 'http://localhost';
    const port = '3001';

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
    // hostname+port change in docker-compose
    const hostname = 'http://localhost';
    const port = '3001';

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

  async searchAddress(address: string): Promise<any> {
    // hostname+port change in docker-compose
    const hostname = 'http://localhost';
    const port = '3001';

    const requestUrl = `${hostname}:${port}/srsites/searchAddress/${address}`;
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
    // hostname+port change in docker-compose
    const hostname = 'http://localhost';
    const port = '3001';

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
