import { TouchData } from './traffic-attribution.interface';

export interface TrafficAttributionState {
  firstTouch: TouchData | null,
  lastTouch: TouchData | null
}
