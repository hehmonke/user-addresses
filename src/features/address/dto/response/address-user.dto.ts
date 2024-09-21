import { ApiProperty } from '@nestjs/swagger';

import { BaseDto } from '@common/dto';
import { AddressType } from '@features/user/enums';

export class AddressUserDto extends BaseDto<AddressUserDto> {
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

  @ApiProperty({ enum: AddressType })
  addressType!: AddressType;
}
