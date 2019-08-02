import { DiffLog as DiffLogInterface, Notification, ServerResponse, Party } from '@vue-storefront/core/modules/cart/types/DiffLog'

function DiffLog () {
  this.items = []
  this.serverResponses = []
  this.clientNotifications = []
  this.pushParty = (party: Party): DiffLogInterface => {
    this.items.push(party)
    return this
  }
  this.pushClientParty = (party: any): DiffLogInterface => {
    this.pushParty({ party: 'client', ...party })
    return this
  }
  this.pushServerParty = (party: any): DiffLogInterface => {
    this.pushParty({ party: 'server', ...party })
    return this
  }
  this.pushServerResponse = (response: ServerResponse): DiffLogInterface => {
    this.serverResponses.push(response)
    return this
  }
  this.pushNotification = (notification: Notification): DiffLogInterface => {
    this.clientNotifications.push(notification)
    return this
  }
  this.pushNotifications = (notifications: Notification[]): DiffLogInterface => {
    this.clientNotifications = this.clientNotifications.concat(notifications)
    return this
  }
  this.merge = (diffLog: DiffLogInterface): DiffLogInterface => {
    this.items = this.items.concat(diffLog.items)
    this.serverResponses = this.serverResponses.concat(diffLog.serverResponses)
    this.clientNotifications = this.clientNotifications.concat(diffLog.clientNotifications)
    return this
  }
}

const createDiffLog = (): DiffLogInterface => new DiffLog()

export default createDiffLog
