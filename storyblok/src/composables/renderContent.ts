import { RenderComponent } from '@vue-storefront/core'
import { Component } from '../types'

export const extractComponents = (
  contentData: {} | [] = [],
): RenderComponent[] => {
  let content = contentData
  if (!Array.isArray(contentData)) content = [content]
  return (content as []).map((component: Component): {
    componentName: string
    props: {}
  } => {
    const props = Object.keys(component).reduce(
      (res: {}, key: string) => ({
        ...res,
        [key]: component[key],
      }),
      {},
    )
    return {
      componentName: component.component || 'CustomComponent',
      props,
    }
  })
}
