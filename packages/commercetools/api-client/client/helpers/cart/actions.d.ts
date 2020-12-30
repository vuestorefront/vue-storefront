import { ProductVariant, Address, LineItem, ReferenceInput, ResourceIdentifierInput, AddressInput } from './../../types/GraphQL';
export declare const createAddLineItemAction: (variant: ProductVariant, quantity: number) => {
    addLineItem: {
        variantId: number;
        quantity: number;
        sku: string;
    };
};
export declare const createRemoveLineItemAction: (product: LineItem) => {
    removeLineItem: {
        lineItemId: string;
        quantity: any;
    };
};
export declare const createChangeLineItemQuantityAction: (product: LineItem) => {
    changeLineItemQuantity: {
        lineItemId: string;
        quantity: any;
    };
};
export declare const setShippingAddressAction: (shippingDetails: Address) => {
    setShippingAddress: {
        address: AddressInput;
    };
};
export declare const setShippingMethodAction: (shippingMethodId?: string) => {
    setShippingMethod: {
        shippingMethod: {
            id: string;
        };
    };
};
export declare const addPayment: (payment: ResourceIdentifierInput) => {
    addPayment: {
        payment: ResourceIdentifierInput;
    };
};
export declare const setBillingAddressAction: (billingDetails: Address) => {
    setBillingAddress: {
        address: AddressInput;
    };
};
export declare const addPaymentAction: (paymentMethodId: string) => {
    addPayment: {
        payment: {
            id: string;
        };
    };
};
export declare const addDiscountCodeAction: (code: string) => {
    addDiscountCode: {
        code: string;
    };
};
export declare const removeDiscountCodeAction: (discountCode: ReferenceInput) => {
    removeDiscountCode: {
        discountCode: ReferenceInput;
    };
};
export declare const setCustomerEmail: (email: string) => {
    setCustomerEmail: {
        email: string;
    };
};
