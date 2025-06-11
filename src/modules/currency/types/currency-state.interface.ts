import { Currency } from './currency.interface';

export interface CurrencyState {
  availableCurrencies: Currency[],
  selectedCurrencyCode: string | undefined,
  currencyRates: Record<string, number>,
  detectedCountryCurrency: string | undefined
}
