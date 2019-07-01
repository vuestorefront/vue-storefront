"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var refs = { app: null, store: null, router: null, config: null };
exports.refs = refs;
function injectReferences(app, store, router, config) {
    refs.app = app;
    refs.store = store;
    refs.router = router;
    refs.config = config;
}
exports.injectReferences = injectReferences;
function registerModule(module, config) {
    module(refs.app, refs.store, refs.router, config, refs.config);
}
exports.registerModule = registerModule;
