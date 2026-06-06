export type TrafficAttributionData = {
  utm_source?: string,
  rawAttributes?: Record<string, string>
} & Record<string, string>;

export interface TouchData {
  attribution: TrafficAttributionData,
  isSent: boolean,
  createdAt: number,
  expiresAt: number
}
