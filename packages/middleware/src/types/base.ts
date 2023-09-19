export type Config = Record<string, any>;

export type Client = any;

export type Method = (...args: any[]) => any;

export type Api = Record<string, Method>;

export type ApiMethodsFactory = (config: Config) => Api;
