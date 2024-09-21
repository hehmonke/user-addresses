import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AddressUpdateDto {
  @ApiProperty()
  @MaxLength(300)
  @IsNotEmpty()
  @IsString()
  city!: string;

  @ApiProperty()
  @MaxLength(300)
  @IsNotEmpty()
  @IsString()
  street!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  houseNumber!: number;
}
