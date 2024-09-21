import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, ValidateNested } from 'class-validator';

import { UserSetAddressesDto } from '@features/user/dto';

export class UserCreateDto {
  @ApiProperty()
  @MaxLength(300)
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @ApiProperty()
  @MaxLength(300)
  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @ApiProperty({ example: 'email@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '+79999999999' })
  @IsPhoneNumber()
  phoneNumber!: string;

  @ApiProperty({ type: UserSetAddressesDto, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => UserSetAddressesDto)
  @IsArray()
  addresses!: UserSetAddressesDto[];
}
