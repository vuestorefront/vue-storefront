declare module 'webpack-hot-middleware' {
  const middleware: any;
  export interface Options {
    [proName: string]: any;
  }

  export interface ClientOptions {
    [proName: string]: any;
  }

  export interface MiddlewareOptions {
    [proName: string]: any;
  }

  export default middleware;
}
