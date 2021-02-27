// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getAll = function (searchData, criteria) { return []; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getGrouped = function (searchData, criteria) { return []; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getSortOptions = function (searchData) { return ({ options: [], selected: '' }); };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getCategoryTree = function (searchData) { return ({}); };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getProducts = function (searchData) {
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
var getPagination = function (searchData) { return ({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    pageOptions: []
}); };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var getBreadcrumbs = function (searchData) { return []; };
var facetGetters = {
    getSortOptions: getSortOptions,
    getGrouped: getGrouped,
    getAll: getAll,
    getProducts: getProducts,
    getCategoryTree: getCategoryTree,
    getBreadcrumbs: getBreadcrumbs,
    getPagination: getPagination
};
export default facetGetters;
//# sourceMappingURL=facetGetters.js.map