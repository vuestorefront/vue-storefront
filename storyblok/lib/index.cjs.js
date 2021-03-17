'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core = require('@vue-storefront/core');

var storyblokBridge = function (content, events) {
    window.storyblok.init();
    if (Array.isArray(events) && events.length) {
        window.storyblok.on(events, function (event) {
            if (event.action === 'input') {
                content.content = event.story.content;
            }
        });
    }
};

var search = function (context, params) { return tslib.__awaiter(void 0, void 0, void 0, function () {
    return tslib.__generator(this, function (_a) {
        return [2 /*return*/, context.$sb.api.getContent(params)];
    });
}); };
var useContent = core.useContentFactory({ search: search });

var extractComponents = function (contentData) {
    if (contentData === void 0) { contentData = []; }
    var content = contentData;
    if (!Array.isArray(contentData))
        content = [content];
    return content.map(function (component) {
        var props = Object.keys(component).reduce(function (res, key) {
            var _a;
            return (tslib.__assign(tslib.__assign({}, res), (_a = {}, _a[key] = component[key], _a)));
        }, {});
        return {
            componentName: component.component || 'CustomComponent',
            props: props,
        };
    });
};

exports.extractComponents = extractComponents;
exports.storyblokBridge = storyblokBridge;
exports.useContent = useContent;
//# sourceMappingURL=index.cjs.js.map
