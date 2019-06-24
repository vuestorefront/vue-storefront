export interface BlockStateItem {
  identifier: string,
  content: string,
  language: string
}

export default interface BlockState {
  items: BlockStateItem[]
}
