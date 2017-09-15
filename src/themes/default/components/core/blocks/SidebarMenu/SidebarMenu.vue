<template>
    <div id="sidebar-menu" :class="{ active: isOpen }">
        <div class="material-icons close" @click="isOpen = false">close</div>
        <ul>
            <li>
                <router-link to="/" exact>Home</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'

export default {
  data () {
    return {
      isOpen: false
    }
  },
  created () {
    const self = this
    EventBus.$on('toggle-sidebar-menu', () => {
      self.isOpen = !self.isOpen
    })
  },
  mixins: [coreComponent('core/blocks/SidebarMenu/SidebarMenu')]
}
</script>

<style scoped>
#sidebar-menu {
    position: absolute;
    height: 100vh;
    width: 350px;
    background: #F2F2F2;
    top: 0;
    left: -350px;
}
#sidebar-menu.active {
    left: 0;
}
#sidebar-menu .close {
    cursor: pointer
}
</style>
