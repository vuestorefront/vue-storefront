import errorLogger from '../services/errorLogger';
import ErrorMessage from '../type/ErrorMessage';

export function logAutocompleteOptionNotFound (
  field: string,
  value: string
): void {
  const errorMessage: ErrorMessage = {
    shortMessage: 'Autocomplete option is not found',
    fullMessage: `Field '${field}'. Autocomplete option is not found for value: '${value}'`,
    currentUrl: window.location.href
  };

  void errorLogger(errorMessage);
}
