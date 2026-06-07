export interface TrafficAttributionData {
  landing_page_url: string,
  referrer_url?: string,
  query_params: Record<string, string>,
  detected_at: string
}

export interface TouchData {
  attribution: TrafficAttributionData,
  isSent: boolean,
  createdAt: number,
  expiresAt: number
}
