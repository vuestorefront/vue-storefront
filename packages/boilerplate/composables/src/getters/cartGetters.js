// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getCartItems = function (cart) { return [
    {
        _id: 1,
        _description: 'Some description',
        _categoriesRef: [
            '1',
            '2'
        ],
        name: 'Black jacket',
        sku: 'black-jacket',
        images: [
            'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
        ],
        price: {
            original: 12.34,
            current: 10.00
        },
        qty: 1
    }
]; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getCartItemName = function (product) { return (product === null || product === void 0 ? void 0 : product.name) || 'Product\'s name'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getCartItemImage = function (product) { return (product === null || product === void 0 ? void 0 : product.images[0]) || 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getCartItemPrice = function (product) {
    var _a, _b;
    return {
        regular: ((_a = product === null || product === void 0 ? void 0 : product.price) === null || _a === void 0 ? void 0 : _a.original) || 12,
        special: ((_b = product === null || product === void 0 ? void 0 : product.price) === null || _b === void 0 ? void 0 : _b.current) || 10
    };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getCartItemQty = function (product) { return 1; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getCartItemAttributes = function (product, filterByAttributeName) { return ({ color: 'red' }); };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getCartItemSku = function (product) { return (product === null || product === void 0 ? void 0 : product.sku) || 'some-sku'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getCartTotals = function (cart) {
    return {
        total: 10,
        subtotal: 10
    };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getCartShippingPrice = function (cart) { return 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getCartTotalItems = function (cart) { return 1; };
export var getFormattedPrice = function (price) { return String(price); };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getCoupons = function (cart) { return []; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getDiscounts = function (cart) { return []; };
var cartGetters = {
    getTotals: getCartTotals,
    getShippingPrice: getCartShippingPrice,
    getItems: getCartItems,
    getItemName: getCartItemName,
    getItemImage: getCartItemImage,
    getItemPrice: getCartItemPrice,
    getItemQty: getCartItemQty,
    getItemAttributes: getCartItemAttributes,
    getItemSku: getCartItemSku,
    getFormattedPrice: getFormattedPrice,
    getTotalItems: getCartTotalItems,
    getCoupons: getCoupons,
    getDiscounts: getDiscounts
};
export default cartGetters;
//# sourceMappingURL=cartGetters.js.map