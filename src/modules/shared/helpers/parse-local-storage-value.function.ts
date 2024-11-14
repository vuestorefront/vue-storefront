export function parseLocalStorageValue (
  rawValue: string | undefined
) {
  if (!rawValue) {
    return;
  }

  try {
    return JSON.parse(rawValue);
  } catch (_) {
    return rawValue;
  }
}
