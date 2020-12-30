'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@vue-storefront/core');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var defaultSettings = {
    locale: 'en',
    acceptLanguage: ['en'],
    auth: {
        onTokenChange: function () { },
        onTokenRead: function () { return ''; },
        onTokenRemove: function () { }
    },
    cookies: {
        currencyCookieName: 'vsf-currency',
        countryCookieName: 'vsf-country',
        localeCookieName: 'vsf-locale'
    }
};

var isAnonymousSession = function (token) { var _a; return (_a = token === null || token === void 0 ? void 0 : token.scope) === null || _a === void 0 ? void 0 : _a.includes('anonymous_id'); };
var isUserSession = function (token) { var _a; return (_a = token === null || token === void 0 ? void 0 : token.scope) === null || _a === void 0 ? void 0 : _a.includes('customer_id'); };

var isGuest = function (context) {
    var client = context.client, config = context.config;
    if (config.handleIsGuest) {
        return config.handleIsGuest(context);
    }
    if (client.tokenProvider || context.isProxy) {
        var token = config.auth.onTokenRead();
        return !isAnonymousSession(token) && !isUserSession(token);
    }
    return false;
};

var onCreate = function (settings) {
    var languageMap = settings.languageMap || {};
    var acceptLanguage = settings.acceptLanguage || defaultSettings.acceptLanguage;
    var locale = settings.locale || defaultSettings.locale;
    var config = __assign(__assign(__assign({}, defaultSettings), settings), { languageMap: languageMap, acceptLanguage: languageMap[locale] || acceptLanguage, auth: settings.auth || defaultSettings.auth });
    return { config: config };
};
var _a = core.apiProxyFactory({
    tag: 'ct',
    onCreate: onCreate,
    api: { isGuest: isGuest }
}), createApiProxy = _a.createApiProxy, integrationPlugin = _a.integrationPlugin;

exports.createApiProxy = createApiProxy;
exports.integrationPlugin = integrationPlugin;
//# sourceMappingURL=index.js.map
