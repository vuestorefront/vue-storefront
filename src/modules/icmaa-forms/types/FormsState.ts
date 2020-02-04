import { AbstractStateItem } from 'icmaa-cms/types/AbstractState'

export interface FormsStateItem extends AbstractStateItem {
  elements: {
    [key: string]: any
  },
  [key: string]: any
}

export default interface FormsState {
  items: FormsStateItem[]
}
