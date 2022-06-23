export default interface RichTextItem {
  id: string,
  component: string,
  rootElement?: string,
  text?: string,
  content?: any[],
  attrs?: any,
  elementAttributes?: any,
  marks?: {
    type: 'link' | 'strike' | 'italic' | 'bold' | 'underline' | 'styled',
    attrs?: {
      href?: string,
      target?: '_blank' | '_current',
      class?: string
    }
  }[]

}
