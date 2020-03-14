const loadResources = async () => {
  let ssrManifest = null
  try {
    ssrManifest = (await (await fetch('/dist/vue-ssr-client-manifest.json')).json()) || null
  } catch (_) {
    ssrManifest = null
  }
  if (!ssrManifest) return

  const loadedFilesUrls = Array.from(document.head.children)
    .map((file: any) => file.src || file.href)
    .filter(Boolean)
    .map(file => {
      const fileUrlParts = file.split('/')
      return fileUrlParts[fileUrlParts.length - 1]
    })

  ssrManifest.async
    .filter(file => !loadedFilesUrls.includes(file))
    .map((file) => {
      const link = document.createElement('link')
      link.href = ssrManifest.publicPath + file
      link.as = file.match(/\.css$/) ? 'style' : 'script'
      link.rel = 'prefetch'
      return link
    })
    .forEach(linkElement => {
      document.head.appendChild(linkElement)
    })
}

export default loadResources
