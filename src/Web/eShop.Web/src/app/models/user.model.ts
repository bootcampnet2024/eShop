export interface User {
  id: string;
  fullname: string;
  username: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  updateAt: Date;
  address: string[];
  roles: string[];
}
