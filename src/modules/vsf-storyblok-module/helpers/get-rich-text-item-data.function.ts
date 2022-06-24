import { v4 as uuidv4 } from 'uuid';

import RichTextItem from '../types/rich-text-item.interface'
import { components } from '../components/index';

const genericComponentTag = 'sb-rich-text-generic-component';

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
        component: genericComponentTag,
        rootTagName: 'blockquote',
        content: data.content
      }
    case 'bullet_list':
      return {
        id: uuidv4(),
        component: genericComponentTag,
        rootTagName: 'ul',
        content: data.content
      }
    case 'ordered_list':
      return {
        id: uuidv4(),
        component: genericComponentTag,
        rootTagName: 'ol',
        content: data.content
      }
    case 'code_block':
      return {
        id: uuidv4(),
        component: genericComponentTag,
        rootTagName: 'code',
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
        component: genericComponentTag,
        rootTagName: `h${data.attrs.level}`,
        content: data.content,
        attrs: data.attrs
      }

    case 'image':
      return {
        id: uuidv4(),
        component: genericComponentTag,
        rootTagName: 'img',
        rootElementAttributes: data.attrs
      }
    case 'paragraph':
      return {
        id: uuidv4(),
        component: genericComponentTag,
        rootTagName: 'p',
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
      const id = uuidv4();
      const link = data.marks?.find((mark) => mark.type === 'link');

      if (!link) {
        return {
          id,
          component: 'sb-rich-text-text-component',
          content: data.content,
          attrs: data.attrs,
          marks: data.marks,
          text: data.text
        };
      }

      return {
        id,
        component: genericComponentTag,
        rootTagName: 'sb-router-link',
        rootElementAttributes: {
          isNewWindow: link.attrs.target === '_blank',
          link: { url: link.attrs.href }
        },
        content: [{ ...data, marks: data.marks.filter((mark) => mark.type !== 'link') }]
      }

    case 'list_item':
      return {
        id: uuidv4(),
        component: genericComponentTag,
        rootTagName: 'li',
        content: data.content
      }
  }
}
