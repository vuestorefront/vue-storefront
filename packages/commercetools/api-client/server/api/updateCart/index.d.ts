import { CustomQueryFn } from './../../types/Api';
import { CartUpdateAction, MyCartUpdateAction } from '../../types/GraphQL';
export interface UpdateCartParams {
    id: string;
    version: number;
    actions: CartUpdateAction[] | MyCartUpdateAction[];
    versionFallback?: boolean;
}
declare const updateCart: (context: any, params: UpdateCartParams, customQueryFn?: CustomQueryFn) => any;
export default updateCart;
