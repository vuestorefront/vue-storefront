import { MetaInfo } from 'vue-meta'

export interface FindObject {
  [prop: string]: any
}

export interface ExtendedMetaInfo extends MetaInfo {
  add?: {
    type: string,
    data: any
  }[],
  update?: {
    type: string,
    find: FindObject,
    data: any
  }[],
  remove?: {
    type: string,
    find: FindObject
  }[]
}

export default class ConfigMutator {
  public constructor (configs: any) {
    this.configs = configs
  }

  public configs: any

  public apply (changes: ExtendedMetaInfo): void {
    if (!changes) {
      return
    }

    if (changes.update) {
      changes.update.forEach(e => this.update(e.type, e.find, e.data))
    }

    if (changes.add) {
      changes.add.forEach(e => this.add(e.type, e.data))
    }

    if (changes.remove) {
      changes.remove.forEach(e => this.remove(e.type, e.find))
    }
  }

  public getRowIndex (type: string, find: FindObject): number|boolean {
    const findKey = Object.keys(find)[0]
    const findVal = find[findKey]
    const findMet = e => e !== null && e.hasOwnProperty(findKey) && e[findKey] === findVal

    if (this.configs[type].find(findMet)) {
      return this.configs[type].findIndex(findMet)
    }

    return false
  }

  public add (type: string, value: any): void {
    this.configs[type].push(value)
  }

  public remove (type: string, find: FindObject): void {
    const index = this.getRowIndex(type, find)
    if (typeof index === 'number') {
      this.configs[type].splice(index, 1)
    }
  }

  public update (type: string, find: FindObject, value: any): void {
    const index = this.getRowIndex(type, find)
    if (typeof index === 'number') {
      this.configs[type][index] = value
    }
  }
}
