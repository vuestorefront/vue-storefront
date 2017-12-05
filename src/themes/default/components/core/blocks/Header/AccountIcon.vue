<template>
  <div class="account-icon inline-flex" @click="gotoAccount">
    <i class="material-icons md-18">account_circle</i>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Header/AccountIcon')]
}
</script>
