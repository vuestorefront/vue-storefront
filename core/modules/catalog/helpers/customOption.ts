import { CustomOption, OptionValue, InputValue } from './../types/CustomOption';

export const defaultCustomOptionValue = (customOption: CustomOption): InputValue => {
  switch (customOption.type) {
    case 'radio': {
      return customOption.values && customOption.values.length ? customOption.values[0].option_type_id : 0
    }
    case 'checkbox': {
      return []
    }
    default: {
      return ''
    }
  }
}

export const customOptionFieldName = (customOption: CustomOption): string => {
  return 'customOption_' + customOption.option_id
}

export const selectedCustomOptionValue = (optionType: string, optionValues: OptionValue[] = [], inputValue: InputValue): string => {
  switch (optionType) {
    case 'field': {
      return inputValue as string
    }
    case 'radio':
    case 'select':
    case 'drop_down': {
      const selectedValue = optionValues.find((value) => value.option_type_id === inputValue as number)
      const optionTypeId = selectedValue && selectedValue.option_type_id

      return optionTypeId ? String(optionTypeId) : null
    }
    case 'checkbox': {
      const checkboxOptionValues = inputValue as number[] || []

      return optionValues.filter((value) => checkboxOptionValues.includes(value.option_type_id))
        .map((value) => value.option_type_id)
        .join(',') || null
    }
    default: {
      return null
    }
  }
}
