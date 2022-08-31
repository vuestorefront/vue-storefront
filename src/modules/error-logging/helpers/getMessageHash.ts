import { sha3_224 } from 'js-sha3'

import ErrorMessage from '../type/ErrorMessage';

export default function getMessageHash (errorMessage: ErrorMessage): string {
  const messageDigest =
            errorMessage.shortMessage +
            errorMessage.line +
            errorMessage.currentUrl;

  return sha3_224(messageDigest);
}
