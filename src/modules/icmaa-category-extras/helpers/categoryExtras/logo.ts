import { icmaa_categoryextras } from 'config'
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category'
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'

export class Logo {
  protected _name: string
  protected _category: Category | boolean = false
  protected _logoFileName: string
  protected _height: undefined | number
  protected _width: undefined | number
  protected _cluster: undefined | string

  public constructor (category: Category | string, cluster?: string) {
    if (typeof category === 'string') {
      this._name = category
    } else {
      this._category = category
      this._name = category.name
    }

    this._cluster = cluster
  }

  public data () {
    return {
      url: this.url,
      retinaUrl: this.retinaUrl,
      alt: this.name,
      link: this.link,
      cluster: this._cluster
    }
  }

  public get category (): Category | boolean {
    return this._category || false
  }

  public get name (): string {
    return this._name
  }

  public get path (): string {
    return this.getPath()
  }

  public get retinaPath (): string {
    return this.getPath(true)
  }

  public get url (): string {
    return getThumbnailPath(this.path, this.width, this.height, 'media')
  }

  public get retinaUrl (): string {
    return getThumbnailPath(this.retinaPath, this.width * 2 || undefined, this.height * 2 || undefined, 'media')
  }

  public get link (): string {
    if (!this.category) {
      return ''
    }

    return formatCategoryLink(this.category as Category)
  }

  protected getPath (isRetina: boolean = false): string {
    return `/${this.getFolderPath()}/${this.getFileName()}${isRetina ? '@2x' : ''}.png`
  }

  protected getFileName (): string {
    if (!this._logoFileName) {
      let name = this._name.toLowerCase()

      const allowedCharacterRegExp = /[^a-zA-Z0-9äüöÄÜÖ]/gm
      name = name.replace(allowedCharacterRegExp, '')

      const specialChars = ['ä', 'ö', 'ü', 'ï', 'ë', 'ß', 'Ä', 'Ö', 'Ü', 'Ï', 'Ë']
      const specialCharsRep = ['ae', 'oe', 'ue', 'ie', 'ee', 'ss', 'ae', 'oe', 'ue', 'ie', 'ee']
      specialChars.forEach((c, i) => {
        name = name.replace(c, specialCharsRep[i])
      })

      this._logoFileName = name
    }

    return this._logoFileName
  }

  protected getFolderPath = (): string => icmaa_categoryextras.logoFilePath

  public get width () {
    return this._width
  }

  public set width (v) {
    this._width = v
  }

  public get height () {
    return this._height
  }

  public set height (v) {
    this._width = v
  }

  public get cluster (): string | boolean {
    return this._cluster || false
  }
}
