import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BCRegistryModule } from './bc-registry/bc-registry.module';
import { MapModule } from './map/map.module';
import { SiteRegistryModule } from './site-registry/site-registry.module';
import { PayModule } from './pay/pay.module';
import { ConfigModule } from '@nestjs/config';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { AuthenticationModule } from './authentication/authentication.module';
import { AppMiddleware } from './app.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthenticationModule,
    BCRegistryModule,
    MapModule,
    SiteRegistryModule,
    PayModule,
    KeycloakConnectModule.register({
      authServerUrl: process.env.KEYCLOAK_BASE_URL,
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      secret: process.env.KEYCLOAK_SECRET,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes(AppController); // only applies when rendering pages for now
  }
}
