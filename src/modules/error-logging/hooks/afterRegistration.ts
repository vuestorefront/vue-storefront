import onUnhandledRejectionHandler from '../helpers/onUnhandledRejectionHandler';
import windowOnErrorHandler from '../helpers/windowOnErrorHandler';
import consoleError from '../helpers/consoleError';

export function afterRegistration (config: any) {
  if (!config.errorLogging.serviceUrl) {
    return;
  }

  window.addEventListener('unhandledrejection', onUnhandledRejectionHandler);
  window.addEventListener('error', windowOnErrorHandler);
  console.error = consoleError;
}
