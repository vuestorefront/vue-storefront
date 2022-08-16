import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';

import { SN_PROMOTION_PLATFORM } from '../types/StoreMutations';
import { USER_LEAVE_PAGE } from '../types/user-leave-page.event';

const LEFT_PADDING = 15;
const RIGHT_PADDING = 50;
const ALLOWED_ZONE_BOTTOM = 10;
const LOCAL_STORAGE_ITEM_NAME = 'user-leave-page';

export default async function onWindowMouseLeaveEventHandler (event: MouseEvent): Promise<void> {
  const promotionPlatformStorage = StorageManager.get(SN_PROMOTION_PLATFORM);

  const isUserAlreadyLeavePage = await promotionPlatformStorage.getItem(LOCAL_STORAGE_ITEM_NAME);

  if (isUserAlreadyLeavePage) {
    return;
  }

  const windowWidth = window.outerWidth;
  const allowedZoneLeft = windowWidth * LEFT_PADDING / 100;
  const allowedZoneRight = windowWidth * RIGHT_PADDING / 100;

  if (event.clientX < allowedZoneLeft ||
    event.clientX > allowedZoneRight ||
    event.clientY > ALLOWED_ZONE_BOTTOM
  ) {
    return;
  }

  promotionPlatformStorage.setItem(LOCAL_STORAGE_ITEM_NAME, true);

  EventBus.$emit(USER_LEAVE_PAGE);
}
