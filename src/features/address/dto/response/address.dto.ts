import { ApiProperty } from '@nestjs/swagger';

import { BaseDto } from '@common/dto';
import { Address } from '@features/address/entities';

import { AddressUserDto } from './address-user.dto';

export class AddressDto extends BaseDto<AddressDto> {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  street!: string;

  @ApiProperty()
  houseNumber!: number;

  @ApiProperty({ type: () => AddressUserDto, isArray: true })
  users!: AddressUserDto[];

  static from(address: Address): AddressDto {
    return new AddressDto({
      id: address.id,
      city: address.city,
      street: address.street,
      houseNumber: address.houseNumber,
      users: address.users.map((val) => {
        const user = val.user.getEntity();

        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          addressType: val.type,
        };
      }),
    });
  }
}
