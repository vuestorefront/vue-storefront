# Feature list

[[toc]]

## Integrations

### eCommerce
1. Commercetools (standard eCommerce scope [listed below](#ecommerce-integration-theme))
### Content Management System (CMS)
1. Storyblok (standard CMS scope [listed below](#content-management-system))
2. Contentstack (standard CMS scope [listed below](#content-management-system))
3. Amplience (standard CMS scope [listed below](#content-management-system))
### Payments
1. Checkout.com
    1. Credit Card, Klarna, Paypal and Sofort payment methods
    2. Saving Card and paying with a stored card if not-guest
    3. Possible to request CVC/CVV during saved card payment (niwiem czy jest to zakodzone na backendzie CKO, ale po naszestronie juz tak)
    4. Loading available payment methods for the provided cart
    5. Redirect to finalize payment support (e.g. 3ds for cards redirect for PayPal or Sofort)
    6. Possible to provide both success and error URL (redirect after a redirect)
    7. Choosing whether to save a payment method or not
    8. Customizing Frames (credit card sdk from CKO) (to tylko dlpodawania kart, nie mamy UI dla zapisanych kart!)
    9. Customizing Klarna
    10. Removing saved payment instruments
    11. Support for channels
    12. Possible to provide a custom reference for the payment
### Loyalty & Discounts
1. Talon.one
    1. Applying discount assigned to a single campaign by discount code
    2. Applying discount assigned to a single campaign by defined cart rules
    3. Discounts tracking in Talon.one panel
## eCommerce integration (theme)

### Product Tile
1. Display product price
2. Display product name
3. Display average rating
4. Display number of reviews
5. Display product catalog discounts
6. Quick Add to Cart (default variant)
7. Quick Add to Wishlist

### Product Listing Page
1. Products
   1. Display a list of products for a specific category
   2. Display number of total products found
2. Category
   1. Display a list of categories (same level and one level deeper)
   2. Display Breadcrumbs
3. Pagination
   1. Display pagination 
   2. Change the number of items per page
4. Filtering
   1. Filter products by attributes and price (faceting)
   2. Filtering is reflected in the URL
5. Sorting
   1. Sort by price
   2. Sort by newly added
   3. Sorting is reflected in the URL
6. UI
   1. Horizontal/Vertical product list switch

### Product Details Page
1. Product
   1. Display master variant
   2. Display product name
   3. Display product price
   4. Display discounted price
   5. Display product description
2. Product Variants
   1. Display product variants (by default color and size)
   2. Change variant
   3. Variant change is reflected in the URL
3. Product Gallery
   1. Show all product images as thumbnails
   2. Show one big product image
   3. Change big product image with one of thumbnails
4. Reviews
   1. Display average rating
   2. Display total number of reviews
   3. Add review as logged in user (no UI)
   4. Add review as logged out user (no UI)
5. Add to cart
   1. Add product variant to cart 
   2. Change quantity
6. Suggested products
   1. Display a list of suggested products from the same category
7. Other
   1. Add to Wishlist

### Cart
- Product
  - Display product name
  - Display product price
  - Display product discounts
  - Add product to cart
  - Remove product from cart
  - Change product Quantity
  <!-- - [TODO] Show product configuration
  - [TODO] save for later -->
- Summary
  - Show total price
  <!-- - [TODO] Show tax
  - [TODO] Show shipping costs
  - [TODO] Show discounts -->

### Wishlist
- Product
  - Display product name
  - Display product price
  - Display product discounts
  - Add product to wishlist
  - Remove product from wishlist

### Checkout
- Personal Details
  - Fill in name
  - Fill in surname
  - Fill in email
  - Create a new account from provided data by setting up a password
  - Use saved personal details (logged in)
  - Open log in modal (not logged in)
- Shipping
  - Choose from saved shipping addresses (logged in)
  - Add new shipping address (logged in)
  - Change default shipping address (logged in)
  - Provide Shipping Details
    - Fill in First and Last Name
    - Fill in Street name and apartment number
    - Fill in City and Zip Code
- Payment
  - Choose Payment Method
- Coupons
  - Add discount coupon
- Order summary
  - Display total price
  - Display shipping price
  - Display Tax
- Thank you page
  - Display order number

### User Authentication
- Log in with email and password
- Create a new account

### User Profile
- My Profile (Personal Details)
  - Change First Name
  - Change Last Name
  - Change email
  - Change password by using the old one and a new one
- Shipping Details
  - Delete Shipping Address
  - Change Shipping Address
  - Set Shipping Address as default
- Billing Details
  - Delete Billing Address
  - Change Billing Address
  - Set Billing Address as default
- Order History
  - See Order Status
  - See Order Id
  - See Order Price
  - Download Orders
- Log Out

## Content Management System
1. Theme
    1. Home Page Managed by the CMS
    2. Header and navigation managed by CMS
    3. Footer Managed by CMS
    4. Generic Static Page managed by CMS
2. Features
    1. Display a single document
    2. Display multiple documents
    3. Transform output to components
    4. Content Scheduling
    5. Internationalization
    6. Content Live Preview
    7. Add new static page from CMS Admin Panel without deployment
    8. Connection to eCommerce platform from within CMS Admin Panel
    9. Custom Components support

## Internationalization
1. Frontend translations based on `nuxt-i18n`
   1. String translations based on keys 
   2. Currencies translation
   3. Automatic routes generation and custom paths
   4. Search Engine Optimization
   5. Lazy-loading of translation messages
   6. Redirection based on auto-detected language
   7. Different domain names for different languages
2. eCommerce platform internationalization connected with `nuxt-i18n`
3. CMS platform internationalization connected with `nuxt-i18n`

## Progressive Web App
1. Automatic Web Manifest generation
2. Automatic icons scaling
3. Static Assets Caching (partial offline support)
4. Add to Home Screen

## Performance
- Two output modes
   - Modern mode without polyfills for modern browsers (20-30% smaller)
   - Legacy mode for old browsers (minority)
- Server-Side Rendering
- Server-Side Tag-based Cache
- Majority of JS code is executed on the server side to keep small bundles
- Automatic route-based code splitting (incl. CSS)
- Static assets client-side caching via Service Worker
- CSS Purging
- Preconnects to CDNs/Google Fonts
- HTTP/2 Push
- Lazy Hydration of below-the-fold elements


## Cloud

