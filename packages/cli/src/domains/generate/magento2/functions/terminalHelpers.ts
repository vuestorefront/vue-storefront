import picocolors from "picocolors";
import { spinner } from "@clack/prompts";

export function simpleLog(
  message: string,
  pc?: (pcMessage: string) => string
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
