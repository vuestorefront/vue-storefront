import Addon from '../models/addon.model'
import { Dictionary } from './Dictionary.type'

export interface BudsiesState {
  addons: Dictionary<Addon>,
  printedProductAddons: Dictionary<string[]>,
  currentPlushieId: string | undefined
}
