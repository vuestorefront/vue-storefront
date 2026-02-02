import { BudsieStatus } from 'src/modules/shared';

import { OrderItem } from '../types/order-item';

const UPGRADE_ELIGIBLE_STATUSES: BudsieStatus[] = [
  BudsieStatus.CREATED,
  BudsieStatus.REVIEW,
  BudsieStatus.APPROVED,
  BudsieStatus.AWAITING_ARTWORK,
  BudsieStatus.READY_FOR_PRODUCTION,
  BudsieStatus.AWAITING_CUSTOMIZATION
];

export function canOrderItemHaveUpgrades (orderItem: OrderItem): boolean {
  if (!orderItem.product.related_alteration_product) {
    return false;
  }

  return UPGRADE_ELIGIBLE_STATUSES.includes(orderItem.progress_tracker.status_id);
}
