# Features / User Stories Checklist

## Documentation Checklist

- [ ] Documentation of Next is created.
- [ ] Documentation of commercetools API Client is created.
- [ ] Documentation of composables is created.
- [ ] Documentation of helpers is created.

## Setup / CI Checklist

- [x] Readme explains how to setup the project.
- [x] CI works well.
- [x] Test coverage check is added to the pipeline.
- [x] Continuous deployment to unstable test environment works.
- [x] Stable demo store is available.

## API Client Checklist

- [x] commercetools API Client package is prepared.
- [x] All required GraphQL queries are prepared.

## eCommerce Features Checklist

### Category Page

- [x] I want to see a category tree So I can understand the structure of eCommerce's offer.
- [ ] I want to use filters in category page So I can limit the products visible in the category page.
- [ ] I want to use sorting in the category page so I can change the order of the products to find these easily.
- [x] I want to open the specific category So I can see products inside.
- [ ] I want to use pagination in the category page So I don't have to load all the products within' the category at once.
- [x] I want to see the prices on the category page So I know how much do I need to pay for the product.
- [ ] I want to see the discounts on the category page So I can be attracted by lower prices.

### Navigation

- [x] I want to see the category tree So I can go through the page structure.
- [ ] I want to use Mega Menu.
- [ ] I want to see breadcrumbs So I can see where I am.

### Product Page

- [x] I want to open a product page So I can see the details of the product.
- [x] I want to add a product to the cart So I can buy that in the next step.
- [x] I want to edit the quantity of the product before adding it to the cart.
- [x] I want to change the variants of the product So I can easily switch between versions of the same master product.
- [ ] I want to see the product gallery So I can see how the product looks like.
- [x] I want to see the prices on the product page So I know how much do I need to pay for the product.
- [ ] I want to see the discounts on the product page So I can be attracted by lower prices.
- [x] I want to have properties pre-selected (like colour, size) when opening the Variant Product Page.
- [x] I want to see cross-sellings / related under the product.

### Cart

- [x] I want to open the cart So I can see the current state of my shopping basket.
- [x] I can see the totals in the cart So I know the values before I decide on placing an order.
- [x] I want to remove the product from the cart As I do not want to buy it any longer.
- [x] I want to edit the quantity of the product in a Cart Page.
- [ ] I want to choose a shipping method So it may get calculated into the cart totals.

### Checkout

- [x] I want to proceed to the checkout So I can place the order
- [ ] I want to be redirected to the thank you page after placing an order.
- [x] I want to create a guest order.
- [x] I want to select shipping address.
- [x] I want to select billing address.
- [x] I want to select a payment method.
- [x] I want to select a shipping method.
- [ ] I want to apply coupon code.
- [ ] I want to proceed my payment with external service.

### Thank You Page

- [ ] I want to see the thank you page So I am sure the order was placed successfully.

### User Management

- [x] I want to login as a customer So I can access My Account details and continue shopping as a recognized user.
- [x] I want to logout.
- [x] I want to register as a new customer So I can later log in to My Account.
- [ ] I want to reset the password So I can get a new one when I forgot the current one.

### Address Management

- [ ] I want to add a new address to the list of my addresses So later I can easily place the orders.
- [ ] I want to delete the existing address from the list of my addresses As I don't want to use it.
- [ ] I want to edit the details of my address So I can fix the eventual mistakes that I made.
- [ ] I want to mark the existing address as default shipping address So I do not have to choose it every order.
- [ ] I want to mark the existing address as default billing address So I do not have to choose it every order.
- [x] I want to see the history of my orders (list) So I can track the status of my shopping experiences.
- [ ] I want to see the history of my orders (details) So I can track the status of my shopping experiences.

### Prices / Tax
- [ ] I want to see the prices in the right currency and with applied tax.
- [ ] I want to see applied taxes depending on the selected country / area So I can display price properly.

### Multistores / Currencies / I18n

- [x] I want to change the language of the shop So I can easily understand the content.
- [ ] I want to see translated STATIC content to the language that I set So I can finally read the site in the language that I know.
- [x] I want to see translated DYNAMIC content to the language that I set So I can finally read the site in the language that I know.
- [x] I want to change the currency.
- [x] I want to change the country.

### SEO / SSR
- [x] I want to have pages pre-rendered on server-side.
- [ ] I want to have pretty urls.

### Prismic

- [x] I want to request any Prismic's query
- [x] I want to render any content block
- [x] I want to render any content slice
- [x] I want to get HTML elements by their name
- [x] I want to get HTML elements recursively
- [x] I want to connect to the public or private Prismic's repository
- [x] I want to customize own rendering strategy for any CMS element
- [x] I want to overwrite filtering method for taking content slices
- [ ] I want to fetch a content depending on website's language


### Algolia
- [ ] I want to search my products via Algolia engine.

### Others
- [ ] I want to have newsletter So I can notify my customers.
