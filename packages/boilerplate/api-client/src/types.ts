export type Cart = {}
export type Wishlist = {}
export type ProductVariant = {
  id: number;
  name: string;
  slug: string;
}
export type Category = {
  id: number;
  name: string;
  slug: string;
  items: Category[];
}
export type CategoryFilter = {}
export type ShippingMethod = {}
export type LineItem = {};

export interface ApiClientMethods {
  getCategory(params: {}): Promise<Category[]>;
  getProduct(params: {}): Promise<ProductVariant[]>;
}

export interface ApiClientSettings {
  overrides: {
    getCategory?(): Promise<Category[]>;
    getProduct?(params: {}): Promise<ProductVariant[]>;
  };
}
