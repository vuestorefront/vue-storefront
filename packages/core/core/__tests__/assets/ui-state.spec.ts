import uiState from '../../../nuxt-theme-module/theme/assets/ui-state';

const { isCartSidebarOpen,
  isWishlistSidebarOpen,
  isLoginModalOpen,
  toggleCartSidebar,
  toggleWishlistSidebar,
  toggleLoginModal } = uiState;

describe('ui-state', () => {
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
});
