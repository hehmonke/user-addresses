import { MikroOrmModuleOptions, MikroOrmOptionsFactory } from '@mikro-orm/nestjs';
import { FlushMode, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ENV, ENV_DEFAULTS, NodeEnv } from '@common/constants';
import { Address } from '@features/address/entities';
import { User } from '@features/user/entities';

@Injectable()
export class MikroOrmConfiguration implements MikroOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMikroOrmOptions(contextName?: string): MikroOrmModuleOptions<PostgreSqlDriver> {
    const isProduction = this.configService.get(ENV.NODE_ENV, ENV_DEFAULTS.NODE_ENV) === NodeEnv.Production;
    const isDevelopment = this.configService.get(ENV.NODE_ENV, ENV_DEFAULTS.NODE_ENV) === NodeEnv.Development;
    const logger = new Logger('MikroORM');

    if (isProduction) {
      process.env['MIKRO_ORM_NO_COLOR'] = 'true';
    }

    return {
      driver: PostgreSqlDriver,
      dbName: this.configService.getOrThrow(ENV.DB_NAME),
      user: this.configService.getOrThrow(ENV.DB_USER),
      host: this.configService.getOrThrow(ENV.DB_HOST),
      port: +this.configService.getOrThrow(ENV.DB_PORT),
      password: this.configService.getOrThrow(ENV.DB_PASSWORD),
      debug: this.configService.get(ENV.DB_LOGGING, ENV_DEFAULTS.DB_LOGGING) === 'true',
      entities: [Address, User],
      registerRequestContext: true,
      findOneOrFailHandler: (entityName) => new NotFoundException(`${entityName} not found`),
      logger: (message): void => logger.log(message),
      highlighter: isDevelopment ? new SqlHighlighter() : undefined,
      flushMode: FlushMode.COMMIT,
      ensureDatabase: false,
      persistOnCreate: true,
      discovery: {
        disableDynamicFileAccess: true,
      },
    };
  }
}
