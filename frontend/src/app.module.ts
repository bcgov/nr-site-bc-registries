import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BCRegistryModule } from './bc-registry/bc-registry.module';
import { MapModule } from './map/map.module';
import { SiteRegistryModule } from './site-registry/site-registry.module';
import { PayModule } from './pay/pay.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), BCRegistryModule, MapModule, SiteRegistryModule, PayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
