export default function getHostFromHeaders (headers: Record<string, string>): string {
  return headers['x-forwarded-host'] !== undefined ? headers['x-forwarded-host'] : headers['host']
}
