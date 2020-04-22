export type Cart = {}
export type Wishlist = {}
export type ProductVariant = {}
export type Category = {}
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
