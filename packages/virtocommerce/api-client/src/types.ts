export type ApiConfig = {
  uri: string;
}

export type Config = {
  api: ApiConfig; 
  userId : string;
  currency: string;
  locale: string;
  store: string;  
  catalogId: string; //it is workaround need to inference catalog id from store 
  countries: ['USA', "Russia"]
}



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
export type ShippingMethod = {}
export type LineItem = {};
