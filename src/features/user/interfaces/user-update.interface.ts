import { AddressType } from '@features/user/enums';

export interface UserUpdate {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addresses: { id: string; type: AddressType }[];
}
