import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BCRegistryModule } from './bc-registry/bc-registry.module';
import { MapModule } from './map/map.module';
import { SiteRegistryModule } from './site-registry/site-registry.module';
import { PayModule } from './pay/pay.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';
import { SessionModule } from 'nestjs-session';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { UtilsModule } from './utils/utils.module';
import { UtilsService } from './utils/utils.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    HttpModule,
    AuthenticationModule,
    BCRegistryModule,
    MapModule,
    SiteRegistryModule,
    PayModule,
    SessionModule.forRoot({
      session: { secret: process.env.SESSION_SECRET },
    }),
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService, UtilsService],
})
export class AppModule {}
