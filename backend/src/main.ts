import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Users example')
    .setDescription('The user API description')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // local development backend port is 3001, docker backend port is 3000
  const port = process.env.POSTGRESQL_HOST.includes('database') ? 3000 : 3001;
  await app.listen(port);
  const appService = app.get(AppService);
  await appService.initializeDb();
}
bootstrap();
