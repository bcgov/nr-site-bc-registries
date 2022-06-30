import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';

let downloadDate: string;
let requestUrl: string;
let requestConfig: AxiosRequestConfig;

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {
    const hostname = process.env.BACKEND_URL ? process.env.BACKEND_URL : `http://localhost`;
    const port = process.env.BACKEND_URL ? 3000 : 3001;
    requestUrl = `${hostname}/srdates/`;
    requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  getHello(): string {
    return 'Hello World!';
  }

  // this runs on startup
  async initDownloadDate(): Promise<void> {
    await this.refreshDownloadDate();
  }

  @Cron('0 0 0 * * *')
  async refreshDownloadDate() {
    downloadDate = await lastValueFrom(
      this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
    );
  }

  getDownloadDate(): string {
    return downloadDate;
  }
}
