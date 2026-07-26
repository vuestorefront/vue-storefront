const fs = require('fs')
const path = require('path')

const repositoryRoot = path.resolve(__dirname, '../..')
const sourceRoots = ['core', 'src']
const productionExtensions = new Set(['.js', '.ts', '.vue'])
const ignoredSegments = new Set(['test', 'tests', 'node_modules', 'dist'])
const prohibitedPatterns = [
  ['current-instance helper', /\buse(?:Current|Root)Instance\b/g],
  ['root instance lookup', /\$root\b/g],
  ['EventBus prototype access', /\$bus\b/g],
  ['Additional Content prototype access', /\$additionalContent\b/g],
  ['head prototype access', /\$extendedHead\b/g],
  ['request-context prototype access', /\$ssrRequestContext\b/g],
  ['device prototype access', /\$device\b/g],
  ['config prototype access', /\$config\b/g],
  ['Storyblok component prototype access', /(?:Vue\.prototype|this)\.\$storyblokClient\b/g]
]
const allowedCacheTagCounts = {
  'core/app.ts': 1,
  'core/client-entry.ts': 2,
  'core/data-resolver/CategoryService.ts': 5,
  'core/data-resolver/ProductService.ts': 5,
  'core/server-entry.ts': 1,
  'src/modules/backend-settings/store/getters.ts': 3,
  'src/modules/budsies/store/actions.ts': 8,
  'src/modules/gift-card/store/actions.ts': 2,
  'src/modules/url-rewrite/mappingFallback.ts': 3,
  'src/modules/vsf-storyblok-module/store/actions.ts': 5
}
const allowedComponentCacheTags = new Set([
  'src/themes/petsies-capybara/App.vue',
  'src/themes/petsies-capybara/pages/Authorization/Auth.vue'
])

function collectProductionFiles (directory) {
  const files = []
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (ignoredSegments.has(entry.name)) {
      continue
    }
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...collectProductionFiles(entryPath))
      continue
    }
    if (productionExtensions.has(path.extname(entry.name)) && !entry.name.includes('.spec.')) {
      files.push(entryPath)
    }
  }
  return files
}

const failures = []
const observedCacheTagCounts = {}

for (const sourceRoot of sourceRoots) {
  for (const file of collectProductionFiles(path.join(repositoryRoot, sourceRoot))) {
    const relativeFile = path.relative(repositoryRoot, file)
    const source = fs.readFileSync(file, 'utf8')

    for (const [label, pattern] of prohibitedPatterns) {
      for (const match of source.matchAll(pattern)) {
        const line = source.slice(0, match.index).split('\n').length
        failures.push(`${relativeFile}:${line}: prohibited ${label}`)
      }
    }

    const cacheTagCount = (source.match(/\$cacheTags/g) || []).length
    if (cacheTagCount) {
      observedCacheTagCounts[relativeFile] = cacheTagCount
    }

    const componentContextMatches = source.match(/\$ssrContext\b/g) || []
    if (componentContextMatches.length) {
      const allowed = allowedComponentCacheTags.has(relativeFile) &&
        componentContextMatches.length === 1 &&
        source.includes('$ssrContext.output.cacheTags')
      if (!allowed) {
        failures.push(`${relativeFile}: prohibited component $ssrContext access`)
      }
    }
  }
}

if (JSON.stringify(observedCacheTagCounts) !== JSON.stringify(allowedCacheTagCounts)) {
  failures.push(
    `temporary $cacheTags inventory changed: ${JSON.stringify(observedCacheTagCounts)}`
  )
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else {
  console.log('Vue instance access gate passed.')
}
