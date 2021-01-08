---
sidebar: false
---
# Feature list

The following document lists the most important (but not all!) features of [Vue Storefront Cloud](https://www.vuestorefront.io/cloud) offering.


[[toc]]

## Key Platform Features

**1. No UI/functional limitations**

Vue Storefront is just a framework and you can build your UI in any way you want. anything that is possible with Nuxt is also possible with Vue Storefront

**2. Backend-agnostic**

We have the same interfaces for the same types of vendors (eCommerce/Search/CMS/...). Because of that you can keep most of your frontend uanware of the backend services. If you decide to change any part of your eCommerce stack in the future your frontend could remain untouched.

**3. Focus on performance**

We're providing a bulletproof architecture, great default, best practices and tools to make sure your app will perform smooth. Majority of business logic is handled on the server side to make sure client bundles are small.

**4. No vendor lock-in**

You own your code so its up to you what services you will use for eCommerce or CMS. It's up to you where and how you will host it and deploy. Vue Storefront will never lock you into its services and you always.

**5. Focus on quick time to market**

We've built Vue Storefront to make eCommerce frontends development process as enjoyable and smooth as possible. Just like Vue and Nuxt themselves we're focusing on getting things done, providing good defaults and giving our users integrations and extensions they they can use to speed up their development process.

**6. All-in-one modular solution.**

Vue Storefront is a set of tools that can work together (or independently) to support you in all areas of development. We provide out of the box integrations, framework for connecting all of them, library of UI components and a cloud hosting service.

You can let us take care of all aspects of your eCommerce presence or replace any of those parts with your own, custom services.

**7. Huge and vibrant community**

Vue Storefront is the only truly Open Source eCommerce frontend framework with an active and vibrant community of thousands developers all around the world. If you choose Vue Storefront You're never left on your own.


## Integrations

### eCommerce
- Commercetools (standard eCommerce scope [listed below](#ecommerce-integration-theme))
### Content Management System (CMS)
- Storyblok (standard CMS scope [listed below](#content-management-system))
- Contentstack (standard CMS scope [listed below](#content-management-system))
- Amplience (standard CMS scope [listed below](#content-management-system))
### Payments
- Checkout.com
    1. Credit Card, Klarna, Paypal and Sofort payment methods
    2. Saving Card and paying with a stored card if not-guest
    3. Possible to request CVC/CVV during saved card payment 
    4. Loading available payment methods for the provided cart
    5. Redirect to finalize payment support (e.g. 3ds for cards redirect for PayPal or Sofort)
    6. Possible to provide both success and error URL (redirect after a redirect)
    7. Choosing whether to save a payment method or not
    8. Customizing Frames (credit card sdk from CKO)
    9. Customizing Klarna
    10. Removing saved payment instruments
    11. Support for channels
    12. Possible to provide a custom reference for the payment
- Adyen
    1. Payments with Credit Card supported by Frames' SDK with 3DS Support
    2. Saving Credit Cards, paying with them, and removing them from storage (you have to create own UI here)
    3. Possible to force providing CVV/CVC each time while paying with Saved Card
    4. Payments with PayPal
    5. Payments with Sofort
    6. Payments with Klarna Pay Later 
### Loyalty & Discounts
- Talon.one
    1. Applying discount assigned to a single campaign by discount code
    2. Applying discount assigned to a single campaign by defined cart rules
    3. Discounts tracking in Talon.one panel
## eCommerce integration and theme

### Product Tile

<img style="margin: 20px 0;" src="https://i.paste.pics/0ae92e0420bb81ec4a1a2f5d69d4de22.png" />

1. Display product price
2. Display product name
3. Display average rating
4. Display number of reviews
5. Display product catalog discounts
6. Quick Add to Cart (default variant)
7. Quick Add to Wishlist

### Product Listing Page


<img style="filter: drop-shadow(0 0 0.75rem rgba(0,0,0,.2)); margin: 20px 0" src="https://i.paste.pics/4e8897e22d379e5b14dd5d24e363a81c.png">

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

<img style="filter: drop-shadow(0 0 0.75rem rgba(0,0,0,.2)); margin: 20px 0" src="https://i.paste.pics/6887576d8575dcd62d6036701ed9d969.png">

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

<img style="filter: drop-shadow(0 0 0.75rem rgba(0,0,0,.2)); margin: 20px 0" src="https://i.paste.pics/f748c52ae93e3d1f6cca825e2ccb0d6e.png">

- Product
  - Display product name
  - Display product price
  - Display product discounts
  - Add product to cart
  - Remove product from cart
  - Change product Quantity
- Summary
  - Show total price


### Wishlist

<img style="filter: drop-shadow(0 0 0.75rem rgba(0,0,0,.2)); margin: 20px 0" src="https://i.paste.pics/8f47b2fc77c09c9bae615d7a302c9688.png">

- Product
  - Display product name
  - Display product price
  - Display product discounts
  - Add product to wishlist
  - Remove product from wishlist

### Checkout

<img style="filter: drop-shadow(0 0 0.75rem rgba(0,0,0,.2)); margin: 20px 0" src="https://i.paste.pics/79aec2ac6b2f9eb6d1fb0278a51427d7.png">

- Order types
  - Logged in
  - Guest
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

<img style="filter: drop-shadow(0 0 0.75rem rgba(0,0,0,.2)); margin: 20px 0" src="https://i.paste.pics/df6c20e1e03d0e54d5191db8625d9f91.png">

- Log in with email and password
- Create a new account

### User Profile

<img style="filter: drop-shadow(0 0 0.75rem rgba(0,0,0,.2)); margin: 20px 0" src="https://i.paste.pics/34a0a6ad29933b0dac21248ad79686bc.png">

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

### Error page

<img style="filter: drop-shadow(0 0 0.75rem rgba(0,0,0,.2)); margin: 20px 0" src="https://i.paste.pics/f3f3cb3dbce3f022f020533986c82d89.png">

- Error Page for 404/server errors

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

## Middleware
- Server-side Express API middleware

## Cloud

**1. Hosting**

Our tech team will manage your instance backups and the infrastructure based on Google Cloud for optimal performance. 

**2. Automatic Backups**

We perform daily backups. Each user has direct access to the backup drive via storefrontcloud-cli tool or via the support line.

**3. Multiregions**

Our shop can be deploy at any region of the World, possibly close to you customers.

**4. 24/7 aviability monitoring**

Our Cloud team is using internal monitoring systems to provide you with SLA. Moreover, users get access to the New Relic monitoring tool (included in the price, on demand) for monitoring applications and performance on their own.

**5. Access and errors log**

We can insert access and error logs in any systems that you prefer.

**6. Gitlab / Github source-code management**

Part of the service is Git repository hosting and Git-based deployment process. We’re offering this to our clients with private Gitlab accounts, available here: https://code.storefrontcloud.io

**7. Automatic deployments**

Each deployment is managed via storefrontcloud-cli and the Gitlab repository. We’re using fully automatic deployment flow with the evidence of changes (gitlog) and easy restore process in case of failed deploy.

**8. As many environments as you need**

You can use our CI/CD pipeline to build environment per each PR.

**9. Staging enviroment**

Vue Storefront Cloud clients are getting access to the second (and possible third, fourth, etc.) environments that are not used for production. These environments are still synchronized with the backend and can be used for development and testing purposes, however, are not covered by full SLA and are not using CDN (Content Delivery Network) and other optimization features that are enabled for the the production environment by default.

**10. Production ready setup**

The infrastructure is optimized for performance and safety. After signing up, you will get access to a production-grade environment with a deployed default version of Vue Storefront. All your team/agency will need to do is customize it, and apply custom features and a layout.

**11. CLI access to env (via kubect)**

The platform is accessible and can be managed via the storefrontcloud-cli tool. It’s a dedicated tool to manage the Kubernetes cluster and Vue Storefront deployments, backups, and logs. Please find more information in our knowledge base, available here: https://help.storefrontcloud.io 

**12. All of the Commercetools OOTB Features ready on enviroment**

By default, Vue Storefront Cloud is integrated with commercetools. This service is included in the price. All you need are commercetools API access details to get the products, categories, and user accounts in sync with your instance.

**13. Access via API**

All Vue Storefront Cloud config options are available via API

**14. SLA & Support**

The Storefront Cloud team will guarantee 99,8% SLA for the infrastructure and Vue Storefront base app (modifications and custom integrations created by merchant/agency are excluded). Our clients can use our dedicated Slack support channel to contact the team and check the tickets’ statuses.

**15. API Integratios with 3rd party services OOTB**

The Vue Storefront list of integrations is growing every day. It offers a range of standard integrations and an API that users can use to sync other applications with their own backend systems.

**16. Customer Dashboard**

The Vue Storefront Cloud has a customer dasboard with very usefull features, like: traffic, instances, environments

**17. CDN**

**18. VSF sandboxes**

We can run sandbox/demo instances in a few mintues, with one click.

**19. GEO-Fancing**

We have geo and ddos protection. You can decide, in which country your store is available.

**20. Rich Content**

With token access protection, VSF offer selling virtual content with user access managment.