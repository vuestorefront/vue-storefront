export const defaultCustomOptionValue = (co) => {
  switch (co.type) {
    case 'radio': {
      return co.values && co.values.length ? co.values[0].option_type_id : 0
    }
    case 'checkbox': {
      return []
    }
    default: {
      return ''
    }
  }
}

export const customOptionFieldName = (co) => {
  return 'customOption_' + co.option_id
}

export const selectedCustomOptionValue = (optionType, optionValues = [], inputValue) => {
  switch (optionType) {
    case 'field': {
      return inputValue
    }
    case 'radio':
    case 'select':
    case 'drop_down': {
      const selectedValue = optionValues.find((value) => value.option_type_id === inputValue) || {}

      return selectedValue.option_type_id || ''
    }
    case 'checkbox': {
      return optionValues.filter((value) => (inputValue || []).includes(value.option_type_id))
        .map((value) => value.option_type_id)
        .join(',')
    }
    default: {
      return ''
    }
  }
}
