import { RenderComponent } from '@vue-storefront/core'
import { Component } from '../types'
import { buildImageObject } from '../helpers'

export const extractComponents = (
  contentData: {} | [] = [],
): RenderComponent[] => {
  let content = contentData
  if (!Array.isArray(contentData)) content = [content]
  return (content as []).map(
    (
      component: Component,
    ): {
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
      if (props.image) {
        props.image = {
          url: props.image,
        }
      }
      return {
        componentName: component.component || 'CustomComponent',
        props,
      }
    },
  )
}
