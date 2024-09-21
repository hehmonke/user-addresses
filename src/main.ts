import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ENV, ENV_DEFAULTS, NodeEnv } from '@common/constants';

import { version } from '../package.json';

import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  app.enableShutdownHooks();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const config = new DocumentBuilder()
    .setTitle('User Addresses backend')
    .setDescription('The User Addresses API description')
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<string>(ENV.PORT, ENV_DEFAULTS.PORT);
  const host = configService.get<string>(ENV.HOST, ENV_DEFAULTS.HOST);

  await app.startAllMicroservices();
  await app.listen(+port, host);

  if (configService.get(ENV.NODE_ENV, ENV_DEFAULTS.NODE_ENV) === NodeEnv.Development) {
    Logger.log(`Swagger url: http://${host}:${port}/swagger`);
  }
}

bootstrap()
  .then(() => Logger.log('started', 'bootstrap'))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
