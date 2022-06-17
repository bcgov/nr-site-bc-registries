import { Controller, Get, Session } from '@nestjs/common';
import { SessionData } from 'utils/types';
import { PayService } from './pay.service';

// this controller is unused right now, will likely delete it so that calls can't be made from outside modules
@Controller('pay')
export class PayController {
  constructor(private payService: PayService) {}

  @Get('createSearchInvoice')
  async createSearchInvoice(@Session() session: { data?: SessionData }): Promise<any> {
    return {
      statusCode: await this.payService.createSearchInvoice(session.data.access_token, session.data.account_id),
    };
  }

  @Get('createSynopsisInvoice')
  async createSynopsisInvoice(@Session() session: { data?: SessionData }): Promise<any> {
    return {
      statusCode: await this.payService.createSynopsisInvoice(session.data.access_token, session.data.account_id),
    };
  }

  @Get('createDetailedInvoice')
  async createDetailedInvoice(@Session() session: { data?: SessionData }): Promise<any> {
    return {
      statusCode: await this.payService.createDetailedInvoice(session.data.access_token, session.data.account_id),
    };
  }
}
