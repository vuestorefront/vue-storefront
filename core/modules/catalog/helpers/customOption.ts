import Product from '@vue-storefront/core/modules/catalog/types/Product';
import { CustomOption, OptionValue, InputValue, SelectedCustomOption } from '@vue-storefront/core/modules/catalog/types/CustomOption';

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

export const getCustomOptionValues = (selectedCustomOptions: SelectedCustomOption[], allCustomOptions: CustomOption[]): OptionValue[] => selectedCustomOptions
  .filter(customOptionIds => customOptionIds.option_value) // remove null | undefined values
  .map(customOptionIds => {
    const { values = [] } = allCustomOptions.find(
      customOption => String(customOption.option_id) === String(customOptionIds.option_id) // get all custom option values based on 'option_id'
    )
    const customOptionValues = customOptionIds.option_value
      .split(',') // split ids, because there can be '1,2' for checkbox
      .map(optionValueId => values.find(value => String(value.option_type_id) === optionValueId)) // get custom option value based on selected option value id
      .filter(Boolean) // remove falsy results

    return customOptionValues
  })
  .reduce((allCustomOptionValues, customOptionValue) => allCustomOptionValues.concat(customOptionValue), []) // merge all values in one array

export const getCustomOptionPriceDelta = (customOptionValues: OptionValue[], { price, priceInclTax, price_incl_tax }: Pick<Product, 'price' | 'priceInclTax' | 'price_incl_tax'>) => customOptionValues
  .reduce((delta, customOptionValue) => {
    if (customOptionValue.price_type === 'fixed' && customOptionValue.price !== 0) {
      delta.price += customOptionValue.price
      delta.priceInclTax += customOptionValue.price
    }
    if (customOptionValue.price_type === 'percent' && customOptionValue.price !== 0) {
      delta.price += ((customOptionValue.price / 100) * price)
      delta.priceInclTax += ((customOptionValue.price / 100) * (priceInclTax || price_incl_tax))
    }
    return delta
  }, {
    price: 0,
    priceInclTax: 0
  })
