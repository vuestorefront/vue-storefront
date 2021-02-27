// TODO: Add interfaces for some of the methods in core
// Product
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getProductName = function (product) { return (product === null || product === void 0 ? void 0 : product.name) || 'Product\'s name'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getProductSlug = function (product) { return product.sku; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getProductPrice = function (product) {
    var _a, _b;
    return {
        regular: ((_a = product === null || product === void 0 ? void 0 : product.price) === null || _a === void 0 ? void 0 : _a.original) || 0,
        special: ((_b = product === null || product === void 0 ? void 0 : product.price) === null || _b === void 0 ? void 0 : _b.current) || 0
    };
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getProductGallery = function (product) { return [
    {
        small: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg',
        normal: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg',
        big: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
    },
    {
        small: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg',
        normal: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg',
        big: 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
    }
]; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getProductCoverImage = function (product) { return 'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getProductFiltered = function (products, filters) {
    if (filters === void 0) { filters = {}; }
    return [
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
            }
        },
        {
            _id: 2,
            _description: 'Some different description',
            _categoriesRef: [
                '1',
                '2',
                '3'
            ],
            name: 'White shirt',
            sku: 'white-shirt',
            images: [
                'https://s3-eu-west-1.amazonaws.com/commercetools-maximilian/products/081223_1_large.jpg'
            ],
            price: {
                original: 15.11,
                current: 11.00
            }
        }
    ];
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getProductAttributes = function (products, filterByAttributeName) {
    return {};
};
export var getProductDescription = function (product) { var _a; return ((_a = product) === null || _a === void 0 ? void 0 : _a._description) || ''; };
export var getProductCategoryIds = function (product) { var _a; return ((_a = product) === null || _a === void 0 ? void 0 : _a._categoriesRef) || ''; };
export var getProductId = function (product) { var _a; return ((_a = product) === null || _a === void 0 ? void 0 : _a._id) || ''; };
export var getFormattedPrice = function (price) { return String(price); };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getProductTotalReviews = function (product) { return 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getProductAverageRating = function (product) { return 0; };
var productGetters = {
    getName: getProductName,
    getSlug: getProductSlug,
    getPrice: getProductPrice,
    getGallery: getProductGallery,
    getCoverImage: getProductCoverImage,
    getFiltered: getProductFiltered,
    getAttributes: getProductAttributes,
    getDescription: getProductDescription,
    getCategoryIds: getProductCategoryIds,
    getId: getProductId,
    getFormattedPrice: getFormattedPrice,
    getTotalReviews: getProductTotalReviews,
    getAverageRating: getProductAverageRating
};
export default productGetters;
//# sourceMappingURL=productGetters.js.map