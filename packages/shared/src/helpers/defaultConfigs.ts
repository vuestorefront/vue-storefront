export const defaultMethodsRequestConfig = {
  unifiedCommerce: {
    middlewareModule: {
      getCategories: { method: "GET" },
      getProductDetails: { method: "GET" },
      getProductReviews: { method: "GET" },
      getProducts: { method: "GET" },
      searchProducts: { method: "GET" },
    },
  },
  unifiedCms: {
    middlewareModule: {
      getEntries: { method: "GET" },
    },
  },
} as const;
