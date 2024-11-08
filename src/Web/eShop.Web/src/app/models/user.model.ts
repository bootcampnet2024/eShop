export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  attributes?: UserAttributes;
}

export interface UserAttributes {
  full_name: string[];
  update_at?: string[];
  cpf?: string[];
  phone_number?: string[];
  address?: string[];
}
