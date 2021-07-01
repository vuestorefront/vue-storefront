import Addon from '../models/addon.model'
import BodypartValue from '../models/bodypart-value.model'
import Bodypart from '../models/bodypart.model'
import { Dictionary } from './Dictionary.type'

export interface BudsiesState {
  addons: Dictionary<Addon>,
  printedProductAddons: Dictionary<string[]>,
  bodyparts: Dictionary<Bodypart>,
  bodypartsValues: Dictionary<BodypartValue>,
  bodypartBodypartsValues: Dictionary<string[]>,
  productBodyparts: Dictionary<string[]>,
  plushieShortcode: Dictionary<string>,
  customerEmail: string | undefined
}
