import { RenderComponent } from '@vue-storefront/core'
import { Component } from '../types'

const buildImageObject = (
  items: { image: string }[],
  actions: { replace: boolean } = { replace: false },
) => {
  return items.map((item: { image }) => {
    const { replace } = actions
    if (item.image) {
      const image = item.image
      const itemObject = replace
        ? { ...item, url: image }
        : {
            ...item,
            image: {
              url: image,
            },
          }
      if (replace) delete itemObject.image
      return itemObject
    }
    return item
  })
}

export const extractComponents = (
  contentData: {} | [] = [],
): RenderComponent[] => {
  let content = contentData
  if (!Array.isArray(contentData)) content = [content]
  return (content as []).map((component: Component): {
    componentName: string
    props: any
  } => {
    const props = Object.keys(component).reduce(
      (res: any, key: string) => ({
        ...res,
        [key]: component[key],
      }),
      {},
    )
    if (props.items && Array.isArray(props.items)) {
      props.items = buildImageObject(props.items)
    }
    if (props.images && Array.isArray(props.images)) {
      props.images = buildImageObject(props.images, { replace: true })
    }
    return {
      componentName: component.component || 'CustomComponent',
      props,
    }
  })
}
