import config from 'config'

const getPrismicParams = (type, orderings, contentId, filter, filterOption) => {
  console.log('!!!id ', contentId, ' || ', type)
  let url
  let getterName = 'contentById'
  let parameter = 'id'
  switch(true) {
    case contentId && !filter:
      url = (config.prismic.contentId)
        .replace('{{contentId}}', contentId)
      break;
    case contentId && filter:
      url = (config.prismic.contentIdFilter)
        .replace('{{contentId}}', contentId)
        .replace('{{filter}}', filter)
        .replace('{{filterOption}}', filterOption)
      break;
    case type:
      getterName = 'contentByType'
      parameter = 'type'
      url = (config.prismic.byType)
        .replace('{{type}}', type)
      break;
    case orderings:
      getterName = 'contentByTag'
      parameter = 'tag'
      url = (config.prismic.byTag)
        .replace('{{tag}}', orderings)
      break;
    default:
      throw new Error(`[CmsPrismic Module] Give fetching parameter`)
  }
  return { url: url, getterName: getterName, parameter: parameter }
}

export {getPrismicParams}
