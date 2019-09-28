import { Logger } from '@vue-storefront/core/lib/logger'

export class IndexedDB {
  private indexedDB: any;
  private database: any;
  private dbName: string;
  private version: number;

  public constructor (dbName: string) {
    this.indexedDB = window.indexedDB
    this.dbName = dbName
    this.version = 1
    this.database = null
  }

  public async exist () {
    try {
      const databases = await this.indexedDB.databases()
      if (databases.length && databases.find(db => db.name === this.dbName)) {
        const database = databases.find(db => db.name === this.dbName)
        this.version = database.version
        return true
      }
      return false
    } catch (error) {
      Logger.error('CLEAR CACHE: ', error)()
      return false
    }
  }

  public open () {
    return new Promise((resolve, reject) => {
      const openRequest = this.indexedDB.open(this.dbName, this.version)

      openRequest.onerror = () => {
        Logger.error('Error - ', openRequest.error)()
        return reject(openRequest.error)
      }

      openRequest.onsuccess = () => {
        this.database = openRequest.result
        Logger.info('CLEAR CACHE: Database opened')()
        return resolve()
      }
    })
  }

  public clearStorage (name: string): void {
    if (this.database) {
      if (this.database.objectStoreNames.contains(name)) {
        this.database.deleteObjectStore(name)
      } else {
        Logger.info('CLEAR CACHE: Storage for clear is not exist')()
      }
    } else {
      Logger.error('CLEAR CACHE: Database is not exist')()
    }
  }
}
