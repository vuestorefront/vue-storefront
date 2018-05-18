<template>
  <div class="microcart">
    <h3>Microcart</h3>
    <div v-for="(item, index) in items" :key="index"> {{ item.name }} ({{ item.qty }}) </div>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('blocks/Microcart/Microcart')]
}
</script>
