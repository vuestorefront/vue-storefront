import rootStore from '@vue-storefront/core/store'

import { checkMessageAlreadySent, keepMessage, removeMessage } from './sentMessagesKeeper'
import { sendErrorMessage } from '../error-logging.service';
import ipResolver from '../ip-resolver.service';
import ErrorMessage from '../type/ErrorMessage';
import { SN_ERROR_LOGGING } from '../type/StoreMutations';

let clientIp: string | undefined;

async function resolveIp (): Promise<void> {
  if (clientIp) {
    return;
  }

  clientIp = await ipResolver();
}

export default async function errorLogger (errorMessage: ErrorMessage): Promise<void> {
  const messageAlreadySent = await checkMessageAlreadySent(errorMessage);
  const userAgent = navigator.userAgent;

  if (messageAlreadySent || userAgent.toLowerCase().includes('bot')) {
    return;
  }

  await resolveIp();

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
