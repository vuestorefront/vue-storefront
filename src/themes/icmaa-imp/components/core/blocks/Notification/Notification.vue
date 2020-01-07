<template>
  <div
    class="notification t-text-white t-text-base t-cursor-pointer"
    :class="[type, backgroundColor]"
  >
    <div
      @click="execAction(action1, index)"
      class="message t-p-4 t-pb-1"
      data-testid="notificationMessage"
    >
      {{ message }}
    </div>
    <div class="actions t-flex t-justify-between">
      <div
        class="t-px-4 t-py-3 t-uppercase t-font-medium t-border-r-2"
        :class="[borderColor]"
        id="notificationAction1"
        data-testid="notificationAction1"
        @click="execAction(action1, index)"
      >
        {{ action1 ? action1.label : $t('OK') }}
      </div>
      <div
        class="t-w-full t-px-4 t-py-3 t-uppercase t-font-medium"
        id="notificationAction2"
        data-testid="notificationAction2"
        @click="execAction(action2, index)"
        v-if="action2"
      >
        {{ action2.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationItem',
  props: {
    index: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    action1: {
      type: [Object, Boolean],
      default: false
    },
    action2: {
      type: [Object, Boolean],
      default: false
    }
  },
  computed: {
    backgroundColor () {
      return 't-bg-' + this.colorCode
    },
    borderColor () {
      return 't-border-' + this.colorCode
    },
    colorCode () {
      switch (this.type) {
        case 'success':
          return 'alt-3'
        case 'error':
          return 'alert'
        case 'warning':
        case 'info':
          return 'alt-2'
        default:
          return 'base-tone'
      }
    }
  },
  methods: {
    execAction (action, index) {
      if (action && typeof action.action === 'function') {
        action.action()
      }
      this.$store.dispatch('notification/removeNotification', index)
    }
  }
}
</script>
