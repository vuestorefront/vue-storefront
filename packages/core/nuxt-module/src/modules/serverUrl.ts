export default function VueStorefrontServerUrl(): void {
  if (!(this.options?.publicRuntimeConfig?.middlewareUrl || this.options?.publicRuntimeConfig?.ssrMiddlewareUrl)) {
    this.nuxt.hook('listen', (server, { https, host, port }) => {
      const baseURL = new URL('', `http${https ? 's' : ''}://${host}:${port}`);

      this.options.publicRuntimeConfig = {
        ...this.options.publicRuntimeConfig,
        middlewareUrl: baseURL.origin
      };
    });
  }
}
