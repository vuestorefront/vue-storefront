# Layout and Routing

Next step after the `nuxt.config.js` file would be layouts and pages.

Unless configured otherwise, pages use the `default.vue` component as a layout. Open the `layouts/default.vue` component to get the general idea on how the page looks like, what component are used and what data is loaded within the `setup` function.

Layout components include a special `<Nuxt />` component that displays the content of the page, based on the current URL. Those pages are Vue.js components too, registered in the `pages` directory.

Let's move to the `pages` directory. All `.vue` files inside of it will be automatically registered as application routes. For example creating an `AboutUs.vue` component will create an `/about-us` route. The same way, creating the same component inside a nested directory called `company` will create `/company/about-us` route.
