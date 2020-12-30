import { CustomQueryFn } from '../../index';
import { CartData } from './../../types/Api';
declare const createCart: ({ config, client }: {
    config: any;
    client: any;
}, cartDraft?: CartData, customQueryFn?: CustomQueryFn) => Promise<any>;
export default createCart;
