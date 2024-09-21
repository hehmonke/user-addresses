import { ApiProperty } from '@nestjs/swagger';

import { BaseDto } from '@common/dto';
import { AddressType } from '@features/user/enums';

export class UserAddressDto extends BaseDto<UserAddressDto> {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  street!: string;

  @ApiProperty()
  houseNumber!: number;

  @ApiProperty({ enum: AddressType })
  type!: AddressType;
}
