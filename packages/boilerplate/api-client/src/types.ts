export type Cart = {}
export type Wishlist = {}
export type ProductVariant = {
  _id: number;
  _description: string;
  _categoriesRef: string[];
  name: string;
  sku: string;
  images: string[];
  price: {
    original: number;
    current: number;
  };
}
export type Category = {
  id: number;
  name: string;
  slug: string;
  items: Category[];
}
export type CategoryFilter = {}
export type ShippingMethod = {
  id: string;
  name: string;
  description?: string;
  price: number;
}
export type LineItem = {};
