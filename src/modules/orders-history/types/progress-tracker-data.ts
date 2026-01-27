import { BudsieStatus } from 'src/modules/shared';
import { ProgressTrackerStatus } from './progress-tracker-status';

export interface ProgressTrackerData {
  completed: boolean,
  cancelled: boolean,
  status_id: BudsieStatus,
  status_list: ProgressTrackerStatus[]
}
