import { Injectable } from '@nestjs/common';
import { CronService } from './cron/cron.service';

@Injectable()
export class AppService {
  constructor(private cronService: CronService) {}
  getHello(): string {
    return 'Hello Backend!';
  }

  // runs on app startup: if there is no sites data in the database this will get new data, otherwise it will do nothing
  async initializeDb() {
    await this.cronService.initTablesData();
  }
}
