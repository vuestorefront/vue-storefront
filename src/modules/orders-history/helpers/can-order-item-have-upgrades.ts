import { BudsieStatus } from 'src/modules/shared';

import { OrderItem } from '../types/order-item';

const UPGRADE_ELIGIBLE_STATUSES: BudsieStatus[] = [
  BudsieStatus.AWAITING_CUSTOMIZATION,
  BudsieStatus.AWAITING_ARTWORK,
  BudsieStatus.ON_HOLD,
  BudsieStatus.REVIEW
];

export function canOrderItemHaveUpgrades (orderItem: OrderItem): boolean {
  if (!orderItem.extension_attributes?.alteration_product) {
    return false;
  }

  return UPGRADE_ELIGIBLE_STATUSES.includes(orderItem.progress_tracker.status_id);
}
