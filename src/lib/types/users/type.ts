export enum Role {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
}

export type Address = {
  id: number;
  address_street: string;
  ward: string;
  district: string;
  city: string;
  userId: number;
};

export type User = {
  id: number;
  avatar: string | null;
  fullName: string;
  email: string;
  phone: string;
  role: Role;
  addresses: Address[];
};
