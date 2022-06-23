import { v4 as uuidv4 } from 'uuid';

import RichTextItem from '../types/rich-text-item.interface'
import { components } from '../components/index';

const baseElementTag = 'rich-text-base-element';

export default function getRichTextItemData (data: any): RichTextItem {
  switch (data.type) {
    case 'horizontal_rule':
      return {
        id: uuidv4(),
        component: 'hr'
      }
    case 'blockquote':
      return {
        id: uuidv4(),
        component: baseElementTag,
        rootElement: 'blockquote',
        content: data.content
      }
    case 'bullet_list':
      return {
        id: uuidv4(),
        component: baseElementTag,
        rootElement: 'ul',
        content: data.content
      }
    case 'ordered_list':
      return {
        id: uuidv4(),
        component: baseElementTag,
        rootElement: 'ol',
        content: data.content
      }
    case 'code_block':
      return {
        id: uuidv4(),
        component: baseElementTag,
        rootElement: 'code',
        content: data.content,
        attrs: data.attrs
      }

    case 'hard_break':
      return {
        id: uuidv4(),
        component: 'br'
      }
    case 'heading':
      return {
        id: uuidv4(),
        component: baseElementTag,
        rootElement: `h${data.attrs.level}`,
        content: data.content,
        attrs: data.attrs
      }

    case 'image':
      return {
        id: uuidv4(),
        component: baseElementTag,
        rootElement: 'img',
        elementAttributes: data.attrs
      }
    case 'paragraph':
      return {
        id: uuidv4(),
        component: baseElementTag,
        rootElement: 'p',
        content: data.content
      }
    case 'blok':
      return {
        id: data.attrs.id,
        component: components['block'],
        content: data.content,
        ...data.attrs
      }
    case 'text':
      return {
        id: uuidv4(),
        component: 'rich-text-text',
        content: data.content,
        attrs: data.attrs,
        marks: data.marks,
        text: data.text
      }
    case 'list_item':
      return {
        id: uuidv4(),
        component: baseElementTag,
        rootElement: 'li',
        content: data.content
      }
  }
}
