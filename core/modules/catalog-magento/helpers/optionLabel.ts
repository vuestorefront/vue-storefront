/**
 * Helper method for getting attribute name - TODO: to be moved to external/shared helper
 *
 * @param {String} attributeCode
 * @param {String} optionId - value to get label for
 */
import toString from 'lodash-es/toString'

export function optionLabel (state, { attributeKey, searchBy = 'code', optionId }) {
  let attrCache = state.labels[attributeKey]

  if (attrCache) {
    let label = attrCache[optionId]

    if (label) {
      return label
    }
  }
  let attr = state['list_by_' + searchBy][attributeKey]
  if (attr) {
    let opt = attr.options.find((op) => { // TODO: cache it in memory
      if (toString(op.value) === toString(optionId)) {
        return op
      }
    }) // TODO: i18n support with  multi-website attribute names

    if (opt) {
      if (!state.labels[attributeKey]) {
        state.labels[attributeKey] = {}
      }
      state.labels[attributeKey][optionId] = opt.label
      return opt ? opt.label : optionId
    } else {
      return optionId
    }
  } else {
    return optionId
  }
}
