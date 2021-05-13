export type Address = {
  streetName: string;
  apartment: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  phone: string;
}

export type Customer = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  address?: {
    shipping: Address,
    billing: Address
  }
}

export type Product = {
  sku: string;
  id: number;
}
