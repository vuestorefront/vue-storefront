import onUnhandledRejectionHandler from '../helpers/onUnhandledRejectionHandler';
import windowOnErrorHandler from '../helpers/windowOnErrorHandler';
import consoleError from '../helpers/consoleError';
import { restoreMessagesFromStorage } from '../helpers/sentMessagesKeeper';

export async function afterRegistration (config: any): Promise<void> {
  if (!config.errorLogging.serviceUrl) {
    return;
  }

  await restoreMessagesFromStorage();

  window.addEventListener('unhandledrejection', onUnhandledRejectionHandler);
  window.addEventListener('error', windowOnErrorHandler);
  console.error = consoleError;
}
