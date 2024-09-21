import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';

import { AddressType } from '@features/user/enums';

export class UserSetAddressesDto {
  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty({ enum: AddressType, example: AddressType.Home })
  @IsEnum(AddressType)
  type!: AddressType;
}
