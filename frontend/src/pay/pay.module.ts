import { Module } from '@nestjs/common';
import { PayService } from './pay.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [PayService],
})
export class PayModule {}
