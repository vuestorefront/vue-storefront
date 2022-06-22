import RichTextItem from '../types/rich-text-item.interface'
import { components } from '../components/index';

export default function getRichTextItemData (data: any): RichTextItem {
  switch (data.type) {
    case 'horizontal_rule':
      return {
        id: 'hr',
        component: 'hr'
      }
    case 'blockquote':
      return {
        id: 'blockquote',
        component: 'rich-text-base-element',
        rootElement: 'blockquote',
        content: data.content
      }
    case 'bullet_list':
      return {
        id: 'bullet_list',
        component: 'rich-text-base-element',
        rootElement: 'ul',
        content: data.content
      }
    case 'ordered_list':
      return {
        id: 'ordered_list',
        component: 'rich-text-base-element',
        rootElement: 'ol',
        content: data.content
      }
    case 'code_block':
      return {
        id: 'code_block',
        component: 'rich-text-base-element',
        rootElement: 'code',
        content: data.content,
        attrs: data.attrs
      }

    case 'hard_break':
      return {
        id: 'hard_break',
        component: 'br'
      }
    case 'heading':
      return {
        id: 'heading',
        component: 'rich-text-base-element',
        rootElement: `h${data.attrs.level}`,
        content: data.content,
        attrs: data.attrs
      }

    case 'image':
      console.log(data);
      return {
        id: 'image',
        component: 'rich-text-base-element',
        rootElement: 'img',
        elementAttributes: data.attrs
      }
    case 'paragraph':
      return {
        id: 'paragraph',
        component: 'rich-text-base-element',
        rootElement: 'p',
        content: data.content
      }
    case 'blok':
      return {
        id: 'blok',
        component: components['block'],
        content: data.content,
        ...data.attrs
      }
    case 'text':
      return {
        id: `text_${Math.random()}`,
        component: 'rich-text-text',
        content: data.content,
        attrs: data.attrs,
        marks: data.marks,
        text: data.text
      }
    case 'list_item':
      return {
        id: `list_item${Math.random()}`,
        component: 'rich-text-base-element',
        rootElement: 'li',
        content: data.content
      }
  }
}
