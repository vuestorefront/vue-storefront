import { AbstractStateItem } from 'icmaa-cms/types/AbstractState'

export interface Competition extends AbstractStateItem {
  [id: string]: any,
  enabled: boolean,
  showFrom: string,
  showTo: string
}

export default interface CompetitionsState {
  items: Competition[]
}
