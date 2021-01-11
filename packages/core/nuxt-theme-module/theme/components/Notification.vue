<template>
  <transition-group tag="div" class="notifications" :name="isMobile ? 'slide' : 'sf-fade'">
    <SfNotification
      v-for="(notification, index) in notifications"
      :key="notification.id"
      :visible="true"
      :message="notification.message"
      :action="notification.action && notification.action.text"
      :type="notification.type"
      @click:close="remove(index)"
      @click:action="notification.action && notification.action.onClick()"
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
import { ref, onMounted, onBeforeUnmount} from '@vue/composition-api';

export default {
  name: 'Notification',
  components: {
    SfNotification,
    SfIcon
  },
  setup () {
    const { notifications } = useUiNotification();
    const isMobile = ref(false);

    const remove = (index) => notifications.value.splice(index, 1);

    const mobileHandler = (event) => {
      isMobile.value = event.matches;
    };

    onMounted(() => {
      isMobile.value =
        Math.max(document.documentElement.clientWidth, window.innerWidth) <=
        1023;
      window.matchMedia('(max-width: 1023px)').addListener(mobileHandler);
    });

    onBeforeUnmount(() => {
      window
        .matchMedia('(max-width: 1023px)')
        .removeListener(mobileHandler);
    });

    return {
      notifications,
      remove,
      isMobile
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
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter {
  transform: translateY(40px);
}
.slide-leave-to {
  transform: translateY(80px);
}
</style>
