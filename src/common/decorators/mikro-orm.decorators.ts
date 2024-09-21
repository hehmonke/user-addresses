import { Enum, EnumOptions, PrimaryKey } from '@mikro-orm/core';
import { PrimaryKeyOptions } from '@mikro-orm/core/decorators/PrimaryKey';
import { uuidv7 } from 'uuidv7';

export function PrimaryKeyUUID<T extends object>(options?: Omit<PrimaryKeyOptions<T>, 'type'>): PropertyDecorator {
  return PrimaryKey({
    type: 'uuid',
    onCreate: () => uuidv7(),
    ...options,
  }) as PropertyDecorator;
}

export function PropertyEnum<T>(
  items: EnumOptions<T>['items'],
  options?: Omit<EnumOptions<Partial<T>>, 'items'>,
): PropertyDecorator {
  return Enum({ items, ...options }) as PropertyDecorator;
}
