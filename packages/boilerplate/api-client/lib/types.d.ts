export declare type Cart = {};
export declare type Wishlist = {};
export declare type ProductVariant = {};
export declare type Category = {};
export declare type CategoryFilter = {};
export declare type ShippingMethod = {};
export declare type LineItem = {};
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
