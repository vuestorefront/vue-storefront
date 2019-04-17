# Working with UI Store (Interface state)

We are using Vuex to store the application interface state. The [ui-store file](https://github.com/DivanteLtd/vue-storefront/blob/master/src/modules/ui-store/index.ts) contains the information about the state of different pieces of UI like: Overlay visibility, Wishlist visibility etc. Of course, you are not forced to make use of it in your theme but keep in mind that many of core components are using UI store.

## State object

- `sidebar` - visible/hidden state of sidebar menu (find: `SidebarMenu.vue`)
- `microcart` - visible/hidden state of microcart (find: `Microcart.vue`)
- `wishlist` - visible/hidden state of wishlist (find: `Wishlist.vue`)
- `searchpanel` - visible/hidden state of search panel (find: `SearchPanel.vue`)
- `newsletterPopup` - visible/hidden state of newsletter popup (_will be removed from Vuex store_)
- `overlay` - visible/hidden state of overlay (find: `Overlay.vue`)
- `loader` - visible/hidden state of loader (find: `Loader.vue`)
- `authElem` - component to be displayed at Auth popup (will be changed and moved only to this component)
- `checkoutMode` - determines whether user is in checkout or not - useful when you want to change some UI elements or behavior only on checkout (e.g. hide footer)
- `openMyAccount` - determines whether to redirect user to My Account page - used when user clicked on My Account link in the sidebar, but had to login first. After successful logging in user will be automatically redirected to My Account page.
