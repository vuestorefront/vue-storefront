import { CliUx } from '@oclif/core';
import picocolors from 'picocolors';

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
  console.log(picocolors.green(message));
}

export function logSimpleErrorMessage(message: string): void {
  console.log(picocolors.red(message));
}

export function logSimpleWarningMessage(message: string): void {
  console.log(picocolors.yellow(message));
}

export function logSimpleInfoMessage(message: string): void {
  console.log(picocolors.blue(message));
}

export function simpleLog(message: string): void {
  console.log(message);
}
