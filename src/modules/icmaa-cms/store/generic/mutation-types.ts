export default (stateKey: string) => {
  stateKey = stateKey.toUpperCase()
  return {
    [`${stateKey}_ADD`]: `ADD_${stateKey}`,
    [`${stateKey}_UPD`]: `UPDATE_${stateKey}`,
    [`${stateKey}_RMV`]: `REMOVE_${stateKey}`
  }
}
