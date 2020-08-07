import { City } from './City';

export class Customer {

  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  city: City;
  country?: string;
  customerPicture?: string;
  customerFiles?: string;

}
