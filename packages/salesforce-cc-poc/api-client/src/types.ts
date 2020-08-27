export declare type Cart = {};
export declare type Wishlist = {};
export declare type ProductHit = {
    productId: string;
    productName: string;
    prices: any;
    image: any;
    colorSwatches: ColorSwatch[];
};
export declare type SearchResult = {
    limit: number;
    productHits: [ProductHit];
    currentFilters: [CurrentFilter];
    refinements: [Refinement];
    sortingOptions: [SortOption];
};
export declare type SortOption = {
    id: string;
    label: string;
};
export declare type Refinement = {
    attributeId: string;
    label: string;
    values: RefinementValue[];
};
export declare type RefinementValue = {
    label: string;
    value: string;
    hitCount: number;
    values: RefinementValue[];
};
export declare type CurrentFilter = {
    id: string;
    value: string;
};
export declare type ColorSwatch = {
    name: string;
    value: string;
    title: string;
    link: string;
    alt: string;
    style: string;
};
export declare type Product = ProductHit & {
    id: string;
    name: string;
    masterId: string;
    price: number;
    prices: Prices;
    currency: string;
    longDescription: string;
    shortDescription: string;
    image: string;
    images: [Image];
    variants: [Variant];
    variationAttributes: [VariationAttribute];
    type: ProductType;
    inventory: Inventory;
    productPromotions: [ProductPromotion];
}

export declare type Prices = {
    sale: number;
    list: number;
}

export declare type ProductType = {
    bundle: boolean;
    item: boolean;
    master: boolean;
    option: boolean;
    set: boolean;
    variant: boolean;
    variationGroup: boolean;
}

export declare type ProductPromotion = {
    calloutMsg: string;
    promotionId: string;
    promotionalPrice: number;
}

export declare type Image = {
    title: string;
    alt: string;
    link: string;
    style: string;
}

export declare type Inventory = {
    ats: number;
    backorderable: boolean;
    id: string;
    orderable: boolean;
    preorderable: boolean;
    stockLevel: number;
}

export declare type Variant = {
    id: string;
    variationValues: [VariationValue];
}

export declare type VariationValue = {
    key: string;
    value: string;
}

export declare type VariationAttribute = {
    variationAttributeType: VariationAttributeType;
    variationAttributeValues: [VariationAttributeValues];
}

export declare type VariationAttributeType = {
    id: string;
    name: string;
}

export declare type VariationAttributeValues = {
    name: string;
    value: string;
    orderable: boolean;
    swatchImage: Image;
}

export declare type Category = {
    id: string;
    name: string;
    pageTitle: string;
    thumbnail: string;
    categories: Category[];
};
export declare type CategoryFilter = {};
export declare type ShippingMethod = {};
export declare type LineItem = {};
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
export interface ProductsSearchParams {
    perPage?: number;
    page?: number;
    sort?: any;
    term?: any;
    filters?: Record<string, any>;
    catId?: string | string[];
    skus?: string[];
    slug?: string;
    id?: string;
}
