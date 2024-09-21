import { AddressType } from '@features/user/enums';

export interface UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addresses: { id: string; type: AddressType }[];
}
