import { AbstractStateItem } from 'icmaa-cms/types/AbstractState'

export interface AdviceStateItem extends AbstractStateItem {
  active: boolean,
  showFrom: string,
  showTo: string,
  tag: string[],
  cluster: string[],
  text: string,
  buttonText: string,
  link: string,
  [key: string]: any
}

export default interface AdviceState {
  items: AdviceStateItem[]
}
