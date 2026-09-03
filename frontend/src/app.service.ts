import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';

let downloadDate: string;
let requestUrl: string;
let requestConfig: AxiosRequestConfig;

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private httpService: HttpService) {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    requestUrl = `${backendUrl}/srdates/`;
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
    try {
      downloadDate = await lastValueFrom(
        this.httpService.get(requestUrl, requestConfig).pipe(map((response) => response.data))
      );
    } catch (error) {
      // Backend may not be reachable yet at startup, or briefly during a
      // restart; don't let that take down the whole app. The daily cron
      // will retry, and getDownloadDate() callers already handle undefined.
      this.logger.warn(`Failed to refresh download date from ${requestUrl}: ${error.message}`);
    }
  }

  getDownloadDate(): string {
    return downloadDate;
  }
}
