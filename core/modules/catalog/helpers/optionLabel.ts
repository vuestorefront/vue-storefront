/**
 * Helper method for getting attribute name - TODO: to be moved to external/shared helper
 *
 * @param {String} attributeCode
 * @param {String} optionId - value to get label for
 */
import toString from 'lodash-es/toString'
import get from 'lodash-es/get'

export function optionLabel (state, { attributeKey, searchBy = 'code', optionId }) {
  if (!state.labels) {
    state.labels = {}
  }

  // check cached attribute
  const attrCache = get(state, `labels.${attributeKey}.${optionId}`, null)
  if (attrCache) {
    return attrCache
  }

  let attr = state['list_by_' + searchBy][attributeKey]
  if (attr) {
    let opt = attr.options.find((op) => toString(op.value) === toString(optionId))

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
