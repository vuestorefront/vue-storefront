export interface TeaserStateItem {
  identifier: string,
  content: string
}

export default interface TeaserState {
  items: TeaserStateItem[]
}
