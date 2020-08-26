export type Cart = {}
export type Wishlist = {}

export type ProductHit = {
  productId: string;
  productName: string;
  prices: any;
  image: any;
  colorSwatches: ColorSwatch[];
}

export type SearchResult = {
  limit: number;
  productHits: [ProductHit];
  currentFilters: [CurrentFilter];
  refinements: [Refinement];
  sortingOptions: [SortOption];
}

export type SortOption = {
  id: string;
  label: string;
}

export type Refinement = {
  attributeId: string;
  label: string;
  values: RefinementValue[];
}

export type RefinementValue = {
  label: string;
  value: string;
  hitCount: number;
  values: RefinementValue[];
}

export type CurrentFilter = {
  id: string;
  value: string;
}

export type ColorSwatch = {
  name: string;
  value: string;
  title: string;
  link: string;
  alt: string;
  style: string;
}

export type Product = ProductHit & {
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
  getProduct(params: {}): Promise<Product[]>;
}

export interface ApiClientSettings {
  overrides: {
    getCategory?(): Promise<Category[]>;
    getProduct?(params: {}): Promise<Product[]>;
  };
}
