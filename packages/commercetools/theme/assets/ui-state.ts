import Vue from 'vue'
import VueCompositionAPI, { reactive, computed } from '@vue/composition-api'

// We need to register it again because of Vue instance instantiation issues
Vue.use(VueCompositionAPI)

const state = reactive({
  isCartSidebarOpen: false,
  isLoginModalOpen: false,
})

const isCartSidebarOpen = computed(() => state.isCartSidebarOpen )
const toggleCartSidebar = () => { state.isCartSidebarOpen = !state.isCartSidebarOpen }

const isLoginModalOpen = computed(() => state.isLoginModalOpen )
const toggleLoginModal = () => { state.isLoginModalOpen = !state.isLoginModalOpen }

const uiState = {
  isCartSidebarOpen,
  isLoginModalOpen,
  toggleCartSidebar,
  toggleLoginModal
}

export default uiState
