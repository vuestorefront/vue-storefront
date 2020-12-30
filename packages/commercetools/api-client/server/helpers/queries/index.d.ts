import { CustomQueryFn } from './../../types/Api';
declare const getCustomQuery: <T = any>(customQueryFn: CustomQueryFn<T>, params: any) => {
    query: any;
    variables: any;
};
export { getCustomQuery };
