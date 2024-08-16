import { Address } from './Address';
import { CardPaymentModel } from './CardPaymentModel';
import { Item } from './Item';

export interface ClientData {
  name: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  address: Address;
  paymentMethod: string;
  cardData?: CardPaymentModel; 
  items: Array<Item>;
}
