import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ParamUUID } from '@common/decorators';
import { UserCreateDto, UserDto, UserSearchDto, UserUpdateDto } from '@features/user/dto';
import { User } from '@features/user/entities';
import { UserService } from '@features/user/services';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(CacheInterceptor)
  @ApiOkResponse({ type: UserDto, isArray: true })
  @Get('/search')
  async search(@Query() query: UserSearchDto): Promise<UserDto[]> {
    let users = [] as User[];

    if (query.name) {
      users = await this.userService.searchByName(query.name);
    } else if (query.email) {
      users = await this.userService.searchByEmail(query.email);
    }

    await this.userService.populateAddresses(users);

    return users.map((user) => UserDto.from(user));
  }

  @ApiCreatedResponse({ type: UserDto })
  @ApiConflictResponse()
  @Post()
  async create(@Body() data: UserCreateDto): Promise<UserDto> {
    const user = await this.userService.create(data);
    await this.userService.populateAddresses(user);

    return UserDto.from(user);
  }

  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse()
  @ApiConflictResponse()
  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UserUpdateDto): Promise<UserDto> {
    const user = await this.userService.findOneByIdOrFail(id);
    await this.userService.update(user, data);
    await this.userService.populateAddresses(user);

    return UserDto.from(user);
  }

  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@ParamUUID('id') id: string): Promise<void> {
    const user = await this.userService.findOneByIdOrFail(id);
    await this.userService.delete(user);
  }
}
