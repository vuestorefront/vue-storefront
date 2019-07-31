const createDiffLog = () => {
  let events = []

  const pushEvent = (event) => events.push(event)
  const pushErrorEvent = (event) => events.push({ type: 'error', event })
  const pushSuccessEvent = (event) => events.push({ type: 'success', event })
  const pushWaringEvent = (event) => events.push({ type: 'warning', event })
  const merge = (diffLog) => {
    events = events.concat(diffLog.events)
  }

  const pushEvents = (events) => {
    events = events.concat(events)
  }

  return {
    pushEvent,
    pushErrorEvent,
    pushSuccessEvent,
    pushWaringEvent,
    pushEvents,
    merge,
    events
  }
}

export default createDiffLog
