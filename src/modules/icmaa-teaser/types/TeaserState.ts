import { AbstractStateItem } from 'icmaa-cms/types/AbstractState'

export interface TeaserStateItem extends AbstractStateItem {
  size: string,
  active: boolean,
  showFrom: string,
  showTo: string,
  displayOrder: number,
  tag: string[],
  cluster: string[],
  text1: string,
  text2: string,
  text3: string,
  buttonText: string,
  link: string,
  imageUrl: string,
  textColor: string,
  backgroundColor: string,
  [key: string]: any
}

export default interface TeaserState {
  items: TeaserStateItem[]
}
