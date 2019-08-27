import { Notification, ServerResponse, Party } from '@vue-storefront/core/modules/cart/types/DiffLog'

class DiffLog {
  public items: Party[]
  public serverResponses: ServerResponse[]
  public clientNotifications: Notification[]

  public constructor () {
    this.items = []
    this.serverResponses = []
    this.clientNotifications = []
  }

  public pushParty (party: Party): DiffLog {
    this.items.push(party)
    return this
  }

  public pushClientParty (party: any): DiffLog {
    this.pushParty({ party: 'client', ...party })
    return this
  }

  public pushServerParty (party: any): DiffLog {
    this.pushParty({ party: 'server', ...party })
    return this
  }

  public pushServerResponse (response: ServerResponse): DiffLog {
    this.serverResponses.push(response)
    return this
  }

  public pushNotification (notification: Notification): DiffLog {
    this.clientNotifications.push(notification)
    return this
  }

  public pushNotifications (notifications: Notification[]): DiffLog {
    this.clientNotifications = this.clientNotifications.concat(notifications)
    return this
  }

  public merge (diffLog: DiffLog): DiffLog {
    this.items = this.items.concat(diffLog.items)
    this.serverResponses = this.serverResponses.concat(diffLog.serverResponses)
    this.clientNotifications = this.clientNotifications.concat(diffLog.clientNotifications)
    return this
  }

  public hasClientNotifications () {
    return this.clientNotifications.length > 0
  }

  public hasServerResponses () {
    return this.serverResponses.length > 0
  }

  public hasParties () {
    return this.items.length > 0
  }

  public isEmpty (): boolean {
    return !this.hasParties &&
      !this.hasClientNotifications() &&
      !this.hasServerResponses()
  }
}

const createDiffLog = (): DiffLog => new DiffLog()

export default createDiffLog
