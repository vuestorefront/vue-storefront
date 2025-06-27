import { Currency } from './currency.interface';

export interface CurrencyState {
  availableCurrencies: Currency[],
  selectedCurrencyCode: string | undefined,
  activeCurrency: Currency,
  currencyRates: Record<string, number>
}
