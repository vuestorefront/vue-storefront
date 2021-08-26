import { useUiState } from '../../../nuxt-theme-module/theme/composables';

const {
  isCartSidebarOpen,
  isWishlistSidebarOpen,
  isLoginModalOpen,
  isCategoryGridView,
  isFilterSidebarOpen,
  isMobileMenuOpen,
  toggleCartSidebar,
  toggleWishlistSidebar,
  toggleLoginModal,
  changeToCategoryListView,
  changeToCategoryGridView,
  toggleFilterSidebar,
  toggleMobileMenu
} = useUiState();

describe('useUiState', () => {
  it('Mobile Menu', () => {
    const expectedIsMobileMenuOpen = !isMobileMenuOpen.value;

    toggleMobileMenu();

    expect(expectedIsMobileMenuOpen).toBe(isMobileMenuOpen.value);
  });

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

  it('Login Modal', () => {
    const expectedIsLoginModalOpen = !isLoginModalOpen.value;

    toggleLoginModal();

    expect(expectedIsLoginModalOpen).toBe(isLoginModalOpen.value);
  });

  it('Grid View', () => {
    const expectedIsCategoryGridView = isCategoryGridView.value;

    changeToCategoryGridView();

    expect(expectedIsCategoryGridView).toBe(isCategoryGridView.value);
  });

  it('List View', () => {
    const expectedIsCategoryGridView = !isCategoryGridView.value;

    changeToCategoryListView();

    expect(expectedIsCategoryGridView).toBe(isCategoryGridView.value);
  });

  it('Filter Sidebar', () => {
    const expectedIsFilterSidebarOpen = !isFilterSidebarOpen.value;

    toggleFilterSidebar();

    expect(expectedIsFilterSidebarOpen).toBe(isFilterSidebarOpen.value);
  });
});
