<template>
  <transition-group tag="div" class="notifications" name="slide-fade">
    <SfNotification
      v-for="notification in notifications"
      :key="notification.id"
      :message="notification.message"
      :action="notification.action && notification.action.text"
      :type="notification.type"
      @click:close="notification.dismiss"
      @click:action="notification.action && notification.action.onClick()"
      visible
    >
      <template #icon v-if="notification.icon">
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
    const { notifications } = useUiNotification();

    return {
      notifications
    };
  }
};
</script>

<style scoped lang="scss">
.notifications {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9;
  @include for-desktop {
    top: 100px;
    left: auto;
    bottom: auto;
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
  @include for-mobile {
    --notification-border-radius: 0;
    --notification-max-width: 100%;
    --notification-background: var(--c-link);
    --notification-font-size: var(--font-size--sm);
    --notification-font-family: var(--font-family--primary);
    --notification-font-weight: var(--font-weight--normal);
    --notification-padding: var(--spacer-base) var(--spacer-lg);
  }
  @include for-desktop {
    margin: 0 0 var(--spacer-xs) 0;
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s;
  @include for-desktop {
    transition: opacity 0.25s linear;
  }
}
.slide-fade-enter {
  transform: translateY(40px);
  @include for-desktop {
    opacity: 0;
  }
}
.slide-fade-leave-to {
  transform: translateY(80px);
  @include for-desktop {
    opacity: 0;
  }
}
</style>
