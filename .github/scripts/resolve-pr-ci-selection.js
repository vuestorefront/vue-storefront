#!/usr/bin/env node

const fs = require('fs')

const DEFAULT_PAYMENT_BRANCH = 'optimuspro'
const DEFAULT_THEMES_BY_BASE_BRANCH = {
  'petsies-theme': ['petsies-theme', 'budsies-theme', 'waggables-theme'],
  'bulkorders-theme': ['bulkorders-theme']
}
const ALL_DEFAULT_THEMES = Object.values(DEFAULT_THEMES_BY_BASE_BRANCH).flat()
const REPOSITORIES = {
  payment: { owner: 'BudsiesApp', name: 'vsf-payment-braintree' },
  theme: { owner: 'BudsiesApp', name: 'vsf-capybara' }
}

class SelectionError extends Error {}

function taskNumberFromBranch (branchName) {
  const match = /^(\d+)(?:[-_]|$)/.exec(branchName || '')
  return match ? match[1] : null
}

function defaultThemesForBaseBranch (baseBranch) {
  if (DEFAULT_THEMES_BY_BASE_BRANCH[baseBranch]) {
    return {
      branches: DEFAULT_THEMES_BY_BASE_BRANCH[baseBranch],
      warning: null
    }
  }

  return {
    branches: ALL_DEFAULT_THEMES,
    warning: `Target branch "${baseBranch}" has no theme mapping; using every default theme.`
  }
}

function formatPull (pull) {
  return `#${pull.number} (${pull.head})`
}

function uniqueSorted (items) {
  return Array.from(new Set(items)).sort()
}

async function openPullsForBranches (client, repository, branches) {
  const pullGroups = await Promise.all(branches.map(async branch => {
    const pulls = await client.listOpenPullRequests(repository, branch)
    return pulls.map(pull => ({ ...pull, branch }))
  }))

  return pullGroups.flat()
}

async function resolvePaymentBranch (client, taskNumber) {
  const branches = await client.listTaskBranches(REPOSITORIES.payment, taskNumber)

  if (branches.length === 0) {
    return {
      branch: DEFAULT_PAYMENT_BRANCH,
      message: `No payment branch begins with ${taskNumber}; using ${DEFAULT_PAYMENT_BRANCH}.`
    }
  }

  const pulls = await openPullsForBranches(client, REPOSITORIES.payment, branches)

  if (pulls.length > 1) {
    throw new SelectionError(
      `Multiple open payment pull requests match task ${taskNumber}: ${pulls.map(formatPull).join(', ')}`
    )
  }

  if (pulls.length === 1) {
    return {
      branch: pulls[0].head,
      message: `Using payment branch ${pulls[0].head} from ${formatPull(pulls[0])}.`
    }
  }

  if (branches.length === 1) {
    return {
      branch: branches[0],
      message: `Using the only payment branch beginning with ${taskNumber}: ${branches[0]}.`
    }
  }

  throw new SelectionError(
    `Multiple payment branches match task ${taskNumber}, but none has an open pull request: ${branches.join(', ')}`
  )
}

async function resolveThemeBranches (client, taskNumber, defaultThemes) {
  const branches = await client.listTaskBranches(REPOSITORIES.theme, taskNumber)
  const pulls = await openPullsForBranches(client, REPOSITORIES.theme, branches)
  const relevantBranches = uniqueSorted(
    pulls
      .filter(pull => defaultThemes.includes(pull.base))
      .map(pull => pull.head)
  )

  if (relevantBranches.length > 0) {
    return {
      branches: relevantBranches,
      message: `Using task-specific theme branches: ${relevantBranches.join(', ')}.`
    }
  }

  return {
    branches: defaultThemes,
    message: `No relevant task-specific theme pull request exists; using defaults: ${defaultThemes.join(', ')}.`
  }
}

async function resolvePullRequestSelection ({ client, headBranch, baseBranch }) {
  const defaults = defaultThemesForBaseBranch(baseBranch)
  const taskNumber = taskNumberFromBranch(headBranch)
  const messages = defaults.warning ? [defaults.warning] : []

  if (!taskNumber) {
    messages.push(`Source branch "${headBranch}" has no leading task number; using default branches.`)
    return {
      taskNumber: null,
      paymentBranch: DEFAULT_PAYMENT_BRANCH,
      themeBranches: defaults.branches,
      messages
    }
  }

  const [payment, themes] = await Promise.all([
    resolvePaymentBranch(client, taskNumber),
    resolveThemeBranches(client, taskNumber, defaults.branches)
  ])
  messages.push(payment.message, themes.message)

  return {
    taskNumber,
    paymentBranch: payment.branch,
    themeBranches: themes.branches,
    messages
  }
}

function resolvePushSelection (branchName) {
  const defaults = DEFAULT_THEMES_BY_BASE_BRANCH[branchName]
  if (!defaults) {
    throw new SelectionError(`Unsupported push branch: ${branchName}`)
  }

  return {
    taskNumber: null,
    paymentBranch: DEFAULT_PAYMENT_BRANCH,
    themeBranches: defaults,
    messages: [`Using static branches for push to ${branchName}.`]
  }
}

function createGitHubClient ({ token, apiUrl = 'https://api.github.com', fetchImpl = global.fetch }) {
  if (typeof fetchImpl !== 'function') {
    throw new SelectionError('A fetch implementation is required to query GitHub.')
  }

  async function request (path) {
    const response = await fetchImpl(new URL(path, apiUrl), {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'BudsiesApp-vue-storefront-ci',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    })
    const body = await response.text()

    if (!response.ok) {
      throw new SelectionError(`GitHub API request failed (${response.status}): ${body}`)
    }

    return JSON.parse(body)
  }

  return {
    async listTaskBranches (repository, taskNumber) {
      const prefix = new RegExp(`^${taskNumber}(?:[-_]|$)`)
      const branches = []
      let page = 1

      while (true) {
        const result = await request(
          `/repos/${repository.owner}/${repository.name}/branches?per_page=100&page=${page}`
        )
        branches.push(...result.map(branch => branch.name))

        if (result.length < 100) {
          return branches.filter(branch => prefix.test(branch)).sort()
        }

        page += 1
      }
    },

    async listOpenPullRequests (repository, branch) {
      const query = new URLSearchParams({
        state: 'open',
        head: `${repository.owner}:${branch}`,
        per_page: '100'
      })
      const pulls = await request(`/repos/${repository.owner}/${repository.name}/pulls?${query}`)

      return pulls.map(pull => ({
        number: pull.number,
        head: pull.head.ref,
        base: pull.base.ref
      }))
    }
  }
}

function writeOutput (name, value) {
  if (!process.env.GITHUB_OUTPUT) {
    return
  }

  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`)
}

async function main () {
  const eventName = process.env.CI_EVENT_NAME
  const client = createGitHubClient({
    token: process.env.GITHUB_TOKEN,
    apiUrl: process.env.GITHUB_API_URL
  })
  const selection = eventName === 'pull_request'
    ? await resolvePullRequestSelection({
      client,
      headBranch: process.env.PR_HEAD_BRANCH,
      baseBranch: process.env.PR_BASE_BRANCH
    })
    : resolvePushSelection(process.env.REF_NAME)
  const matrix = JSON.stringify({
    include: selection.themeBranches.map(themeBranch => ({ theme_branch: themeBranch }))
  })

  selection.messages.forEach(message => console.log(message))
  console.log(`Payment branch: ${selection.paymentBranch}`)
  console.log(`Theme matrix: ${selection.themeBranches.join(', ')}`)
  writeOutput('matrix', matrix)
  writeOutput('payment_branch', selection.paymentBranch)
  writeOutput('task_number', selection.taskNumber || '')

  if (!process.env.GITHUB_OUTPUT) {
    console.log(JSON.stringify({ matrix, paymentBranch: selection.paymentBranch }))
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error(error.message)
    process.exitCode = 1
  })
}

module.exports = {
  ALL_DEFAULT_THEMES,
  DEFAULT_PAYMENT_BRANCH,
  REPOSITORIES,
  SelectionError,
  createGitHubClient,
  defaultThemesForBaseBranch,
  resolvePullRequestSelection,
  resolvePushSelection,
  taskNumberFromBranch
}
