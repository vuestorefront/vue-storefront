import { removeStoreCodeFromRoute } from '@vue-storefront/core/lib/multistore'
import storeCodeFromRoute from '@vue-storefront/core/lib/storeCodeFromRoute'
import qs from 'qs'

export function loadScript (src: string, id: string) {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve()
      return
    }
    var script = document.createElement('script')
    script.async = true
    script.src = src
    script.onerror = function onError () {
      reject(new Error('Failed to load' + src))
    }
    script.onload = function onLoad () {
      script.id = id
      resolve()
    }
    document.getElementsByTagName('head')[0].appendChild(script)
  })
}

export function getStoryblokQueryParams (route) {
  const queryString = route.fullPath.replace(route.path, '')
  const { _storyblok: id, _storyblok_c: c, _storyblok_tk: storyblok = {} } = qs.parse(queryString, { ignoreQueryPrefix: true })
  const { space_id: spaceId, timestamp, token } = storyblok
  let fullSlug = route.path.substring(1)
  if (!fullSlug) {
    fullSlug = 'home'
  }

  const storeCode = storeCodeFromRoute(fullSlug)
  if (storeCode && fullSlug === removeStoreCodeFromRoute(fullSlug)) {
    fullSlug = `${fullSlug}/home`
  }

  return {
    c,
    id,
    fullSlug,
    spaceId,
    timestamp,
    token
  }
}

const defaultSettings = {
  addRoutes: true,
  hreflangPrefix: '',
  appendStoreCodeFromHeader: false
}

export const getSettings = (settings = {}) => ({
  ...defaultSettings,
  ...settings
})
