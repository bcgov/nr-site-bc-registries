import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import * as expressSession from 'express-session';
import { Pool, Client } from 'pg';
import { AppService } from './app.service';
const pgSession = require('connect-pg-simple')(expressSession);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.useStaticAssets(join(__dirname, '..', '../public'));
  app.setBaseViewsDir(join(__dirname, '..', '../views/pages'));
  hbs.registerPartials(join(__dirname, '..', '../views/partials'));
  hbs.registerPartials(join(__dirname, '..', '../views/layout'));
  app.setViewEngine('hbs');

  const client = new Client({
    user: process.env.SESSION_PG_USER,
    host: process.env.SESSION_PG_HOST,
    database: process.env.SESSION_PG_DATABASE,
    password: process.env.SESSION_PG_PASSWORD,
    port: 5432,
  });

  await client.connect();
  // await client.query(`DROP DATABASE IF EXISTS ${process.env.SESSION_PG_DATABASE}`);

  // this query deletes and remakes the session database on every reload
  await client.query(`DROP TABLE IF EXISTS "session";`);
  await client.query(`
    CREATE TABLE "session" (
      "sid" varchar NOT NULL COLLATE "default",
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL
    )
    WITH (OIDS=FALSE);
    ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
    CREATE INDEX "IDX_session_expire" ON "session" ("expire");
  `);

  // this query retains the session database between reloads
  // await client.query(`
  //   CREATE OR REPLACE FUNCTION create_if_not_exists (table_name text, create_stmt text)
  //   RETURNS text AS
  //   $_$
  //   BEGIN

  //   IF EXISTS (
  //       SELECT *
  //       FROM   pg_catalog.pg_tables
  //       WHERE    tablename  = table_name
  //       ) THEN
  //     RETURN 'TABLE ' || '''' || table_name || '''' || ' ALREADY EXISTS';
  //   ELSE
  //     EXECUTE create_stmt;
  //     RETURN 'CREATED';
  //   END IF;

  //   END;
  //   $_$ LANGUAGE plpgsql;

  //   SELECT create_if_not_exists('session', '
  //       CREATE TABLE  public.session (
  //       sid varchar NOT NULL COLLATE "default",
  //       sess json NOT NULL,
  //       expire timestamp(6) NOT NULL
  //     )
  //     WITH (OIDS=FALSE);
  //     ALTER TABLE session ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;
  //     CREATE INDEX IDX_session_expire ON session (expire);'
  //   );
  // `);
  await client.end();

  const pool = new Pool({
    user: process.env.SESSION_PG_USER,
    host: process.env.SESSION_PG_HOST,
    database: process.env.SESSION_PG_DATABASE,
    password: process.env.SESSION_PG_PASSWORD,
    port: 5432,
  });

  const postgresStore = new pgSession({
    pool: pool,
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

  const appService = app.get(AppService);
  await appService.initDownloadDate();
}
bootstrap();
