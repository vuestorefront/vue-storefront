export type Address = {
  firstName?: string;
  lastName?: string;
  streetName?: string;
  streetNumber?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
}

export type Customer = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  address?: {
    shipping?: Address,
    billing?: Address
  }
}

export type Product = {
  sku: string;
  id: number;
}
