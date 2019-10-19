"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configuration = {
    token: '',
};
var setConfiguration = function (config) {
    Object.assign(configuration, config);
};
exports.setConfiguration = setConfiguration;
var getOption = function (name) { return configuration[name]; };
exports.getOption = getOption;
//# sourceMappingURL=configuration.js.map