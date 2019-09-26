import i18n from '@vue-storefront/i18n'

export default class ProductName {
  protected _name: string
  protected _type: string = ''
  protected _translatedType: string

  public constructor (name) {
    this.name = name
    this.setType()
    this.setTranslatedType()
  }

  public get name () {
    return this._name
  }

  public set name (name: string) {
    this._name = name
  }

  public get typeString (): boolean|string {
    return this._type
  }

  public get translatedType (): boolean|string {
    return this._translatedType
  }

  public get translatedName (): string {
    const escapedRegexSearchString = (this.typeString as string).replace(/[[\]/{}()*+?.\\^$|]/ui, '\\$&')
    const typeRegExp = new RegExp(escapedRegexSearchString + '$', 'ui')

    if (this.typeTranslationFound() && typeRegExp.test(this.name)) {
      return this.name.replace(typeRegExp, this.translatedType as string)
    }

    return this.name
  }

  protected setType () {
    const regex = /(\s[-–]{1}\s)/ui
    if (regex.test(this.name)) {
      const splitString = regex.exec(this.name).shift()
      this._type = this.name.split(splitString).pop()
    }
  }

  protected setTranslatedType () {
    if (this.typeString !== '') {
      this._translatedType = i18n.t('Product-Title: ' + this.typeString as string) as string
    }
  }

  protected typeTranslationFound (): boolean {
    return this.typeString && this.translatedType && !(this.translatedType as string).startsWith('Product-Title: ')
  }
}
