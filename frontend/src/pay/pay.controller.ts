import { Controller, Get, Session } from '@nestjs/common';
import { SessionData } from 'utils/types';
import { PayService } from './pay.service';

@Controller('pay')
export class PayController {
  constructor(private payService: PayService) {}

  @Get('createInvoice')
  async getInvoice(@Session() session: { data?: SessionData }): Promise<any> {
    return { statusCode: await this.payService.createInvoice(session.data.access_token, session.data.account_id) };
  }
}
