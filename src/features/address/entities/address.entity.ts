import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { uuidv7 } from 'uuidv7';

import { UserToAddress } from '@features/user/entities';

@Entity()
export class Address {
  @PrimaryKey({ type: 'uuid', onCreate: () => uuidv7() })
  id!: string;

  @Property({ type: 'varchar', length: 300 })
  city!: string;

  @Property({ type: 'varchar', length: 300 })
  street!: string;

  @Property({ type: 'int' })
  houseNumber!: number;

  @OneToMany(() => UserToAddress, (e) => e.address, { orphanRemoval: true })
  users = new Collection<UserToAddress>(this);
}
