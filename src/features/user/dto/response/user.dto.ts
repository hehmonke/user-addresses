import { ApiProperty } from '@nestjs/swagger';

import { BaseDto } from '@common/dto';
import { User } from '@features/user/entities';

import { UserAddressDto } from './user-address.dto';

export class UserDto extends BaseDto<UserDto> {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  phoneNumber!: string;

  @ApiProperty({ type: UserAddressDto, isArray: true })
  addresses!: UserAddressDto[];

  static from(user: User): UserDto {
    return new UserDto({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      addresses: user.addresses.map((val) => {
        const address = val.address.getEntity();

        return {
          id: address.id,
          city: address.city,
          street: address.street,
          houseNumber: address.houseNumber,
          type: val.type,
        };
      }),
    });
  }
}
