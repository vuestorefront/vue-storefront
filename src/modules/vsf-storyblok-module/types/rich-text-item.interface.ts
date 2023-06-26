export default interface RichTextItem {
  id: string,
  component: string,
  rootTagName?: string,
  text?: string,
  content?: any[],
  attrs?: any,
  rootElementAttributes?: any,
  rootElementId?: string,
  marks?: {
    type: 'link' | 'strike' | 'italic' | 'bold' | 'underline' | 'styled' | 'textStyle',
    attrs?: {
      href?: string,
      target?: '_blank' | '_current',
      class?: string,
      anchor?: string,
      color?: string
    }
  }[]

}
