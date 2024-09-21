import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class UserSearchDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @ValidateIf((object: UserSearchDto) => typeof object.email === 'undefined')
  name!: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @ValidateIf((object: UserSearchDto) => typeof object.name === 'undefined')
  email!: string;
}
