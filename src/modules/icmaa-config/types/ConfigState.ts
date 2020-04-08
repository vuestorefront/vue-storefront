import { StoreView as StoreViewAbstract } from '@vue-storefront/core/lib/types'

export interface StoreView extends StoreViewAbstract {
  [key: string]: any
}

export default interface ConfigState {
  map: StoreView[]
}
