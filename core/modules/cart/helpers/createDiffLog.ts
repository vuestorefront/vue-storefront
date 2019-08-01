function DiffLog () {
  this.items = []
  this.serverResponses = []
  this.clientNotifications = []
  this.pushParty = party => {
    this.items.push(party)
    return this
  }
  this.pushClientParty = party => {
    this.pushParty({ party: 'client', ...party })
    return this
  }
  this.pushServerParty = party => {
    this.pushParty({ party: 'server', ...party })
    return this
  }
  this.pushServerResponse = response => {
    this.serverResponses.push(response)
    return this
  }
  this.pushNotification = notification => {
    this.clientNotifications.push(notification)
    return this
  }
  this.pushNotifications = notifications => {
    for (const notification of notifications) {
      this.clientNotifications.push(notification)
    }

    return this
  }
}

const createDiffLog = () => new DiffLog()

export default createDiffLog
