import i18n from '@vue-storefront/i18n'

export interface DefaultTranslatorOptions {
  text: string,
  prefix?: string
}

export default class DefaultTranslator {
  protected _prefix: string = 'Default'
  protected _text: string
  protected _translated: string = ''

  public constructor ({ text, prefix }: DefaultTranslatorOptions) {
    if (prefix) {
      this.prefix = prefix
    }

    this._text = text
  }

  public get text (): string {
    return this._text
  }

  public set text (text: string) {
    this._text = text
  }

  public set prefix (prefix: string) {
    this._prefix = prefix
  }

  public translate (): string {
    if (this._translated === '' && !this.hasTranslation()) {
      this._translated = i18n.t(this._prefix + ': ' + this.text) as string
    }

    return this.hasTranslation() ? this._translated : this.text
  }

  protected hasTranslation () {
    return this._translated !== '' && !this._translated.startsWith(this._prefix + ': ')
  }
}
