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
import { ColumnsCountField } from './types/columns-count-field.type'
import LinkField from './types/link-field.interface'
import { VideoSelectorField } from './types/video-selector-field.interface'
import VideoSelectorOptions from './types/video-selector-options.interface'
import { LinkType } from './types/link-type.value'
import { SizeValue } from './types/size.value'
import isUrlExternal from './helpers/is-url-external'
import getHeaderId from './helpers/get-header-id'
import getUrlFromLink from './helpers/get-url-from-link'
import { hydrateInPreviewOrWhenVisible } from './helpers/hydrate-in-preview-only-or-when-visible.function'
import { isStoryblokPreview } from './helpers/is-storyblok-preview.function'
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
  Display,
  LinkType,
  isUrlExternal,
  getUrlFromLink,
  hydrateInPreviewOrWhenVisible,
  getHeaderId,
  isStoryblokPreview
}

export type {
  ItemData,
  SpacingSettingsField,
  AssetField,
  ColorPickerField,
  LinkField,
  VideoSelectorField,
  VideoSelectorOptions,
  ColumnsCountField
}
