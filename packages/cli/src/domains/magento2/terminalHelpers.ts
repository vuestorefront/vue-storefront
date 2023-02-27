import { CliUx } from '@oclif/core';
import picocolors from 'picocolors';
import { spinner } from '@clack/prompts';

export function startLoggingProgress(message: string): void {
  CliUx.ux.action.start(picocolors.bgBlack(picocolors.green(message)));
}

export function stopLoggingProgressSuccess(message?: string): void {
  CliUx.ux.action.stop(picocolors.green(message));
}

export function suspendLoggingProgressPrompt(message: string): void {
  CliUx.ux.action.stop(picocolors.yellow(message));
}

export function stopLoggingProgressError(message?: string): void {
  CliUx.ux.action.stop(picocolors.red(message));
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
  simpleLog(message, picocolors.blue);
}

export function simpleLog(
  message: string,
  pc?: (message: string) => string
): void {
  const sp = spinner();
  if (pc) {
    sp.start(pc(message));
    sp.stop(pc(message));
  } else {
    sp.start(message);
    sp.stop(message);
  }
}
