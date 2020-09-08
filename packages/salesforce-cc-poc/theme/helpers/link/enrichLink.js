// const { pickedChannel } = uiState;

export const enrichLink = link => {

  /**
   * For SSR we don't need to enrich links because:
   * - pickedChannel will be configured after user chooses it on StoreLocator modal
   * - pickedChannel will be initialized from localStorage which is not available in SSR anyway
   */
  if (process.server) {
    return link;
  }

  /**
   * The document.baseURI is in fact not needed here because we just need to parse
   * and update query string, but new URL() constructor requires a valid absolute base
   * part of an URL to concat it with the relative part.
   */
  const url = new URL(link, document.baseURI);

  /* if (pickedChannel.value?.id) {
    url.searchParams.set('store', pickedChannel.value.id);
  }*/

  return `${url.pathname}${url.search}`;
};
