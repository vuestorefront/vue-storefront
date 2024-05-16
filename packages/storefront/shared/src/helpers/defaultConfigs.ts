export const contextConfig = {
  unifiedCommerce: {
    middlewareModule: {
      defaultMethodsRequestConfig: {
        getCategories: { method: "GET" },
        getProductDetails: { method: "GET" },
        getProductReviews: { method: "GET" },
        getProducts: { method: "GET" },
        searchProducts: { method: "GET" },
      },
    },
  },
  unifiedCms: {
    middlewareModule: {
      defaultMethodsRequestConfig: {
        getEntries: { method: "GET" },
      },
    },
  },
} as const;
