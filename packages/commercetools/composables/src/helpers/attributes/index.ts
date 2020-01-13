import { Attribute } from '../../types/GraphQL'

const getAttributeValue = (attribute: Attribute) => {
  if ((attribute as any).__typename === 'StringAttribute') {
    return (attribute as any).stringValue
  }

  if ((attribute as any).__typename === 'EnumAttribute') {
    return (attribute as any).label
  }

  if ((attribute as any).__typename === 'LocalizedEnumAttribute') {
    return ((attribute as any) as any).localizedLabel
  }

  if ((attribute as any).__typename === 'LocalizedStringAttribute') {
    return (attribute as any).localizedString
  }

  if ((attribute as any).__typename === 'BooleanAttribute') {
    return (attribute as any).booleanValue
  }

  return null
}

export { getAttributeValue }
