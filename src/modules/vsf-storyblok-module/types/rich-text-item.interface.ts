import { Component } from 'vue';

export default interface RichTextItem {
  id: string,
  component: string | Component,
  rootTagName?: string,
  text?: string,
  content?: any[],
  attrs?: any,
  rootElementAttributes?: any,
  rootElementId?: string,
  marks?: {
    type: 'link' | 'strike' | 'italic' | 'bold' | 'underline' | 'styled' | 'textStyle' | 'highlight' | 'code' | 'emoji',
    attrs?: {
      href?: string,
      target?: '_blank' | '_current',
      class?: string,
      anchor?: string,
      color?: string,
      emoji?: string
    }
  }[]

}
