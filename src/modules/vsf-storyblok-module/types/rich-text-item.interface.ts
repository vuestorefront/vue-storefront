export default interface RichTextItem {
  id: string,
  component: string,
  rootTagName?: string,
  text?: string,
  content?: any[],
  attrs?: any,
  rootElementAttributes?: any,
  marks?: {
    type: 'link' | 'strike' | 'italic' | 'bold' | 'underline' | 'styled',
    attrs?: {
      href?: string,
      target?: '_blank' | '_current',
      class?: string
    }
  }[]

}
