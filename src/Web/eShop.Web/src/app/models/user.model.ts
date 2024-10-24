export interface User {
  id: string;
  fullname: string;
  username: string;
  email: string;
  cpf: string;
  phoneNumber: string;
  updateAt: Date;
  roles: string[];
}
