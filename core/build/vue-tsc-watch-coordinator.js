const { spawn } = require('child_process')
const path = require('path')

const pluginName = 'VueTscWatchCoordinator'
const completedCyclePattern = /Found \d+ errors?\. Watching for file changes\.(?:\r?\n)?/

function createVueTscWatchCoordinator ({
  compilers,
  flushDelay = 50,
  now = Date.now,
  processRef = process,
  projectRoot = path.resolve(__dirname, '../..'),
  spawnProcess = spawn,
  stderr = process.stderr,
  stdout = process.stdout,
  vueTscPath = require.resolve('vue-tsc/bin/vue-tsc.js')
}) {
  const compilerStates = new Map(
    Object.keys(compilers).map(name => [name, { building: true, hasErrors: false }])
  )

  let checker
  let checkerBuffer = ''
  let checkerCycleGeneration = null
  let buildStartedAt
  let flushTimer
  let generation = 0
  let lastInvalidation
  let readyGeneration = -1
  let readyMessage
  let readyStatusPrinted = false
  let readyTimer
  let latestCompletedCycle
  let started = false
  let stopped = false

  function cancelFlush () {
    if (!flushTimer) {
      return
    }

    clearTimeout(flushTimer)
    flushTimer = undefined
  }

  function cancelReadyStatus () {
    if (!readyTimer) {
      return
    }

    clearTimeout(readyTimer)
    readyTimer = undefined
  }

  function writeReadyStatus (force = false) {
    readyTimer = undefined
    if (!readyMessage || (readyStatusPrinted && !force)) {
      return
    }

    stdout.write(`\n[webpack] ${readyMessage}\n`)
    readyStatusPrinted = true
  }

  function scheduleReadyStatus () {
    cancelReadyStatus()
    if (!readyMessage) {
      return
    }

    readyTimer = setTimeout(writeReadyStatus, flushDelay)
  }

  function canFlush () {
    if (
      !latestCompletedCycle ||
      latestCompletedCycle.generation < generation ||
      readyGeneration < latestCompletedCycle.generation
    ) {
      return false
    }

    return Array.from(compilerStates.values())
      .every(({ building, hasErrors }) => !building && !hasErrors)
  }

  function flushLatestCycle () {
    flushTimer = undefined
    if (!canFlush()) {
      return
    }

    const output = latestCompletedCycle.output.trim()
    latestCompletedCycle = undefined

    if (output) {
      stdout.write(`\n[vue-tsc]\n${output}\n`)
      writeReadyStatus(true)
    }
  }

  function scheduleFlush () {
    cancelFlush()
    if (!canFlush()) {
      return
    }

    flushTimer = setTimeout(flushLatestCycle, flushDelay)
  }

  function normalizeChangeTime (changeTime) {
    if (changeTime instanceof Date) {
      return changeTime.getTime()
    }

    return changeTime || 0
  }

  function formatDuration (duration) {
    if (duration < 1000) {
      return `${duration}ms`
    }

    return `${(duration / 1000).toFixed(1)}s`
  }

  function reportBuildStarted (message) {
    cancelReadyStatus()
    readyMessage = undefined
    readyStatusPrinted = false
    buildStartedAt = now()
    stdout.write(`\n[webpack] ${message}\n`)
  }

  function markInvalid (name, fileName, changeTime) {
    if (stopped) {
      return
    }

    const state = compilerStates.get(name)
    state.building = true
    const hadScheduledFlush = Boolean(flushTimer)
    cancelFlush()

    const invalidation = {
      changeTime: normalizeChangeTime(changeTime),
      fileName: fileName || '',
      receivedAt: now()
    }
    const hasSameChangeTime = invalidation.changeTime &&
      invalidation.changeTime === lastInvalidation?.changeTime
    const arrivedTogether = lastInvalidation &&
      invalidation.receivedAt - (lastInvalidation?.receivedAt || 0) < 50
    const isSameInvalidation = lastInvalidation &&
      invalidation.fileName === lastInvalidation.fileName &&
      (hasSameChangeTime || arrivedTogether)

    if (!isSameInvalidation) {
      const previousGeneration = generation
      generation += 1
      reportBuildStarted('Rebuilding application bundles...')

      if (checkerCycleGeneration === previousGeneration) {
        checkerCycleGeneration = generation
      }
      if (hadScheduledFlush && latestCompletedCycle?.generation === previousGeneration) {
        latestCompletedCycle.generation = generation
      }
    }
    lastInvalidation = invalidation
  }

  function markBuilding (name) {
    if (stopped) {
      return
    }

    compilerStates.get(name).building = true
    cancelFlush()
  }

  function markDone (name, stats) {
    if (stopped) {
      return
    }

    const state = compilerStates.get(name)
    state.building = false
    state.hasErrors = Boolean(stats && stats.hasErrors())
    scheduleFlush()
  }

  function markFailed (name) {
    if (stopped) {
      return
    }

    const state = compilerStates.get(name)
    state.building = false
    state.hasErrors = true
    cancelFlush()
  }

  function handleCheckerOutput (chunk) {
    if (stopped) {
      return
    }

    if (checkerCycleGeneration === null) {
      checkerCycleGeneration = generation
    }
    checkerBuffer += chunk.toString()

    let completedCycle = checkerBuffer.match(completedCyclePattern)
    while (completedCycle) {
      const end = completedCycle.index + completedCycle[0].length
      latestCompletedCycle = {
        generation: checkerCycleGeneration,
        output: checkerBuffer.slice(0, end)
      }
      checkerBuffer = checkerBuffer.slice(end)
      checkerCycleGeneration = checkerBuffer.trim() ? generation : null
      scheduleFlush()
      completedCycle = checkerBuffer.match(completedCyclePattern)
    }
  }

  function markRendererReady () {
    if (stopped || readyGeneration === generation) {
      return
    }

    const compilationSucceeded = Array.from(compilerStates.values())
      .every(({ building, hasErrors }) => !building && !hasErrors)
    if (!compilationSucceeded) {
      return
    }

    readyGeneration = generation
    const duration = formatDuration(now() - buildStartedAt)
    readyMessage = `Ready - SSR renderer updated in ${duration}. Watching for changes.`
    readyStatusPrinted = false
    scheduleFlush()
    scheduleReadyStatus()
  }

  function stop () {
    if (stopped) {
      return
    }
    stopped = true
    cancelFlush()
    cancelReadyStatus()
    processRef.removeListener('exit', stop)

    if (checker && !checker.killed) {
      checker.kill()
    }
  }

  function attachCompilerHooks (name, compiler) {
    compiler.hooks.invalid.tap(pluginName, (fileName, changeTime) => {
      markInvalid(name, fileName, changeTime)
    })
    compiler.hooks.watchRun.tap(pluginName, () => {
      markBuilding(name)
    })
    compiler.hooks.done.tap(pluginName, stats => {
      markDone(name, stats)
    })
    compiler.hooks.failed.tap(pluginName, () => {
      markFailed(name)
    })
    compiler.hooks.watchClose.tap(pluginName, stop)
  }

  function start () {
    if (started) {
      return
    }
    started = true

    Object.entries(compilers).forEach(([name, compiler]) => {
      attachCompilerHooks(name, compiler)
    })
    reportBuildStarted('Initial application compilation started...')

    checker = spawnProcess(processRef.execPath, [
      vueTscPath,
      '--noEmit',
      '--watch',
      '--pretty',
      'false',
      '--preserveWatchOutput',
      '-p',
      path.join(projectRoot, 'tsconfig.vue-tsc.json')
    ], {
      cwd: projectRoot,
      env: {
        ...processRef.env,
        FORCE_COLOR: '0',
        NO_COLOR: '1'
      },
      stdio: ['ignore', 'pipe', 'pipe']
    })

    checker.stdout.on('data', handleCheckerOutput)
    checker.stderr.on('data', chunk => {
      stderr.write(`[vue-tsc] ${chunk.toString()}`)
    })
    checker.once('error', error => {
      stderr.write(`[vue-tsc] Failed to start watch process: ${error.message}\n`)
    })
    checker.once('exit', (code, signal) => {
      if (!stopped) {
        stderr.write(`[vue-tsc] Watch process exited unexpectedly (${signal || code}).\n`)
      }
    })

    processRef.once('exit', stop)
  }

  return {
    markRendererReady,
    start,
    stop
  }
}

module.exports = {
  createVueTscWatchCoordinator
}
