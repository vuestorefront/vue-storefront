import { Currency } from './currency.interface';

export interface CurrencyState {
  availableCurrencies: Currency[],
  selectedCurrencyCode: string,
  currencyRates: Record<string, number>
}
