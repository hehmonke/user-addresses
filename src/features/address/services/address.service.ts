import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, ForeignKeyConstraintViolationException } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';

import { Address } from '@features/address/entities';
import { AddressCreate, AddressUpdate } from '@features/address/interfaces';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressEntityRepository: EntityRepository<Address>,
  ) {}

  async findOneByIdOrFail(id: string): Promise<Address> {
    return this.addressEntityRepository.findOneOrFail(id);
  }

  async create(data: AddressCreate): Promise<Address> {
    const address = this.addressEntityRepository.create(data);
    await this.addressEntityRepository.getEntityManager().flush();

    return address;
  }

  async update(address: Address, data: AddressUpdate): Promise<Address> {
    this.addressEntityRepository.assign(address, data);
    await this.addressEntityRepository.getEntityManager().flush();

    return address;
  }

  async delete(address: Address): Promise<void> {
    this.addressEntityRepository.getEntityManager().remove(address);

    try {
      await this.addressEntityRepository.getEntityManager().flush();
    } catch (error) {
      if (error instanceof ForeignKeyConstraintViolationException) {
        throw new BadRequestException('address still used by users');
      }

      throw error;
    }
  }

  async populateUsers(address: Address): Promise<void> {
    await this.addressEntityRepository.populate(address, ['users', 'users.user']);
  }
}
