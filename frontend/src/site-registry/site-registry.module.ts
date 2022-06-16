import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { PayService } from 'src/pay/pay.service';
import { SiteRegistryController } from './site-registry.controller';
import { SiteRegistryService } from './site-registry.service';

@Module({
  imports: [HttpModule, AuthenticationModule],
  controllers: [SiteRegistryController],
  providers: [SiteRegistryService, PayService],
})
export class SiteRegistryModule {}
