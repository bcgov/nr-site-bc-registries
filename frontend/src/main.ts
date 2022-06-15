import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import * as expressSession from 'express-session';
import { Pool } from 'pg';
const pgSession = require('connect-pg-simple')(expressSession);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.useStaticAssets(join(__dirname, '..', '../public'));
  app.setBaseViewsDir(join(__dirname, '..', '../views/pages'));
  hbs.registerPartials(join(__dirname, '..', '../views/partials'));
  hbs.registerPartials(join(__dirname, '..', '../views/layout'));
  app.setViewEngine('hbs');

  const pool = new Pool({
    user: process.env.SESSION_PG_USER,
    host: process.env.SESSION_PG_HOST,
    database: process.env.SESSION_PG_DATABASE,
    password: process.env.SESSION_PG_PASSWORD,
    port: 5432,
  });

  // createTableIfMissing doesn't seem to work
  const postgresStore = new pgSession({
    pool: pool,
    createTableIfMissing: true,
  });

  let sessionOptions: expressSession.SessionOptions;
  if (process.env.site_environment == 'DEVELOPMENT') {
    sessionOptions = {
      store: postgresStore,
      secret: process.env.COOKIE_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 hours - refresh token duration
    };
  } else {
    // secure: true seems to hide the cookie from the user and create a new session on every request...
    sessionOptions = {
      store: postgresStore,
      secret: process.env.COOKIE_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 8 * 60 * 60 * 1000, secure: true }, // 8 hours - refresh token duration
    };
  }
  app.use(expressSession(sessionOptions));

  await app.listen(3000);
}
bootstrap();
