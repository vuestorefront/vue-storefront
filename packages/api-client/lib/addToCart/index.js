"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var configuration_1 = require("./../configuration");
var applyQuoteId = function (products, cartId) { return products.map(function (product) { return (tslib_1.__assign(tslib_1.__assign({}, product), { quoteId: cartId })); }); };
var addToCart = function (products, cartId) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var connection, userToken, response, e_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                connection = configuration_1.getOption('connection');
                userToken = configuration_1.getOption('token');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, connection.post("/cart/add?token=" + userToken + "&cartId=" + cartId, applyQuoteId(products, cartId))];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response.data.result];
            case 3:
                e_1 = _a.sent();
                console.log(e_1);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = addToCart;
//# sourceMappingURL=index.js.map