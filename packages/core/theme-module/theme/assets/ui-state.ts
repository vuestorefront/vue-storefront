import Vue from 'vue';
import VueCompositionAPI, { reactive, computed } from '@vue/composition-api';

// We need to register it again because of Vue instance instantiation issues
Vue.use(VueCompositionAPI);

const state = reactive({
  isCartSidebarOpen: false,
  isWishlistSidebarOpen: false,
  isLoginModalOpen: false
});

const isCartSidebarOpen = computed(() => state.isCartSidebarOpen);
const toggleCartSidebar = () => {
  state.isCartSidebarOpen = !state.isCartSidebarOpen;
};

const isWishlistSidebarOpen = computed(() => state.isWishlistSidebarOpen);
const toggleWishlistSidebar = () => {
  state.isWishlistSidebarOpen = !state.isWishlistSidebarOpen;
};

const isLoginModalOpen = computed(() => state.isLoginModalOpen);
const toggleLoginModal = () => {
  state.isLoginModalOpen = !state.isLoginModalOpen;
};

const uiState = {
  isCartSidebarOpen,
  isWishlistSidebarOpen,
  isLoginModalOpen,
  toggleCartSidebar,
  toggleWishlistSidebar,
  toggleLoginModal
};

export default uiState;
