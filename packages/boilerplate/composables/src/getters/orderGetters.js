/* istanbul ignore file */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getDate = function (order) { return (order === null || order === void 0 ? void 0 : order.date) || '123'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getId = function (order) { return (order === null || order === void 0 ? void 0 : order.id) || Math.floor(Math.random() * 100); };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getStatus = function (order) { return (order === null || order === void 0 ? void 0 : order.status) || 'Failed'; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getPrice = function (order) { return (order === null || order === void 0 ? void 0 : order.price) || 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getItems = function (order) { return (order === null || order === void 0 ? void 0 : order.items) || []; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getItemSku = function (item) { return (item === null || item === void 0 ? void 0 : item.sku) || 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getItemName = function (item) { return (item === null || item === void 0 ? void 0 : item.name) || 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getItemQty = function (item) { return (item === null || item === void 0 ? void 0 : item.qty) || 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getItemPrice = function (item) { var _a; return ((_a = item === null || item === void 0 ? void 0 : item.price) === null || _a === void 0 ? void 0 : _a.current) || 0; };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export var getFormattedPrice = function (price) { return String(price); };
var orderGetters = {
    getDate: getDate,
    getId: getId,
    getStatus: getStatus,
    getPrice: getPrice,
    getItems: getItems,
    getItemSku: getItemSku,
    getItemName: getItemName,
    getItemQty: getItemQty,
    getItemPrice: getItemPrice,
    getFormattedPrice: getFormattedPrice
};
export default orderGetters;
//# sourceMappingURL=orderGetters.js.map