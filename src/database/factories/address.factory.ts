import { faker } from '@faker-js/faker/locale/ru';
import { Factory } from '@mikro-orm/seeder';

import { Address } from '@features/address/entities';

export class AddressFactory extends Factory<Address> {
  model = Address;

  definition(): Partial<Address> {
    return {
      city: faker.location.city(),
      street: faker.location.street(),
      houseNumber: faker.number.int({ max: 2147483646 }),
    };
  }
}
