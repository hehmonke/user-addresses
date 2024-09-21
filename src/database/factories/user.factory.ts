import { faker } from '@faker-js/faker/locale/ru';
import { Factory } from '@mikro-orm/seeder';

import { User } from '@features/user/entities';

export class UserFactory extends Factory<User> {
  model = User;

  definition(): Partial<User> {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number({ style: 'international' }),
    };
  }
}
