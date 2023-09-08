import { spinner } from "@clack/prompts";

export const log = (message: string): void => {
  const sp = spinner();
  sp.start(message);
  sp.stop(message);
};
