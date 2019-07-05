export interface AbstractStateItem {
  identifier: string,
  content: string,
  language: string
}

export default interface AbstractState {
  items: AbstractStateItem[]
}
