import { CacheStore, CacheStoreSetOptions } from '@nestjs/cache-manager';
import { Logger } from '@nestjs/common';
import Redis from 'ioredis';

export class RouteCacheAdapter implements CacheStore {
  private readonly logger = new Logger('RouteCacheAdapter');

  constructor(
    private readonly redis: Redis,
    private readonly ttl: number,
  ) {}

  async get<T>(key: string): Promise<T | undefined> {
    this.logger.verbose(`get ${key}`);
    const value = await this.redis.get(this.getKey(key));

    if (value) {
      this.logger.verbose(`found ${key}`);

      return JSON.parse(value);
    }
  }

  async set<T>(key: string, value: T, options?: CacheStoreSetOptions<T> | number): Promise<void> {
    this.logger.verbose(`set ${key}`);
    let ttl = this.ttl;

    if (options) {
      if (typeof options === 'number') {
        ttl = options;
      } else if (typeof options.ttl === 'function') {
        ttl = options.ttl(value);
      } else if (typeof options.ttl === 'number') {
        ttl = options.ttl;
      }
    }

    await this.redis.set(this.getKey(key), JSON.stringify(value), 'EX', ttl);
  }

  async del(key: string): Promise<void> {
    this.logger.verbose(`del ${key}`);
    this.redis.del(this.getKey(key));
  }

  private getKey(key: string): string {
    return `route:${key}`;
  }
}
