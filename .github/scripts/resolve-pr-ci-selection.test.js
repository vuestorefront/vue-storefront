const assert = require('node:assert/strict')
const test = require('node:test')

const {
  DEFAULT_PAYMENT_BRANCH,
  REPOSITORIES,
  SelectionError,
  createGitHubClient,
  resolvePullRequestSelection
} = require('./resolve-pr-ci-selection')

function createClient ({ branches = {}, pulls = {} } = {}) {
  return {
    async listTaskBranches (repository) {
      return branches[repository.name] || []
    },
    async listOpenPullRequests (repository, branch) {
      return pulls[`${repository.name}:${branch}`] || []
    }
  }
}

function jsonResponse (value) {
  return {
    ok: true,
    status: 200,
    async text () {
      return JSON.stringify(value)
    }
  }
}

test('GitHub client filters task branches and queries pull requests by source branch', async () => {
  const requests = []
  const client = createGitHubClient({
    apiUrl: 'https://api.github.test',
    fetchImpl: async url => {
      requests.push(url.toString())
      if (url.pathname.endsWith('/branches')) {
        return jsonResponse([{ name: '36838-payment-ci' }, { name: '368380-other-task' }])
      }

      return jsonResponse([
        {
          number: 24,
          head: { ref: '36838-payment-ci' },
          base: { ref: 'optimuspro' }
        }
      ])
    }
  })

  assert.deepEqual(
    await client.listTaskBranches(REPOSITORIES.payment, '36838'),
    ['36838-payment-ci']
  )
  assert.deepEqual(
    await client.listOpenPullRequests(REPOSITORIES.payment, '36838-payment-ci'),
    [{ number: 24, head: '36838-payment-ci', base: 'optimuspro' }]
  )
  assert.match(requests[1], /head=BudsiesApp%3A36838-payment-ci/)
})

test('uses defaults when the storefront branch has no task number', async () => {
  const client = createClient()
  const selection = await resolvePullRequestSelection({
    client,
    headBranch: 'dependabot/npm_and_yarn/typescript-5.9.3',
    baseBranch: 'petsies-theme'
  })

  assert.equal(selection.paymentBranch, DEFAULT_PAYMENT_BRANCH)
  assert.deepEqual(selection.themeBranches, ['petsies-theme', 'budsies-theme', 'waggables-theme'])
})

test('uses every default theme for an unrecognized target branch', async () => {
  const selection = await resolvePullRequestSelection({
    client: createClient(),
    headBranch: '36838-ci-selection',
    baseBranch: 'feature-base'
  })

  assert.deepEqual(selection.themeBranches, [
    'petsies-theme',
    'budsies-theme',
    'waggables-theme',
    'bulkorders-theme'
  ])
})

test('uses the payment branch with the only matching open payment pull request', async () => {
  const paymentBranch = '36838-payment-ci'
  const selection = await resolvePullRequestSelection({
    client: createClient({
      branches: { [REPOSITORIES.payment.name]: [paymentBranch] },
      pulls: {
        [`${REPOSITORIES.payment.name}:${paymentBranch}`]: [
          { number: 24, head: paymentBranch, base: 'optimuspro' }
        ]
      }
    }),
    headBranch: '36838-ci-selection',
    baseBranch: 'petsies-theme'
  })

  assert.equal(selection.paymentBranch, paymentBranch)
})

test('fails when more than one payment pull request matches the task', async () => {
  const firstBranch = '36838-payment-a'
  const secondBranch = '36838-payment-b'

  await assert.rejects(
    resolvePullRequestSelection({
      client: createClient({
        branches: { [REPOSITORIES.payment.name]: [firstBranch, secondBranch] },
        pulls: {
          [`${REPOSITORIES.payment.name}:${firstBranch}`]: [
            { number: 24, head: firstBranch, base: 'optimuspro' }
          ],
          [`${REPOSITORIES.payment.name}:${secondBranch}`]: [
            { number: 25, head: secondBranch, base: 'optimuspro' }
          ]
        }
      }),
      headBranch: '36838-ci-selection',
      baseBranch: 'petsies-theme'
    }),
    SelectionError
  )
})

test('fails when multiple payment branches have no open pull request', async () => {
  await assert.rejects(
    resolvePullRequestSelection({
      client: createClient({
        branches: { [REPOSITORIES.payment.name]: ['36838-payment-a', '36838-payment-b'] }
      }),
      headBranch: '36838-ci-selection',
      baseBranch: 'petsies-theme'
    }),
    /none has an open pull request/
  )
})

test('uses only task-specific theme branches whose pull requests target relevant themes', async () => {
  const petsiesBranch = '36838-petsies-checkout'
  const bulkordersBranch = '36838-bulkorders-checkout'
  const selection = await resolvePullRequestSelection({
    client: createClient({
      branches: {
        [REPOSITORIES.theme.name]: [petsiesBranch, bulkordersBranch]
      },
      pulls: {
        [`${REPOSITORIES.theme.name}:${petsiesBranch}`]: [
          { number: 72, head: petsiesBranch, base: 'petsies-theme' }
        ],
        [`${REPOSITORIES.theme.name}:${bulkordersBranch}`]: [
          { number: 73, head: bulkordersBranch, base: 'bulkorders-theme' }
        ]
      }
    }),
    headBranch: '36838-ci-selection',
    baseBranch: 'petsies-theme'
  })

  assert.deepEqual(selection.themeBranches, [petsiesBranch])
})

test('uses default themes when no task-specific theme pull request is relevant', async () => {
  const selection = await resolvePullRequestSelection({
    client: createClient({
      branches: { [REPOSITORIES.theme.name]: ['36838-bulkorders-checkout'] },
      pulls: {
        [`${REPOSITORIES.theme.name}:36838-bulkorders-checkout`]: [
          { number: 73, head: '36838-bulkorders-checkout', base: 'bulkorders-theme' }
        ]
      }
    }),
    headBranch: '36838-ci-selection',
    baseBranch: 'petsies-theme'
  })

  assert.deepEqual(selection.themeBranches, ['petsies-theme', 'budsies-theme', 'waggables-theme'])
})
