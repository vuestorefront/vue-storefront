import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import getMessageHash from '../helpers/getMessageHash';
import ErrorMessage from '../type/ErrorMessage';
import LOCAL_STORAGE_KEY from '../type/LocalStorageKey';
import SentMessage from '../type/SentMessage';

const KEEPING_LIMIT = 10;
let sentMessages: SentMessage[] = [];

function getMessage (errorMessage: ErrorMessage): SentMessage | undefined {
  const hash = getMessageHash(errorMessage);

  return sentMessages.find((message) => message.hash === hash);
}

async function saveMessagesInLocalStorage (): Promise<void> {
  const errorLoggingStorage = StorageManager.get(LOCAL_STORAGE_KEY);

  await errorLoggingStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sentMessages));
}

async function addMessage (errorMessage: ErrorMessage): Promise<void> {
  const hash = getMessageHash(errorMessage);

  const message = new SentMessage(hash);

  if (sentMessages.length >= KEEPING_LIMIT) {
    sentMessages.shift();
  }

  sentMessages.push(message);

  return saveMessagesInLocalStorage();
}

export async function keepMessage (errorMessage: ErrorMessage): Promise<void> {
  const message = getMessage(errorMessage);

  if (!message) {
    addMessage(errorMessage);
    return;
  }

  if (!message.isExpired) {
    return;
  }

  message.refresh();
}

export async function removeMessage (errorMessage: ErrorMessage): Promise<void> {
  const messageHash = getMessageHash(errorMessage);
  sentMessages = sentMessages.filter((message) => message.hash !== messageHash);
  return saveMessagesInLocalStorage();
}

export function checkMessageAlreadySent (errorMessage: ErrorMessage): boolean {
  const message = getMessage(errorMessage);

  return !!message && !message.isExpired;
}

export async function restoreMessagesFromStorage (): Promise<void> {
  const errorLoggingStorage = StorageManager.get(LOCAL_STORAGE_KEY);

  const storageValue = await errorLoggingStorage.getItem(
    LOCAL_STORAGE_KEY
  );

  if (!storageValue) {
    sentMessages = [];
    return;
  }

  const data = JSON.parse(storageValue);

  const messages: SentMessage[] = [];

  data.forEach((item: any) => {
    const message = new SentMessage(
      item.hash,
      item.expirationTime
    );

    if (!message.isExpired) {
      messages.push(message);
    }
  });

  sentMessages = messages;
  await errorLoggingStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sentMessages));
}
