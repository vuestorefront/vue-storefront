// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getWishlistItems = function (wishlist) { return [
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
export var getWishlistItemName = function (product) { return (product === null || product === void 0 ? void 0 : product.name) || 'Product\'s name'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getWishlistItemImage = function (product) { return (product === null || product === void 0 ? void 0 : product.images[0]) || 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getWishlistItemPrice = function (product) {
    var _a, _b;
    return {
        regular: ((_a = product === null || product === void 0 ? void 0 : product.price) === null || _a === void 0 ? void 0 : _a.original) || 12,
        special: ((_b = product === null || product === void 0 ? void 0 : product.price) === null || _b === void 0 ? void 0 : _b.current) || 10
    };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getWishlistItemQty = function (product) { return 1; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getWishlistItemAttributes = function (product, filterByAttributeName) { return ({ color: 'red' }); };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getWishlistItemSku = function (product) { return (product === null || product === void 0 ? void 0 : product.sku) || 'some-sku'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getWishlistTotals = function (wishlist) {
    return {
        total: 10,
        subtotal: 10
    };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getWishlistShippingPrice = function (wishlist) { return 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getWishlistTotalItems = function (wishlist) { return 1; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getFormattedPrice = function (price) { return String(price); };
var wishlistGetters = {
    getTotals: getWishlistTotals,
    getShippingPrice: getWishlistShippingPrice,
    getItems: getWishlistItems,
    getItemName: getWishlistItemName,
    getItemImage: getWishlistItemImage,
    getItemPrice: getWishlistItemPrice,
    getItemQty: getWishlistItemQty,
    getItemAttributes: getWishlistItemAttributes,
    getItemSku: getWishlistItemSku,
    getTotalItems: getWishlistTotalItems,
    getFormattedPrice: getFormattedPrice
};
export default wishlistGetters;
//# sourceMappingURL=wishlistGetters.js.map