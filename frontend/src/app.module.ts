import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BCRegistryModule } from './bc-registry/bc-registry.module';
import { MapModule } from './map/map.module';

@Module({
  imports: [BCRegistryModule, MapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
