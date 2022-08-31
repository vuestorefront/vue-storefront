import errorLogger from './errorLogger';
import ErrorMessage from '../type/ErrorMessage';

const errorHandler = console.error;

export default function consoleError (...args: any): void {
  const error = args[0];
  const currentUrl = window.location.href;

  let fullMessage = '';
  if (error.stack) {
    fullMessage = error.stack;
  }

  if (error instanceof Error) {
    const errorMessage: ErrorMessage = {
      shortMessage: error.message,
      fullMessage,
      currentUrl
    };

    errorLogger(errorMessage);
  } else if (typeof error === 'string') {
    const errorMessage: ErrorMessage = {
      shortMessage: error,
      fullMessage: 'Error was logged as string - could not fetch additional info',
      currentUrl
    };

    errorLogger(errorMessage);
  }

  return errorHandler.apply(console, args);
}
