import { ProgressTrackerStatus } from './progress-tracker-status';

export interface ProgressTrackerData {
  cancelled: boolean,
  status_id: number,
  status_list: ProgressTrackerStatus[]
}
