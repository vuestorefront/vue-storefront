export const defaultMethodsRequestConfig = {
  unifiedCommerce: {
    middlewareModule: {
      getCategory: { method: "GET" },
      getCategories: { method: "GET" },
      getProductDetails: { method: "GET" },
      getProductReviews: { method: "GET" },
      getProducts: { method: "GET" },
      getCurrencies: { method: "GET" },
      searchProducts: { method: "GET" },
    },
  },
  unifiedCms: {
    middlewareModule: {
      getPage: { method: "GET" },
      getEntries: { method: "GET" },
    },
  },
} as const;
