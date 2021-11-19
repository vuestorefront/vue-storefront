export default function getMaskedCode (code: string): string {
  const prefixLength = 4;
  const maskChar = 'X';

  const prefixCode = code.slice(0, prefixLength);
  let suffixCode = code.slice(prefixLength).replace(/[^-]/g, maskChar);

  return prefixCode + suffixCode;
}
