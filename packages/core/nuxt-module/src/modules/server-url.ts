export default function VueStorefrontServerUrl(): void {
  const hasMiddlewareUrl = this.options?.publicRuntimeConfig?.middlewareUrl;

  if (!hasMiddlewareUrl) {
    this.nuxt.hook('listen', (server, { https, host, port }) => {
      const baseURL = new URL('', `http${https ? 's' : ''}://${host}:${port}`);

      this.options.publicRuntimeConfig = {
        ...this.options.publicRuntimeConfig,
        middlewareUrl: baseURL.origin
      };
    });
  }
}
