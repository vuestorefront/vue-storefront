export type Endpoints = {
  getProduct: (params: { id: number }) => Promise<{ id: number; name: string }>;
  getProducts: (params: {
    limit: number;
  }) => Promise<{ id: number; name: string }[]>;
};
