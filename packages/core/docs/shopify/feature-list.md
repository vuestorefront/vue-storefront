---
sidebar: false
---
# Ecommerce and theme features

The following document lists the most important (but not all!) features of [Shopify integration with Vue Storefront 2](https://www.vuestorefront.io/shopify) offering.


## eCommerce integration and theme

### Product Tile

<img style="margin: 20px 0;" src="https://i.paste.pics/0ae92e0420bb81ec4a1a2f5d69d4de22.png" />

1. Display product image
2. Display product regular/sale price
3. Display product name
4. Display product catalog discounts
5. Quick Add to Cart (with default variant)


### Product Listing Page


<img style="filter: drop-shadow(0 0 0.75rem rgba(0,0,0,.2)); margin: 20px 0" src="https://user-images.githubusercontent.com/65275444/127649121-62c51fe0-d618-40e5-b443-81fdb8792a38.png">

1. Products
   1. Display a list of products for a specific collection
   2. Display number of total products found
   3. Display Breadcrumbs
2. Pagination
   1. Display pagination 
   2. Change the number of items per page
3. Sorting
   1. Sort latest
   2. Sort by Title: A to Z
   3. Sort by Title: Z to A
   4. Sort by Price: Low to high
   5. Sort by Price: High to low
   6. Sorting is reflected in the URL
4. UI
   1. Horizontal/Vertical product list switch

### Product Details Page

<img style="filter: drop-shadow(0 0 0.75rem rgba(0,0,0,.2)); margin: 20px 0" src="https://user-images.githubusercontent.com/65275444/127649836-fc9838d1-c837-4cd3-b201-a444f38278c1.png">

1. Product
   1. Display master variant
   2. Display product name
   3. Display product price
   4. Display discounted price
   5. Display product description
2. Product Variants
   1. Display product variants
   2. Change variant
   3. Variant change is reflected in the URL
3. Product Gallery
   1. Show all product images as thumbnails
   2. Show one big product image
   3. Change big product image with one of thumbnails
   4. Change active variant image on variant selection
4. Add to cart
   1. Add product variant to cart
   2. Change quantity
5. Suggested products
   1. Display a list of suggested products from the same collection

### Cart drawer

<img style="filter: drop-shadow(0 0 0.75rem rgba(0,0,0,.2)); margin: 20px 0" src="https://user-images.githubusercontent.com/65275444/127650453-16150647-121e-4fac-ab17-b7eb457c9d48.png">

<img style="filter: drop-shadow(0 0 0.75rem rgba(0,0,0,.2)); margin: 20px 0" src="https://user-images.githubusercontent.com/65275444/127650742-4d5e85a2-cbe6-49a7-a0ad-d8014af3aff5.png">

- Product
  - Display product name
  - Display product price
  - Add product to cart
  - Remove product from cart
  - Confirmation on remove from cart
  - Change product Quantity
  - Empty cart
- Summary
  - Show total price

### User Authentication

<img style="filter: drop-shadow(0 0 0.75rem rgba(0,0,0,.2)); margin: 20px 0" src="https://user-images.githubusercontent.com/65275444/127651009-dbc7b043-91ab-48f1-83c1-8aa649b9863c.png">

- Log in with email and password
- Create a new account
- Reset password

### User Profile

<img style="filter: drop-shadow(0 0 0.75rem rgba(0,0,0,.2)); margin: 20px 0" src="https://user-images.githubusercontent.com/65275444/127651335-6cce290c-c4bb-4de0-b48a-3c1c9d4fe88c.png">

<img style="filter: drop-shadow(0 0 0.75rem rgba(0,0,0,.2)); margin: 20px 0" src="https://user-images.githubusercontent.com/65275444/127651516-b92ee638-1f9d-4946-99f7-b71c45406763.png">

<img style="filter: drop-shadow(0 0 0.75rem rgba(0,0,0,.2)); margin: 20px 0" src="https://user-images.githubusercontent.com/65275444/127651669-95b6f72d-d686-4e29-978d-6a0002ad1873.png">

- My Profile (Personal Details)
  - Change firstname
  - Change lastname
  - Change password with adding confirm password
- Address book
  - Delete address
  - Change address
  - View all address
- Order History
  - See Order Status
  - See Order Id
  - See Order Price
  - Download Orders
  - Order tracking
  - Order address
- Log Out

### Error page

<img style="filter: drop-shadow(0 0 0.75rem rgba(0,0,0,.2)); margin: 20px 0" src="https://user-images.githubusercontent.com/65275444/127652033-80339ed5-422a-4413-bdd6-296ad3449597.png">

- Error Page for 404/server errors

## Content Management System
1. Out of the box components available in the CMS
   - Accordion
   - Alert
   - Banner
   - Call to action
   - Carousel
   - Editorial (renders HTML)
   - Footer
   - Gallery
   - Grid
   - Heading
   - Hero
   - Link
   - List
   - Navigation list
   - Product Card
   - Product Slider
   - Steps
   - Tabs
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
