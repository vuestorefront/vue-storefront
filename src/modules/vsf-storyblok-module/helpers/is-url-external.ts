export default function isUrlExternal (url: string): boolean {
  return url.includes('://') || url.startsWith('//') || url.startsWith('mailto:');
}
