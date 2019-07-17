export interface EventViewContent {
    content_ids: Array<string | number>;
    content_name: string;
    content_type: string;
    currency: string;
    value: number;
}

export interface EventSearch {
    search_string: string;
}

export interface EventPurchase {
    value: number;
    currency: string;
    content_ids: Array<string | number>;
    content_type: string;
    contents: CartItem[],
    num_items: number
}

export interface CartItem {
    id: string;
    quantity: number;
    item_price: number;
}

export interface EventInitiateCheckout {
    content_category: string;
    content_type: string;
    content_ids: Array<string | number>;
    contents: CartItem[];
    currency: number;
    num_items: number;
    value: number;
}

export interface EventAddToWishlist {
    content_ids: Array<string | number>;
    content_name: string;
    value: number;
    currency: number;
    content_type: string;
}

export interface EventAddToCart {
    content_ids: Array<string | number>;
    content_name: string;
    value: number;
    currency: number;
    content_type: string;
}