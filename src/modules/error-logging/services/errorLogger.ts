import rootStore from '@vue-storefront/core/store'

import ErrorMessage from '../type/ErrorMessage';
import { SN_ERROR_LOGGING } from '../type/StoreMutations';
import resolveIp from '../helpers/resolveIp';
import { checkMessageAlreadySent, keepMessage, removeMessage } from './sentMessagesKeeper'
import { sendErrorMessage } from './errorSender';

let clientIpCache: string | undefined;

async function resolveIpWithCache (): Promise<string> {
  if (clientIpCache) {
    return clientIpCache;
  }

  clientIpCache = await resolveIp();

  return clientIpCache;
}

export default async function logError (errorMessage: ErrorMessage): Promise<void> {
  const messageAlreadySent = await checkMessageAlreadySent(errorMessage);
  const userAgent = navigator.userAgent;

  if (messageAlreadySent || userAgent.toLowerCase().includes('bot')) {
    return;
  }

  const clientIp = await resolveIpWithCache();

  if (!clientIp) {
    return;
  }

  await keepMessage(errorMessage);

  const traceId = rootStore.getters[`${SN_ERROR_LOGGING}/traceId`];

  try {
    await sendErrorMessage(errorMessage, userAgent, clientIp, traceId);
  } catch (e) {
    await removeMessage(errorMessage);
  }
}
