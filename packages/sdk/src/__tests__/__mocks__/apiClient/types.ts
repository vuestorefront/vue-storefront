export type Endpoints = {
  /**
   * Get the product by id.
   */
  getProduct: (params: { id: number }) => Promise<{ id: number; name: string }>;
  /**
   * Get the list of products.
   */
  getProducts: (params: {
    limit: number;
  }) => Promise<{ id: number; name: string }[]>;
  /**
   * Get the category by id.
   */
  getCategory: (id: number) => Promise<{ id: number; name: string }>;
};
