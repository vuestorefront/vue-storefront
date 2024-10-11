export type RemoveAnsiCode = (str: string) => string;

export const removeAnsiColorCodesFromStr: RemoveAnsiCode = (str) => {
  // eslint-disable-next-line no-control-regex
  const ansiRegex = /\x1B\[[0-?9;]*[mK]/g;

  return str.replace(ansiRegex, "");
};
