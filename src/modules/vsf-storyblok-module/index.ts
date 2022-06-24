import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { module } from './store'
import { beforeRegistration } from './hooks/beforeRegistration'
import ComponentWidthCalculator from './component-width-calculator.service'
import { Alignment } from './types/alignment.value'
import ItemData from './types/item-data.interface'
import { SpacingSettingsField } from './types/spacing-settings-field.type'
import { Display } from './types/display.value'
import AssetField from './types/asset-field.interface'
import ColorPickerField from './types/color-picker-field.interface'
import LinkField from './types/link-field.interface'
import VideoUrlField from './types/video-url-field.interface'
import { LinkType } from './types/link-type.value'
import { SizeValue } from './types/size.value'
import isUrlExternal from './helpers/is-url-external'
import getUrlFromLink from './helpers/get-url-from-link'
import { Blok } from './components'

export const KEY = 'storyblok'

export const StoryblokModule: StorefrontModule = function ({ store, router, appConfig }) {
  beforeRegistration(appConfig, store)
  store.registerModule(KEY, module)
}

export {
  Blok,
  ComponentWidthCalculator,
  SizeValue,
  Alignment,
  ItemData,
  SpacingSettingsField,
  Display,
  AssetField,
  ColorPickerField,
  LinkField,
  LinkType,
  VideoUrlField,
  isUrlExternal,
  getUrlFromLink
}
