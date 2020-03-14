import { getConfigWithRegex, createRegexpMatcher, flatToRegexpList } from './helpers';
import config from 'config'

const initialResources = getConfigWithRegex(config)

const prefetchRegexps = flatToRegexpList(
  initialResources.filter(filterConfig => filterConfig.rel !== 'preload' && filterConfig.onload)
)
const preloadRegexps = flatToRegexpList(
  initialResources.filter(filterConfig => filterConfig.rel === 'preload' && filterConfig.onload)
)

const addLinksFromManifest = (manifestFilesUrls: string[], regexps: RegExp[], publicPath: string) => {
  manifestFilesUrls
    .filter((file) => createRegexpMatcher(file)(regexps))
    .forEach((file) => {
      const link = document.createElement('link')
      link.href = publicPath + file
      link.rel = 'prefetch'

      document.head.appendChild(link)
    })
}

const getManifest = async () => {
  let ssrManifest = null
  try {
    ssrManifest = (await (await fetch('/dist/vue-ssr-client-manifest.json')).json()) || null
  } catch (_) {
    ssrManifest = null
  }
  return ssrManifest
}

export default async () => {
  const ssrManifest = await getManifest()
  if (!ssrManifest) return

  addLinksFromManifest(ssrManifest.async, prefetchRegexps, ssrManifest.publicPath)
  addLinksFromManifest(ssrManifest.initial, preloadRegexps, ssrManifest.publicPath)
}
