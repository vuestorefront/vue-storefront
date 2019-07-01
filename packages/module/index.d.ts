export interface StorefrontModule {
    (app: any, store: any, router: any, config: any, appConfig: any): void;
}
declare let refs: {
    app: null;
    store: null;
    router: null;
    config: null;
};
declare function injectReferences(app: any, store: any, router: any, config: any): any;
declare function registerModule(module: StorefrontModule, config: any): void;
export { refs, injectReferences, registerModule };
