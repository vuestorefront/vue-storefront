export type TrafficAttributionData = {
  utm_source?: string,
  rawAttributes?: Record<string, string>
} & Record<string, string>;
