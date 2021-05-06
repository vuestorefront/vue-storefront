/**
 * Helper method for getting attribute name - TODO: to be moved to external/shared helper
 *
 * @param {String} attributeCode
 * @param {String} optionId - value to get label for
 */
import toString from 'lodash-es/toString'
import get from 'lodash-es/get'

export const optionLabel = (state, { attributeKey, searchBy = 'code', optionId }) => {
  if (!state.labels) {
    state.labels = {}
  }

  // check cached attribute
  const attrCache = get(state, `labels.${attributeKey}.${optionId}`, null)
  if (attrCache) {
    return attrCache
  }

  const attr = state['list_by_' + searchBy][attributeKey]
  if (attr && Array.isArray(attr.options)) {
    const opt = attr.options.find(option => toString(option.value) === toString(optionId));

    if (opt && opt.label) {
      if (!state.labels[attributeKey]) {
        state.labels[attributeKey] = {}
      }
      state.labels[attributeKey][optionId] = opt.label
      return opt.label
    } else {
      return optionId
    }
  } else {
    return optionId
  }
}
