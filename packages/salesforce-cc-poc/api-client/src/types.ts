import { type } from 'os';

export declare type Cart = {
    items: CartItem[];
};
export declare type CartItem = {
    id: string;
    description: string;
    primaryCategoryId: string;
    name: string;
    image: string;
    attributes: Record<string, any>;
    price: {
        original: number;
        current: number;
    };
    qty: number;
};
export declare type Wishlist = {};
export declare type ProductHit = {
    productId: string;
    productName: string;
    prices: Prices;
    image: any;
    colorSwatches: ColorSwatch[];
};
export declare type SearchResult = {
    limit: number;
    total: number;
    offset: number;
    productHits: ProductHit[];
    currentFilters: CurrentFilter[];
    refinements: Refinement[];
    sortingOptions: SortOption[];
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
    selected: boolean;
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
export declare type Product = {
    id: string;
    name: string;
    masterId: string;
    price: number;
    priceMax: number;
    prices: Prices;
    primaryCategoryId: string;
    currency: string;
    longDescription: string;
    shortDescription: string;
    image: string;
    images: Image[];
    variants: Variant[];
    variationAttributes: VariationAttribute[];
    type: ProductType;
    inventory: Inventory;
    productPromotions: ProductPromotion[];
    options: Option[];
}

export declare type OptionValue = {
    default: boolean;
    id: string;
    name: string;
    price: number;
  }

export declare type Option = {
    description: string;
    id: string;
    image: string;
    name: string;
    values: OptionValue[];
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
    variationValues: VariationValue[];
}

export declare type VariationValue = {
    key: string;
    value: string;
}

export declare type VariationAttribute = {
    variationAttributeType: VariationAttributeType;
    variationAttributeValues: VariationAttributeValues[];
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
    selected: boolean;
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
    filters?: Refinement[];
    catId?: string | string[];
    skus?: string[];
    slug?: string;
    id?: string;
}

export type Breadcrumb = {
    text: string;
    route: {
      link: string;
    };
}

export type GqlProductDetailsResponse = {
    product: Product;
}

export type GqlProductSearchResponse = {
    productSearch: SearchResult;
}

export type GqlCategoriesSearchResponse = {
    categories: { data: Category[] };
}
