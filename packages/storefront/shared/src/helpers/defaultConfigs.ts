export const contextConfig = {
  commerce: {
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
  cms: {
    middlewareModule: {
      defaultMethodsRequestConfig: {
        getEntries: { method: "GET" },
      },
    },
  },
} as const;
