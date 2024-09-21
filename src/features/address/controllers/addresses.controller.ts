import { CacheInterceptor } from '@nestjs/cache-manager';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ParamUUID } from '@common/decorators';
import { AddressCreateDto, AddressDto, AddressUpdateDto } from '@features/address/dto';
import { AddressService } from '@features/address/services';

@ApiTags('Addresses')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressService: AddressService) {}

  @ApiCreatedResponse({ type: AddressDto })
  @Post()
  async create(@Body() data: AddressCreateDto): Promise<AddressDto> {
    const address = await this.addressService.create(data);

    return AddressDto.from(address);
  }

  @UseInterceptors(CacheInterceptor)
  @ApiOkResponse({ type: AddressDto })
  @ApiNotFoundResponse()
  @Get(':id')
  async get(@ParamUUID('id') id: string): Promise<AddressDto> {
    const address = await this.addressService.findOneByIdOrFail(id);
    await this.addressService.populateUsers(address);

    return AddressDto.from(address);
  }

  @ApiOkResponse({ type: AddressDto })
  @ApiNotFoundResponse()
  @Put(':id')
  async update(@ParamUUID('id') id: string, @Body() data: AddressUpdateDto): Promise<AddressDto> {
    const address = await this.addressService.findOneByIdOrFail(id);
    await this.addressService.update(address, data);
    await this.addressService.populateUsers(address);

    return AddressDto.from(address);
  }

  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@ParamUUID('id') id: string): Promise<void> {
    const address = await this.addressService.findOneByIdOrFail(id);
    await this.addressService.delete(address);
  }
}
