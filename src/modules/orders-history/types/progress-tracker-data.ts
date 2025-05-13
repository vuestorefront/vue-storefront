import { ProgressTrackerStatus } from './progress-tracker-status';

export interface ProgressTrackerData {
  completed: boolean,
  cancelled: boolean,
  status_id: number,
  status_list: ProgressTrackerStatus[]
}
