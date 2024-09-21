import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@songkeys/nestjs-redis';

import { CacheConfiguration } from '@configurations/cache.configuration';
import { MikroOrmConfiguration } from '@configurations/mikro-orm.configuration';
import { RedisConfiguration } from '@configurations/redis.configuration';
import { AddressModule } from '@features/address/address.module';
import { UserModule } from '@features/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MikroOrmModule.forRootAsync({
      useClass: MikroOrmConfiguration,
    }),
    RedisModule.forRootAsync({
      useClass: RedisConfiguration,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheConfiguration,
    }),
    AddressModule,
    UserModule,
  ],
})
export class AppModule {}
