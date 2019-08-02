export interface Notification {
  type: string,
  message: any,
  action1: any,
  action2?: any
}

export interface ServerResponse {
  status: string | number,
  sku: string,
  result: any
}

export interface Party {
  party: string,
  status: string,
  sku: string
}

export interface DiffLog {
  items: Party[],
  serverResponses: ServerResponse[],
  clientNotifications: Notification[],
  pushParty: (party: Party) => DiffLog,
  pushClientParty: (party: any) => DiffLog,
  pushServerParty: (party: any) => DiffLog,
  pushServerResponse: (party: ServerResponse) => DiffLog,
  pushNotification: (party: Notification) => DiffLog,
  pushNotifications: (party: Notification[]) => DiffLog,
  merge: (diffLog: DiffLog) => DiffLog
}
