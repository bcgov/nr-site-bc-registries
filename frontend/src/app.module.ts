import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BCRegistryModule } from './bc-registry/bc-registry.module';
import { MapModule } from './map/map.module';
import { SiteRegistryModule } from './site-registry/site-registry.module';

@Module({
  imports: [BCRegistryModule, MapModule, SiteRegistryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
