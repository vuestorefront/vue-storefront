declare const getProducts: ({ skus, locale }: {
    skus: string[];
    locale?: string;
}) => Promise<any>;
export default getProducts;
