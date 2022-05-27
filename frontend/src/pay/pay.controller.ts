import { Controller, Get } from '@nestjs/common';
import { PayService } from './pay.service';

@Controller('pay')
export class PayController {
  constructor(private payService: PayService) {}

  @Get('createInvoice')
  async getInvoice(): Promise<any> {
    return { statusCode: await this.payService.createInvoice() };
  }
}
