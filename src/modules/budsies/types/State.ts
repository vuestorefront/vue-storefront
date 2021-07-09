import ExtraPhotoAddon from '../models/extra-photo-addon.model'
import RushAddon from '../models/rush-addon.model'
import BodypartValue from '../models/bodypart-value.model'
import Bodypart from '../models/bodypart.model'
import { Dictionary } from './Dictionary.type'

export interface BudsiesState {
  extraPhotoAddons: Dictionary<ExtraPhotoAddon>,
  rushAddons: Dictionary<RushAddon>,
  productExtraPhotoAddons: Dictionary<string[]>,
  productRushAddons: Dictionary<string[]>,
  bodyparts: Dictionary<Bodypart>,
  bodypartsValues: Dictionary<BodypartValue>,
  bodypartBodypartsValues: Dictionary<string[]>,
  productBodyparts: Dictionary<string[]>,
  plushieShortcode: Dictionary<string>,
  customerEmail: string | undefined,
  breeds: string[]
}
