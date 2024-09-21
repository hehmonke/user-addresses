import { Entity, ManyToOne, Ref, Unique } from '@mikro-orm/core';

import { PropertyEnum } from '@common/decorators';
import { Address } from '@features/address/entities';
import { User } from '@features/user/entities';
import { AddressType } from '@features/user/enums';

@Entity()
@Unique<UserToAddress>({ properties: ['user', 'type'] })
export class UserToAddress {
  @ManyToOne(() => User, { primary: true, ref: true })
  user!: Ref<User>;

  @ManyToOne(() => Address, { primary: true, ref: true })
  address!: Ref<Address>;

  @PropertyEnum(() => AddressType, { nativeEnumName: 'address_type' })
  type!: AddressType;
}
