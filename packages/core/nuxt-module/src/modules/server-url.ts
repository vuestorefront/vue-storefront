export default function VueStorefrontServerUrl(): void {
  if (!this.options?.publicRuntimeConfig?.middlewareUrl) {
    console.warn('Nuxt wasn\'t able to fetch the middlewareUrl. Please follow the guide at https://docs.vuestorefront.io/v2/getting-started/configuration.html#nuxt-config-js to configure your nuxt.config.js');
    this.nuxt.hook('listen', (server, { https, host, port }) => {
      const baseURL = new URL('', `http${https ? 's' : ''}://${host}:${port}`);
      this.options.publicRuntimeConfig = {
        ...this.options.publicRuntimeConfig,
        middlewareUrl: baseURL.origin
      };
    });
  }
}
