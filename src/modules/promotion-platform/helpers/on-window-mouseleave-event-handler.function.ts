import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';

import { SN_PROMOTION_PLATFORM } from '../types/StoreMutations';
import { USER_LEAVING_WEBSITE } from '../types/user-leaving-website.event';

const LEFT_PADDING = 15;
const RIGHT_PADDING = 50;
const ALLOWED_ZONE_BOTTOM = 10;
const LOCAL_STORAGE_ITEM_NAME = 'user-leave-page-event-was-fired';

export default async function onWindowMouseLeaveEventHandler (event: MouseEvent): Promise<void> {
  const promotionPlatformStorage = StorageManager.get(SN_PROMOTION_PLATFORM);

  const wasEventAlreadyFiredBefore = await promotionPlatformStorage.getItem(LOCAL_STORAGE_ITEM_NAME);

  if (wasEventAlreadyFiredBefore) {
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

  EventBus.$emit(USER_LEAVING_WEBSITE);

  promotionPlatformStorage.setItem(LOCAL_STORAGE_ITEM_NAME, true);
}
