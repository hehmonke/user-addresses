import { Collection, Entity, Index, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { uuidv7 } from 'uuidv7';

import { UserToAddress } from './user-to-address.entity';

@Entity()
@Index<User>({ properties: ['firstName', 'lastName'] })
export class User {
  @PrimaryKey({ type: 'uuid', onCreate: () => uuidv7() })
  id!: string;

  @Property({ type: 'varchar', length: 300 })
  firstName!: string;

  @Property({ type: 'varchar', length: 300 })
  lastName!: string;

  @Index()
  @Property({ type: 'varchar' })
  email!: string;

  @Property({ type: 'varchar' })
  phoneNumber!: string;

  @OneToMany(() => UserToAddress, (e) => e.user, { orphanRemoval: true })
  addresses = new Collection<UserToAddress>(this);
}
