export default function getMaskedCode (code: string): string {
  const prefixLength = 4;
  const postfixLength = 4;
  const maskChar = 'X';

  const prefixCode = code.slice(0, prefixLength);
  let suffixCode = code.slice(prefixLength, code.length - postfixLength).replace(/[^-]/g, maskChar);
  let postfixCode = code.slice(code.length - postfixLength);

  return prefixCode + suffixCode + postfixCode;
}
