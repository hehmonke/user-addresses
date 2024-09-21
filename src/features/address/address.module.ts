import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { AddressesController } from '@features/address/controllers';
import { Address } from '@features/address/entities';
import { AddressService } from '@features/address/services';

@Module({
  imports: [MikroOrmModule.forFeature([Address])],
  controllers: [AddressesController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
