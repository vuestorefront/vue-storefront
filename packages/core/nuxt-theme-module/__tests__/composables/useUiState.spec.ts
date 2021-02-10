import { useUiState } from '../../theme/composables';

const {
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
} = useUiState();

describe('useUiState', () => {
  it('Cart Sidebar', () => {
    const expectedIsCartSidebarOpen = !isCartSidebarOpen.value;

    toggleCartSidebar();

    expect(expectedIsCartSidebarOpen).toBe(isCartSidebarOpen.value);
  });

  it('Wishlist Sidebar', () => {
    const expectedIsWishlistSidebarOpen = !isWishlistSidebarOpen.value;

    toggleWishlistSidebar();

    expect(expectedIsWishlistSidebarOpen).toBe(isWishlistSidebarOpen.value);
  });

  it('Auth Modal', () => {
    const expectedIsAuthModalOpen = !isAuthModalOpen.value;

    toggleAuthModal();

    expect(expectedIsAuthModalOpen).toBe(isAuthModalOpen.value);
  });

  it('switches modal to register', () => {

    const expectedCurrentAuthModal = 'register';

    switchAuthModal('register');

    expect(expectedCurrentAuthModal).toBe(currentAuthModal.value);
  });

  it('Grid View', () => {
    const expectedIsCategoryGridView = !isCategoryGridView.value;

    toggleCategoryGridView();

    expect(expectedIsCategoryGridView).toBe(isCategoryGridView.value);
  });

  it('Filter Sidebar', () => {
    const expectedIsFilterSidebarOpen = !isFilterSidebarOpen.value;

    toggleFilterSidebar();

    expect(expectedIsFilterSidebarOpen).toBe(isFilterSidebarOpen.value);
  });
});
