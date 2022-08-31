import errorLogger from './errorLogger';
import ErrorMessage from '../type/ErrorMessage';

export default function windowOnErrorHandler (
  eventOrMessage: any,
  file?: string,
  line?: number,
  columnNumber?: number,
  error?: Error
): void {
  let fullMessage: string;
  let shortMessage: string;

  if (typeof eventOrMessage === 'string') {
    shortMessage = eventOrMessage;
  } else {
    shortMessage = eventOrMessage.message;
  }

  if (error && error.stack) {
    fullMessage = error.stack;
  } else {
    fullMessage =
            shortMessage + ' in ' + file + ' on ' + line + ':' + columnNumber;
  }

  const errorMessage: ErrorMessage = {
    shortMessage,
    fullMessage,
    currentUrl: window.location.href,
    line,
    file
  };

  errorLogger(errorMessage);
}
