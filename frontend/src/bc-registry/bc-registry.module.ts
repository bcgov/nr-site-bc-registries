import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PayService } from 'src/pay/pay.service';
import { BCRegistryController } from './bc-registry.controller';
import { BCRegistryService } from './bc-registry.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [BCRegistryController],
  providers: [BCRegistryService, PayService],
})
export class BCRegistryModule {}
