<template>
  <div class="t-w-full lg:t-w-1/2 t-px-4" data-test-id="LogoLineBlock">
    <h4 class="t-flex t-justify-between t-items-center t-text-xl t-text-base-dark t-mb-4">
      {{ $t('Our {department}', { department: $t(title) }) }}
      <router-link :to="localizedRoute(path)" class="t-inline-block t-l t-text-primary t-text-xs t-leading-loose">
        {{ $t('View all') }}
      </router-link>
    </h4>
    <logo-line :parent-id="parentId" :limit="12" :placeholder="true" column-class="t-w-1/3 md:t-w-1/6 lg:t-w-1/4 t-py-2" class="t-justify-between" />
  </div>
</template>

<script>
import LogoLine from 'theme/components/core/blocks/CategoryExtras/LogoLine'

export default {
  name: 'LogolineBlock',
  components: {
    LogoLine
  },
  props: {
    parentId: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  }
}
</script>
