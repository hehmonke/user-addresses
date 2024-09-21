import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModuleOptions, RedisOptionsFactory } from '@songkeys/nestjs-redis';

import { ENV } from '@common/constants';

@Injectable()
export class RedisConfiguration implements RedisOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createRedisOptions(): RedisModuleOptions {
    return {
      closeClient: true,
      readyLog: true,
      errorLog: true,
      config: {
        host: this.configService.getOrThrow(ENV.REDIS_HOST),
        port: +this.configService.getOrThrow(ENV.REDIS_PORT),
        password: this.configService.get(ENV.REDIS_PASSWORD),
      },
    };
  }
}
