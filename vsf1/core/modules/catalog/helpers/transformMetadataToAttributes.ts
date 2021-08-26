import uniqBy from 'lodash-es/uniqBy'

const transformMetadataToAttributes = (attributeMetadata) => attributeMetadata
  .reduce((prev, curr) => ([ ...prev, ...curr ]), [])
  .reduce((prev, curr) => {
    const attribute = prev.find(a => a.attribute_id === curr.attribute_id && a.options)

    if (attribute) {
      return prev.map(attr => {
        if (attr.attribute_id === curr.attribute_id) {
          return {
            ...attr,
            options: uniqBy([...(attr.options || []), ...(curr.options || [])], (obj) => `${obj.label}_${obj.value}`)
          }
        }

        return attr
      })
    }

    return [...prev, curr]
  }, [])
  .reduce((prev, curr) => ({
    attrHashByCode: {
      ...(prev.attrHashByCode || {}),
      [curr.attribute_code]: curr
    },
    attrHashById: {
      ...(prev.attrHashById || {}),
      [curr.attribute_id]: curr
    }
  }), { attrHashByCode: {}, attrHashById: {} })

export default transformMetadataToAttributes
