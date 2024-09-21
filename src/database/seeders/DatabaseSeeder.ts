import { faker } from '@faker-js/faker/locale/ru';
import { Seeder } from '@mikro-orm/seeder';

import { UserToAddress } from '@features/user/entities';
import { AddressType } from '@features/user/enums';

import { AddressFactory } from '../factories/address.factory';
import { UserFactory } from '../factories/user.factory';

import type { EntityManager } from '@mikro-orm/core';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const userFactory = new UserFactory(em);
    const addressFactory = new AddressFactory(em);

    const users = await userFactory.create(500_000);
    const addresses = await addressFactory.create(500_000);

    for (const user of users) {
      const addressesNumber = faker.number.int({ min: 0, max: 2 });

      if (addressesNumber === 1) {
        const address = addresses.at(faker.number.int({ min: 0, max: addresses.length - 1 }))!;
        em.getRepository(UserToAddress).create({
          user,
          address,
          type: AddressType.Home,
        });
      } else if (addressesNumber === 2) {
        const addressHome = addresses.at(faker.number.int({ min: 0, max: addresses.length - 1 }))!;
        em.getRepository(UserToAddress).create({
          user,
          address: addressHome,
          type: AddressType.Home,
        });
        const addressWork = addresses.at(faker.number.int({ min: 0, max: addresses.length - 1 }))!;
        em.getRepository(UserToAddress).create({
          user,
          address: addressWork,
          type: AddressType.Work,
        });
      }
    }

    await em.flush();
  }
}
