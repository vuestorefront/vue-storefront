import camelCase from 'lodash-es/camelCase'

export default {
  metaInfo () {
    let meta: any = {}
    const metaKeys = ['title', 'tags', 'description', 'og:image', 'og:title']

    metaKeys.forEach((value) => {
      const key = camelCase('meta-' + value)
      if (this.page.hasOwnProperty(key) && this.page[key] !== '') {
        if (value === 'title') {
          meta[value] = this.page[key]
        } else {
          if (!meta.hasOwnProperty('meta')) {
            meta['meta'] = []
          }

          meta.meta.push({
            vmid: value,
            name: value,
            content: this.page[key]
          })
        }
      }
    })
    return meta
  }
}
