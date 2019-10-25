import { AbstractStateItem } from 'icmaa-cms/types/AbstractState'

export interface SearchAliasStateItem extends AbstractStateItem {
  alias: string,
  search: string
}

export default interface SearchAliasState {
  items: SearchAliasStateItem[]
}
