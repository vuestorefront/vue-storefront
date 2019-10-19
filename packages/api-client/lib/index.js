"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var axios_1 = tslib_1.__importDefault(require("axios"));
var createCart_1 = tslib_1.__importDefault(require("./createCart"));
exports.createCart = createCart_1.default;
var addToCart_1 = tslib_1.__importDefault(require("./addToCart"));
exports.addToCart = addToCart_1.default;
var getProducts_1 = tslib_1.__importDefault(require("./getProducts"));
exports.getProducts = getProducts_1.default;
var configuration_1 = require("./configuration");
exports.setup = function (axiosConfig) {
    configuration_1.setConfiguration({
        connection: axios_1.default.create(axiosConfig)
    });
};
//# sourceMappingURL=index.js.map