const assert = require('assert')
const { EventEmitter } = require('events')

const { createVueTscWatchCoordinator } = require('../../core/build/vue-tsc-watch-coordinator')

class TestHook {
  constructor () {
    this.handlers = []
  }

  tap (name, handler) {
    this.handlers.push(handler)
  }

  call (...args) {
    this.handlers.forEach(handler => handler(...args))
  }
}

function createCompiler () {
  return {
    hooks: {
      done: new TestHook(),
      failed: new TestHook(),
      invalid: new TestHook(),
      watchClose: new TestHook(),
      watchRun: new TestHook()
    }
  }
}

function createChildProcess () {
  const childProcess = new EventEmitter()
  childProcess.stdout = new EventEmitter()
  childProcess.stderr = new EventEmitter()
  childProcess.killed = false
  childProcess.kill = () => {
    childProcess.killed = true
  }
  return childProcess
}

function createProcessRef () {
  const processRef = new EventEmitter()
  processRef.env = {}
  processRef.execPath = '/usr/bin/node'
  return processRef
}

function successfulStats () {
  return {
    hasErrors: () => false
  }
}

function waitForFlush () {
  return new Promise(resolve => setTimeout(resolve, 5))
}

async function run () {
  const client = createCompiler()
  const server = createCompiler()
  const checker = createChildProcess()
  const processRef = createProcessRef()
  let checkerInvocation
  let currentTime = 1000
  let output = ''

  const coordinator = createVueTscWatchCoordinator({
    compilers: { client, server },
    flushDelay: 0,
    now: () => currentTime,
    processRef,
    projectRoot: '/project',
    spawnProcess: (command, args, options) => {
      checkerInvocation = { command, args, options }
      return checker
    },
    stderr: { write: () => {} },
    stdout: { write: chunk => { output += chunk } },
    vueTscPath: '/project/node_modules/vue-tsc/bin/vue-tsc.js'
  })

  coordinator.start()

  assert.match(output, /\[webpack\] Initial application compilation started/)
  output = ''

  assert.strictEqual(checkerInvocation.command, processRef.execPath)
  assert.deepStrictEqual(checkerInvocation.args, [
    '/project/node_modules/vue-tsc/bin/vue-tsc.js',
    '--noEmit',
    '--watch',
    '--pretty',
    'false',
    '--preserveWatchOutput',
    '-p',
    '/project/tsconfig.vue-tsc.json'
  ])

  checker.stdout.emit('data', 'Starting compilation in watch mode...\n\nFound 2 errors. Watching for file changes.\n')
  await waitForFlush()
  assert.strictEqual(output, '')

  client.hooks.done.call(successfulStats())
  currentTime = 2500
  coordinator.markRendererReady()
  await waitForFlush()
  assert.strictEqual(output, '')

  server.hooks.done.call(successfulStats())
  currentTime = 3600
  coordinator.markRendererReady()
  await waitForFlush()
  assert.match(output, /\[webpack\] Ready - SSR renderer updated in 2\.6s\. Watching for changes/)
  assert.match(output, /\[vue-tsc\]/)
  assert.match(output, /Found 2 errors/)
  assert(output.lastIndexOf('[webpack] Ready') > output.lastIndexOf('[vue-tsc]'))

  output = ''
  currentTime = 4000
  client.hooks.invalid.call('/project/src/App.vue', 100)
  assert.match(output, /\[webpack\] Rebuilding application bundles/)
  output = ''
  client.hooks.watchRun.call()
  checker.stdout.emit('data', 'File change detected. Starting incremental compilation...\n\nsrc/App.vue(1,1): error TS2322\n')
  checker.stdout.emit('data', 'Found 1 error. Watching for file changes.\n')
  server.hooks.invalid.call('/project/src/App.vue', 101)
  server.hooks.watchRun.call()
  client.hooks.done.call(successfulStats())
  await waitForFlush()
  assert.strictEqual(output, '')

  server.hooks.done.call(successfulStats())
  currentTime = 4250
  coordinator.markRendererReady()
  await waitForFlush()
  assert.match(output, /\[webpack\] Ready - SSR renderer updated in 250ms\. Watching for changes/)
  assert.match(output, /src\/App\.vue/)
  assert.match(output, /Found 1 error/)
  assert(output.lastIndexOf('[webpack] Ready') > output.lastIndexOf('[vue-tsc]'))

  output = ''
  checker.stdout.emit('data', 'File change detected. Starting incremental compilation...\n\nFound 0 errors. Watching for file changes.\n')
  currentTime = 5000
  client.hooks.invalid.call('/project/src/App.vue', 200)
  assert.match(output, /\[webpack\] Rebuilding application bundles/)
  output = ''
  client.hooks.watchRun.call()
  await waitForFlush()
  assert.strictEqual(output, '')

  client.hooks.done.call(successfulStats())
  currentTime = 5075
  coordinator.markRendererReady()
  await waitForFlush()
  assert.match(output, /\[webpack\] Ready - SSR renderer updated in 75ms\. Watching for changes/)
  assert.match(output, /Found 0 errors/)
  assert(output.lastIndexOf('[webpack] Ready') > output.lastIndexOf('[vue-tsc]'))

  coordinator.stop()
  assert.strictEqual(checker.killed, true)

  console.log('vue-tsc watch coordinator assertions passed')
}

run().catch(error => {
  console.error(error)
  process.exitCode = 1
})
