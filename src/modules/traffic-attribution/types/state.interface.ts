import { TrafficAttributionData } from './traffic-attribution.interface';

export interface TrafficAttributionState {
  trafficAttribution: TrafficAttributionData | null,
  lastMeaningfulTrafficAttribution: TrafficAttributionData | null
}
