import { ProgressTrackerStatus } from './progress-tracker-status';

export interface ProgressTrackerData {
  is_cancelled: boolean,
  status_id: number,
  status_list: ProgressTrackerStatus[]
}
