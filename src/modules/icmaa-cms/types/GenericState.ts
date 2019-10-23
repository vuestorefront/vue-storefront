import { AbstractStateItem } from 'icmaa-cms/types/AbstractState'

export interface GenericStateItem extends AbstractStateItem {
  [key: string]: any
}

export default interface GenericState {
  items: GenericStateItem[]
}
