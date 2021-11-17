export default function getHiddenCode (code: string): string {
  const prefixLength = 4;
  const hiddenChar = 'X';

  const prefixCode = code.slice(0, prefixLength);
  let suffixCode = code.slice(prefixLength).replace(/([A-Z,0-9]{1})/g, hiddenChar);

  return prefixCode + suffixCode;
}
