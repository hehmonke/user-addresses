import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { ConflictException, Injectable } from '@nestjs/common';

import { User, UserToAddress } from '@features/user/entities';
import { UserCreate, UserUpdate } from '@features/user/interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: EntityRepository<User>,
  ) {}

  async findOneByIdOrFail(id: string): Promise<User> {
    return this.userEntityRepository.findOneOrFail(id);
  }

  async searchByName(name: string, limit = 20): Promise<User[]> {
    return this.userEntityRepository.find(
      {
        $or: [
          { firstName: { $ilike: `%${name.toLowerCase()}%` } },
          { lastName: { $ilike: `%${name.toLowerCase()}%` } },
        ],
      },
      { limit },
    );
  }

  async searchByEmail(email: string, limit = 20): Promise<User[]> {
    return this.userEntityRepository.find({ email: { $like: `%${email.toLowerCase()}%` } }, { limit });
  }

  async create({ addresses, ...data }: UserCreate): Promise<User> {
    const user = this.userEntityRepository.create({
      ...data,
      email: data.email.toLowerCase(),
    });

    user.addresses.set(
      addresses.map((address) => {
        return this.userEntityRepository.getEntityManager().create(UserToAddress, {
          user,
          address: address.id,
          type: address.type,
        });
      }),
    );

    try {
      await this.userEntityRepository.getEntityManager().flush();
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException) {
        throw new ConflictException('only 1 address with one type allowed');
      }

      throw error;
    }

    return user;
  }

  async update(user: User, { addresses, ...data }: UserUpdate): Promise<User> {
    await user.addresses.init();

    this.userEntityRepository.assign(user, {
      ...data,
      email: data.email.toLowerCase(),
    });

    user.addresses.set(
      addresses.map((address) => {
        return this.userEntityRepository.getEntityManager().create(UserToAddress, {
          user,
          address: address.id,
          type: address.type,
        });
      }),
    );

    try {
      await this.userEntityRepository.getEntityManager().flush();
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException) {
        throw new ConflictException('only 1 address with one type allowed');
      }

      throw error;
    }

    return user;
  }

  async delete(user: User): Promise<void> {
    await this.userEntityRepository.getEntityManager().transactional(async () => {
      await this.userEntityRepository.getEntityManager().nativeDelete(UserToAddress, { user });
      await this.userEntityRepository.nativeDelete(user.id);
    });
  }

  async populateAddresses(users: User | User[]): Promise<void> {
    await this.userEntityRepository.populate(users, ['addresses', 'addresses.address']);
  }
}
