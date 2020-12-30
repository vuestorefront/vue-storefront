import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { Token, CustomerCredentials } from './setup';
import { UpdateCartParams } from '../api/updateCart';
import { GetMeParams } from '../api/getMe';
import { ShippingMethodData } from '../api/getShippingMethods';
import { Cart, Order, ShippingMethod, CustomerSignInResult, Customer, CartDraft, ProductVariant, OrderMyCartCommand, CustomerSignMeInDraft, CustomerSignMeUpDraft, ReferenceInput, Address, LineItem, CategoryQueryResult, ProductQueryResult, Me, CartQueryInterface } from './GraphQL';
export interface ApiInstance {
    addToCart({ id, version }: Cart, product: ProductVariant, quantity: number, customQuery?: CustomQueryFn): Promise<CartResponse>;
    applyCartCoupon(cart: Cart, discountCode: string, customQuery?: CustomQueryFn): Promise<CartResponse>;
    createCart(cartDraft?: CartData, customQueryFn?: CustomQueryFn): Promise<{
        data: CartQueryInterface;
    }>;
    createMyOrderFromCart(draft: OrderMyCartCommand, customQueryFn?: CustomQueryFn): Promise<OrderMutationResponse>;
    customerChangeMyPassword(version: any, currentPassword: string, newPassword: string): Promise<ChangeMyPasswordResponse>;
    customerSignMeIn(draft: CustomerSignMeInDraft): Promise<SignInResponse>;
    customerSignMeUp(draft: CustomerSignMeUpDraft): Promise<SignInResponse>;
    customerSignOut(): Promise<void>;
    customerUpdateMe(currentUser: any, updatedUserData: any): Promise<any>;
    getCart(cartId: string): Promise<CartQueryResponse>;
    getCategory(params: any, customQueryFn?: CustomQueryFn): Promise<QueryResponse<'categories', CategoryQueryResult>>;
    getMe(params?: GetMeParams, customQueryFn?: CustomQueryFn): Promise<{
        data: {
            me: Me;
        };
    }>;
    getOrders(params: any, customQueryFn?: CustomQueryFn): Promise<{
        data: {
            me: Me;
        };
    }>;
    getProduct(params: any, customQueryFn?: CustomQueryFn): Promise<QueryResponse<'products', ProductQueryResult>>;
    getShippingMethods(cartId?: string, customQueryFn?: CustomQueryFn): Promise<ShippingMethodData>;
    removeCartCoupon(cart: Cart, discountCode: ReferenceInput, customQuery?: CustomQueryFn): Promise<CartResponse>;
    removeFromCart(cart: Cart, product: LineItem, customQuery?: CustomQueryFn): Promise<CartResponse>;
    updateCart(params: UpdateCartParams, customQueryFn?: CustomQueryFn): Promise<CartResponse>;
    updateCartQuantity(cart: Cart, product: LineItem, customQuery?: CustomQueryFn): Promise<CartResponse>;
    updateShippingDetails(cart: Cart, shippingDetails: Address, customQueryFn?: CustomQueryFn): Promise<CartResponse>;
    isGuest: () => boolean;
}
export declare type CustomQueryFn<T = any> = (query: any, variables: T) => {
    query?: any;
    variables?: T;
};
export interface BaseSearch {
    limit?: number;
    offset?: number;
    sort?: string[];
}
export interface ProductWhereSearch extends BaseSearch {
    catId?: string | string[];
    skus?: string[];
    slug?: string;
    id?: string;
    filters?: Filter[];
}
export interface Filter {
    type: AttributeType;
    name: string;
    value: any;
}
export interface FilterOption {
    label: string;
    value: string | number | boolean | [number, number] | [string, string];
    selected: boolean;
}
export interface CategoryWhereSearch extends BaseSearch {
    catId?: string;
    slug?: string;
}
export interface OrderWhereSearch extends BaseSearch {
    id?: string;
}
export declare enum AttributeType {
    STRING = "StringAttribute",
    DATE = "DateAttribute",
    DATETIME = "DateTimeAttribute",
    TIME = "TimeAttribute",
    NUMBER = "NumberAttribute",
    ENUM = "EnumAttribute",
    LOCALIZED_ENUM = "LocalizedEnumAttribute",
    LOCALIZED_STRING = "LocalizedStringAttribute",
    MONEY = "MoneyAttribute",
    BOOLEAN = "BooleanAttribute"
}
export interface FlowOptions {
    currentToken?: Token;
    customerCredentials?: CustomerCredentials;
    requireUserSession?: boolean;
}
export interface CartData extends Omit<CartDraft, 'currency'> {
    currency?: string;
}
export declare type QueryResponse<K extends string, V> = ApolloQueryResult<Record<K, V>>;
export declare type MutationResponse<K extends string, V> = FetchResult<Record<K, V>>;
export declare type CartQueryResponse = QueryResponse<'cart', Cart>;
export declare type OrderQueryResponse = QueryResponse<'order', Order>;
export declare type CartMutationResponse = MutationResponse<'cart', Cart>;
export declare type CartResponse = CartQueryResponse | CartMutationResponse;
export declare type OrderMutationResponse = MutationResponse<'order', Order>;
export declare type OrderResponse = OrderQueryResponse | OrderMutationResponse;
export declare type ShippingMethodsResponse = QueryResponse<'shippingMethods', ShippingMethod>;
export declare type SignInResponse = QueryResponse<'user', CustomerSignInResult>;
export declare type ChangeMyPasswordResponse = QueryResponse<'user', Customer>;
