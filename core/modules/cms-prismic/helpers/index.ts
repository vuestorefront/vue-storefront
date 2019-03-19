import config from 'config'

const getPrismicParams = (type, tag, contentId, filter, filterOption) => {
  let url
  let parameter = contentId
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
    case type && !contentId:
      parameter = type
      url = (config.prismic.byType)
        .replace('{{type}}', type)
      break;
    case tag && !contentId:
      parameter = '#' + tag
      url = (config.prismic.byTag)
        .replace('{{tag}}', tag)
      break;
    default:
      throw new Error(`[CmsPrismic Module] Give fetching parameter`)
  }
  return { url: url, parameter: parameter }
}

export {getPrismicParams}
