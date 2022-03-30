export default function VueStorefrontServerUrl(): void {
  const hasMiddlewareUrl = this.options?.publicRuntimeConfig?.middlewareUrl;
  const hasSSRUrl = this.options?.publicRuntimeConfig?.ssrMiddlewareUrl;
  if (!hasMiddlewareUrl || !hasSSRUrl) {
    this.nuxt.hook('listen', (server, { https, host, port }) => {
      const baseURL = new URL('', `http${https ? 's' : ''}://${host}:${port}`);

      this.options = {
        publicRuntimeConfig: {
          ...(this.options.publicRuntimeConfig || {}),
          middlewareUrl: baseURL.origin
        }
      };
    });
  }
}
