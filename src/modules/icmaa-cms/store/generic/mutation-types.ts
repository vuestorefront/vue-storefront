import { SN_ICMAA_CMS } from '../abstract/mutation-types'

export default (stateKey: string) => {
  stateKey = stateKey.toUpperCase()
  return {
    [`${stateKey}_ADD`]: `${SN_ICMAA_CMS}/ADD_${stateKey}`,
    [`${stateKey}_UPD`]: `${SN_ICMAA_CMS}/UPDATE_${stateKey}`,
    [`${stateKey}_RMV`]: `${SN_ICMAA_CMS}/REMOVE_${stateKey}`
  }
}
