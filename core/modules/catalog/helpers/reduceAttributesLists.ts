import Attribute from '@vue-storefront/core/modules/catalog/types/Attribute'

const reduceAttributes = (prev, curr) => {
  if (curr) {
    prev.attrHashByCode[curr.attribute_code] = curr
    prev.attrHashById[curr.attribute_id] = curr
  }

  return prev
}

const reduceAttributesLists = ({
  codesList,
  idsList,
  attributes
}: {
  codesList: any,
  idsList: any,
  attributes: Attribute[]
}) => {
  return attributes.reduce(
    reduceAttributes, { attrHashByCode: codesList, attrHashById: idsList }
  )
}

export default reduceAttributesLists
