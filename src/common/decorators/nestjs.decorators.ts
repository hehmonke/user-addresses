import { Param, ParseUUIDPipe } from '@nestjs/common';

export function ParamUUID(property: string): ParameterDecorator {
  return Param(property, ParseUUIDPipe);
}
