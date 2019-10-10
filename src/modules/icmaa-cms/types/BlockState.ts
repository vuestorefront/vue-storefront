import { AbstractStateItem } from './AbstractState'

export interface BlockStateItem extends AbstractStateItem {
  content: string
}

export default interface BlockState {
  items: BlockStateItem[]
}
