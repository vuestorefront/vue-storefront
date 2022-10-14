import unhandledRejectionHandler from './unhandledRejectionHandler';
import windowOnErrorHandler from './windowOnErrorHandler';
import consoleError from './consoleError';
import { restoreMessagesFromStorage } from '../services/sentMessagesKeeper';

export async function afterRegistration (config: any): Promise<void> {
  if (!config.errorLogging.serviceUrl) {
    return;
  }

  await restoreMessagesFromStorage();

  window.addEventListener('unhandledrejection', unhandledRejectionHandler);
  window.addEventListener('error', windowOnErrorHandler);
  console.error = consoleError;
}
