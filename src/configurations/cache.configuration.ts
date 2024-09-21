import { CacheOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRedis } from '@songkeys/nestjs-redis';
import Redis from 'ioredis';

import { RouteCacheAdapter } from '@common/adapters';

@Injectable()
export class CacheConfiguration implements CacheOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  createCacheOptions(): CacheOptions {
    return {
      store: new RouteCacheAdapter(this.redis, 10),
    };
  }
}
