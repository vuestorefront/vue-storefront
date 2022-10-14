import logError from '../services/errorLogger';
import ErrorMessage from '../type/ErrorMessage';

export default function unhandledRejectionHandler (event: PromiseRejectionEvent): void {
  if (event.reason || JSON.stringify(event.reason) === '{}') {
    return;
  }

  const errorMessage: ErrorMessage = {
    shortMessage: 'Unhandled rejection',
    fullMessage: JSON.stringify(event),
    currentUrl: window.location.href
  };

  logError(errorMessage);
}
