import { getConfigWithRegex, createRegexpMatcher, flatToRegexpList } from './helpers';
import config from 'config'

const initialResources = getConfigWithRegex(config)

const prefetchRegexps = flatToRegexpList(
  initialResources.filter(filterConfig => filterConfig.rel !== 'preload' && filterConfig.onload)
)
const preloadRegexps = flatToRegexpList(
  initialResources.filter(filterConfig => filterConfig.rel === 'preload' && filterConfig.onload)
)

const addLinksFromManifest = (manifestFilesUrls: string[], loadedFilesUrls: string[], regexps: RegExp[], publicPath: string) => {
  manifestFilesUrls
    .filter((file) => {
      const needToBeLoaded = createRegexpMatcher(file)(regexps)
      const isLoaded = loadedFilesUrls.some(loadedFile => createRegexpMatcher(loadedFile)(regexps))

      return needToBeLoaded && !isLoaded
    })
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

  const loadedFilesUrls = Array.from(document.head.children)
    .map((file: any) => file.src || file.href)
    .filter(Boolean)
    .map(file => {
      const fileUrlParts = file.split('/')
      return fileUrlParts[fileUrlParts.length - 1]
    })

  addLinksFromManifest(ssrManifest.async, loadedFilesUrls, prefetchRegexps, ssrManifest.publicPath)
  addLinksFromManifest(ssrManifest.initial, loadedFilesUrls, preloadRegexps, ssrManifest.publicPath)
}
