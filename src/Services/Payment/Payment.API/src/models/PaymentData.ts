import { Address } from './Address';
import { CardPayment } from './CardPayment';
import { Item } from './Item';

export interface PaymentData {
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  address: Address;
  paymentMethod: string;
  cardData?: CardPayment; 
  items: Array<Item>;
}
