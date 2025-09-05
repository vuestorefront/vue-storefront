import { Currency } from './currency.interface';
import { DEFAULT_CURRENCY_CODE } from 'src/modules/shared';

export const DEFAULT_CURRENCY: Currency = { code: DEFAULT_CURRENCY_CODE, name: 'US Dollar', symbol: '$' };
