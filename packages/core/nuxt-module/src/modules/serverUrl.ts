export default function VueStorefrontServerUrl(): void {
  if (!(this.options?.publicRuntimeConfig?.middlewareUrl || this.options?.publicRuntimeConfig?.ssrMiddlewareUrl)) {
    const mergeOptions = (baseURL: URL) => {
      this.options.publicRuntimeConfig = {
        ...this.options.publicRuntimeConfig,
        middlewareUrl: baseURL
      };
    };
    this.nuxt.hook('listen', (server, { https, host, port, app }) => {
      console.log({
        https, host, port
      });
      const baseURL = new URL('', `http${https ? 's' : ''}://${host}:${port}`);
      app.stack.unshift({
        route: '',
        handle: (req, res, next) => {
          req.baseURL = baseURL;
          next();
        }
      });

      mergeOptions(baseURL);
    });
  }
}
