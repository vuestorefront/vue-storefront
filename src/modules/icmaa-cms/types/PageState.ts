export interface PageStateItem {
  identifier: string,
  content: string,
  language: string
}

export default interface PageState {
  items: PageStateItem[]
}
