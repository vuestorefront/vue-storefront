import { RenderComponent } from '@vue-storefront/core'
import { Component } from '../types'

export const extractComponents = (
  contentData: {} | [] = [],
  editable?: boolean,
): RenderComponent[] => {
  let content = contentData
  if (!Array.isArray(contentData)) content = [content]
  return (content as []).map((component: Component): {
    componentName: string
    props: {}
  } => {
    console.log(component)
    const props = Object.keys(component).reduce(
      (res: {}, key: string) => ({
        ...res,
        [key]: component[key],
      }),
      {},
    )
    const isEditable = editable
      ? {
          _editable: component._editable,
        }
      : {}
    return {
      componentName: component.component || 'CustomComponent',
      props,
      ...isEditable,
    }
  })
}
