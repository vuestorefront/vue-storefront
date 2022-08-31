import errorLogger from './errorLogger';
import ErrorMessage from '../type/ErrorMessage';

export default function onUnhandledRejectionHandler (event: PromiseRejectionEvent): void {
  if (event.reason || JSON.stringify(event.reason) === '{}') {
    return;
  }

  const errorMessage: ErrorMessage = {
    shortMessage: 'Unhandled rejection',
    fullMessage: JSON.stringify(event),
    currentUrl: window.location.href
  };

  errorLogger(errorMessage);
}
