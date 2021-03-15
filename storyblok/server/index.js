'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@vue-storefront/core');
var StoryblokClient = require('storyblok-js-client');
var tslib = require('tslib');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var StoryblokClient__default = /*#__PURE__*/_interopDefaultLegacy(StoryblokClient);

var getContent = function (_a, _b) {
    var client = _a.client, config = _a.config;
    var slug = _b.slug;
    return tslib.__awaiter(void 0, void 0, void 0, function () {
        var token, cacheProvider, Storyblok, response, data, error_1;
        return tslib.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    token = config.token, cacheProvider = config.cacheProvider;
                    Storyblok = new client({
                        accessToken: token,
                        cache: {
                            clear: 'auto',
                            type: cacheProvider,
                        },
                    });
                    response = null;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Storyblok.get("cdn/stories/" + slug)];
                case 2:
                    data = (_c.sent()).data;
                    response = data === null || data === void 0 ? void 0 : data.story;
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    core.Logger.error("Can't get data from Storyblok.", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, response];
            }
        });
    });
};

var setup = function (_a) {
    var token = _a.token, cacheProvider = _a.cacheProvider;
    return {
        client: StoryblokClient__default['default'],
        config: {
            token: token,
            cacheProvider: cacheProvider,
        },
    };
};
var createApiClient = core.apiClientFactory({
    onCreate: setup,
    api: {
        getContent: getContent,
    },
}).createApiClient;

exports.createApiClient = createApiClient;
//# sourceMappingURL=index.js.map
