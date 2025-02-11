import { v4 as uuidv4 } from 'uuid';

import RichTextItem from '../types/rich-text-item.interface'
import { components } from '../components/index';
import getHeaderId from './get-header-id';
import RichTextTextComponent from '../components/global/rich-text/components/TextComponent.vue';

const genericComponentTag = 'sb-rich-text-generic-component';

export default function getRichTextItemData (data: any): RichTextItem {
  if (data.type === 'emoji') {
    data = {
      type: 'text',
      text: data.attrs.emoji || '',
      content: data.content,
      attrs: data.attrs,
      marks: data.marks
    };
  }

  switch (data.type) {
    case 'horizontal_rule':
      return {
        id: uuidv4(),
        component: genericComponentTag,
        rootTagName: 'hr'
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
        rootElementId: getHeaderId(+data.attrs.level, data.content),
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
      const link = data.marks?.find((mark: any) => mark.type === 'link');

      if (!link) {
        return {
          id,
          component: RichTextTextComponent,
          content: data.content,
          attrs: data.attrs,
          marks: data.marks,
          text: data.text
        };
      }

      const marks: any[] = [];

      for (const mark of data.marks) {
        if (mark.type === 'link') {
          continue;
        }

        // Remove color override for links
        if (mark.attrs?.color) {
          delete mark.attrs.color;
        }

        marks.push(mark);
      }

      return {
        id,
        component: genericComponentTag,
        rootTagName: 'sb-router-link',
        rootElementAttributes: {
          isNewWindow: link.attrs.target ? link.attrs.target === '_blank' : undefined,
          link: { url: link.attrs.href, anchor: link.attrs.anchor, linktype: link.attrs.linktype }
        },
        content: [{ ...data, marks }]
      }

    case 'list_item':
      return {
        id: uuidv4(),
        component: genericComponentTag,
        rootTagName: 'li',
        content: data.content
      }

    default: {
      throw new Error('Unknown rich text item type: ' + data.type);
    }
  }
}
