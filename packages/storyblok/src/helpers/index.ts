import { Content, Image } from '../types';

export const buildImageObject = (
  items: Image[],
  actions: { replace: boolean } = { replace: false }
): Image[] | Image => {
  return items.map((item: { image }) => {
    const { replace } = actions;
    if (item.image) {
      const { image } = item;
      const itemObject = replace
        ? { ...item, url: image }
        : {
          ...item,
          image: {
            url: image
          }
        };
      if (replace) delete itemObject.image;
      return itemObject;
    }
    return item;
  });
};
export const extractNestedComponents: (
  data:
    | {
        content: Content[]
      }
    | Content[]
    | Content,
  stories?: boolean,
) => void | boolean = (data: Content, stories = false) => {
  if (data.content) {
    extractNestedComponents(data.content);
    if (Array.isArray(data.content)) {
      data.content = data.content.map((component) => {
        extractNestedComponents(component);
        if (component.content) {
          return {
            component: component.component,
            content: component.content,
            _meta: component
          };
        }
        return component;
      });
    }
  }
  return {
    ...data.content,
    _meta: !stories ? data : null
  };
};
