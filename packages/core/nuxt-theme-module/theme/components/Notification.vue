<template>
  <transition-group tag='div' class="notifications" name='sf-fade'>
    <SfNotification
      v-for="notification in notifications"
      :key="notification.id"
      :visible="!!notification.id"
      :message="notification.message"
      :action="notification.action && notification.action.text"
      :type="notification.type"
      @click:close="remove(notification.id)"
      @click:action="notification.action && notification.action.onClick()"
    >
      <template #icon="{icon}" v-if="notification.icon">
        <SfIcon :icon="notification.icon" color="white"/>
      </template>
    </SfNotification>
  </transition-group>
</template>

<script>
import { SfNotification, SfIcon } from '@storefront-ui/vue';
import { useUiNotification } from '~/composables';

export default {
  name: 'Notification',
  components: {
    SfNotification,
    SfIcon
  },
  setup () {
    const { notifications, remove } = useUiNotification();

    return {
      notifications,
      remove
    };
  }
};
</script>

<style scoped lang="scss">
.notifications {
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  bottom: var(--bottom-navigation-height, 3.75rem);
  z-index: 9;
  @include for-desktop {
    left: auto;
    right: 5%;
    width: 320px;
  }
}
.sf-notification {
  max-width: 100%;
  margin: var(--spacer-xs) auto 0 auto;
  &:first-child {
    margin-top: 0;
  }
  @include for-desktop {
    margin: 0 0 var(--spacer-xs) 0;
  }
}
</style>
