import picocolors from 'picocolors';
import { spinner } from '@clack/prompts';

const sp = spinner();

export function startLoggingProgress(message: string): void {
  sp.start(message);
}

export function stopLoggingProgressSuccess(message?: string): void {
  sp.stop(message);
}

export function suspendLoggingProgressPrompt(message: string): void {
  sp.stop(picocolors.yellow(message));
}

export function stopLoggingProgressError(message?: string): void {
  sp.stop(picocolors.red(message));
}

export function logSimpleSuccessMessage(message: string): void {
  simpleLog(message, picocolors.green);
}

export function logSimpleErrorMessage(message: string): void {
  simpleLog(message, picocolors.red);
}

export function logSimpleWarningMessage(message: string): void {
  simpleLog(message, picocolors.yellow);
}

export function logSimpleInfoMessage(message: string): void {
  simpleLog(message, picocolors.cyan);
}

export function simpleLog(
  message: string,
  pc?: (message: string) => string
): void {
  if (pc) {
    sp.start(pc(message));
    sp.stop(pc(message));
  } else {
    sp.start(message);
    sp.stop(message);
  }
}
