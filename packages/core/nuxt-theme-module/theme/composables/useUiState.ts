import Vue from 'vue';
import VueCompositionAPI, { reactive, computed } from '@vue/composition-api';

// We need to register it again because of Vue instance instantiation issues
Vue.use(VueCompositionAPI);

const state = reactive({
  isCartSidebarOpen: false,
  isWishlistSidebarOpen: false,
  isAuthModalOpen: false,
  isCategoryGridView: true,
  isFilterSidebarOpen: false,
  currentAuthModal: ''
});

const useUiState = () => {
  const isCartSidebarOpen = computed(() => state.isCartSidebarOpen);
  const toggleCartSidebar = () => {
    state.isCartSidebarOpen = !state.isCartSidebarOpen;
  };

  const isWishlistSidebarOpen = computed(() => state.isWishlistSidebarOpen);
  const toggleWishlistSidebar = () => {
    state.isWishlistSidebarOpen = !state.isWishlistSidebarOpen;
  };

  const isAuthModalOpen = computed(() => state.isAuthModalOpen);
  const currentAuthModal = computed(() => state.currentAuthModal);
  const toggleAuthModal = () => {
    state.isAuthModalOpen = !state.isAuthModalOpen;
  };
  const switchAuthModal = (auth: string) => state.currentAuthModal = auth;

  const isCategoryGridView = computed(() => state.isCategoryGridView);
  const toggleCategoryGridView = () => {
    state.isCategoryGridView = !state.isCategoryGridView;
  };

  const isFilterSidebarOpen = computed(() => state.isFilterSidebarOpen);
  const toggleFilterSidebar = () => {
    state.isFilterSidebarOpen = !state.isFilterSidebarOpen;
  };

  return {
    isCartSidebarOpen,
    isWishlistSidebarOpen,
    isAuthModalOpen,
    isCategoryGridView,
    isFilterSidebarOpen,
    currentAuthModal,
    toggleCartSidebar,
    toggleWishlistSidebar,
    toggleAuthModal,
    toggleCategoryGridView,
    toggleFilterSidebar,
    switchAuthModal
  };
};

export default useUiState;
