"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var configuration_1 = require("./../configuration");
var getProducts = function (_a) {
    var skus = _a.skus, _b = _a.locale, locale = _b === void 0 ? '' : _b;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var connection, searchQuery, response, e_1;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    connection = configuration_1.getOption('connection');
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    searchQuery = skus.join(',');
                    return [4 /*yield*/, connection.get("/catalog/products?skus=" + searchQuery + "&locale=" + locale)];
                case 2:
                    response = _c.sent();
                    return [2 /*return*/, response.data.result];
                case 3:
                    e_1 = _c.sent();
                    console.log(e_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.default = getProducts;
//# sourceMappingURL=index.js.map