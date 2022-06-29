import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import path, { join, resolve } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import * as expressSession from 'express-session';
import { AppService } from './app.service';
const fileSession = require('session-file-store')(expressSession);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.useStaticAssets(join(__dirname, '..', '../public'));
  app.setBaseViewsDir(join(__dirname, '..', '../views/pages'));
  hbs.registerPartials(join(__dirname, '..', '../views/partials'));
  hbs.registerPartials(join(__dirname, '..', '../views/layout'));
  app.setViewEngine('hbs');

  let sessionOptions: expressSession.SessionOptions;
  sessionOptions = {
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new fileSession({ path: resolve("./", process.env.SESSION_PATH) }),
    cookie: { maxAge: 3600000, secure: false, httpOnly: true },
  };

  app.use(expressSession(sessionOptions));

  await app.listen(3000);

  const appService = app.get(AppService);
  await appService.initDownloadDate();
}
bootstrap();
