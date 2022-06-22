import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from '../authentication/authentication.module';
import { PayService } from '../pay/pay.service';
import { UtilsService } from '../utils/utils.service';
import { BCRegistryController } from './bc-registry.controller';
import { BCRegistryService } from './bc-registry.service';

@Module({
  imports: [HttpModule, AuthenticationModule, ConfigModule.forRoot()],
  controllers: [BCRegistryController],
  providers: [BCRegistryService, PayService, UtilsService],
})
export class BCRegistryModule {}
