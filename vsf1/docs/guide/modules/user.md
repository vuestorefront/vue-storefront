# User Module

This module contains all the logic, components and store related to the user account

## Components

### AccountButton

A component to handle redirects to user account page and user logout. Usually used in header.

**Computed**

- `isLoggedIn` - represents if user is logged in;
- `user` - current user.

**Methods**

- `goToAccount` - is user is logged in, redirects user to account page. Otherwise shows sign-up modal
- `logout` - emits `user-before-logout` event and redirects user to home page

### Login

**Methods**

- `close` - closes sign-up modal
- `callLogin` - starts authentication process with emitting `notification-progress-start`, calls `user/login` action with user's email and password.
- `switchElem` - triggers `setAuthElem` mutation with `register` parameter
- `callForgotPassword` - triggers `setAuthElem` mutation with `forgot-pass` parameter

### Register

**Methods**

- `switchElem` - triggers `setAuthElem` mutation with `register` parameter
- `close` - closes sign-up modal
- `callRegister` - starts registration process with emitting `notification-progress-start`, calls `user/register` action with user's email, password, first name and last name.

### UserAccount

**Methods**

- `onLoggedIn` - sets `currentUser` and `userCompany`. This method is called on `user-after-loggedin` bus event
- `edit` - sets `isEdited` flag to `true`
- `objectsEqual (a, b, excludedFields = [])` - checks if two passed objects are equal to each other
- `updateProfile` - updates user profile with new data. Calls a method `exitSection(null, updatedProfile)`
- `exitSection` - emits `myAccount-before-updateUser` bus event with updated user profile. Resets component user data to default values.
- `getUserCompany` - finds user company
- `getCountryName` - finds user country name

### UserShippingDetails

**Methods**

- `onLoggedIn` - sets `currentUser` and `shippingDetails`. This method is called on `user-after-loggedin` bus event
- `edit` - sets `isEdited` flag to `true`
- `updateDetails` - updates shipping details with new data. Calls a method `updatedShippingDetails`
- `exitSection` - emits `myAccount-before-updateUser` bus event with updated shipping details. Resets component user data to default values
- `fillCompanyAddress` - finds shipping details
- `getCountryName` - finds country name
- `hasBillingAddres` - returns `true` if user has a billing address

## Store

User Store is designed to handle all actions related to the user account.
All user related data is stored in the original eCommerce CMS/Magento and the modifying actions are executed directly against the platform API.

### State

```js
  state: {
    token: '',
    current: null
  },
```

The user state data:

- `token` - this is the current user token got from the [`user/login`](https://github.com/vuestorefront/vue-storefront/blob/fabea12dd6ab4f8824b58812b0cfdabce94cde70/core/store/modules/user/actions.js#L64). It's used to authorize all subsequent calls with the current user identity. If this token is not empty it does mean that the user is authorized.
- `current` - this is the current user object received from [`user/me`](https://github.com/vuestorefront/vue-storefront/blob/fabea12dd6ab4f8824b58812b0cfdabce94cde70/core/store/modules/user/actions.js#L105) - immediately called after the login action.

The user data format:

```json
{
  "code": 200,
  "result": {
    "id": 58,
    "group_id": 1,
    "default_billing": "62",
    "default_shipping": "48",
    "created_at": "2018-01-23 15:30:00",
    "updated_at": "2018-03-04 06:39:28",
    "created_in": "Default Store View",
    "email": "pkarwatka28@example.pl",
    "firstname": "Piotr",
    "lastname": "Karwatka",
    "store_id": 1,
    "website_id": 1,
    "addresses": [
      {
        "id": 48,
        "customer_id": 58,
        "region": {
          "region_code": null,
          "region": null,
          "region_id": 0
        },
        "region_id": 0,
        "country_id": "PL",
        "street": ["Street", "12"],
        "telephone": "",
        "postcode": "51-169",
        "city": "City",
        "firstname": "Piotr",
        "lastname": "Karwatka",
        "default_shipping": true
      },
      {
        "id": 62,
        "customer_id": 58,
        "region": {
          "region_code": null,
          "region": null,
          "region_id": 0
        },
        "region_id": 0,
        "country_id": "PL",
        "street": ["Street", "12"],
        "company": "example",
        "telephone": "",
        "postcode": "51-169",
        "city": "City",
        "firstname": "Piotr",
        "lastname": "Karwatka",
        "vat_id": "PL8951930748",
        "default_billing": true
      }
    ],
    "disable_auto_group_change": 0
  }
}
```

### Events

The following events are published from `user` store:

- `EventBus.$emit('session-after-started')` - executed just [after the application has been loaded](https://github.com/vuestorefront/vue-storefront/blob/fabea12dd6ab4f8824b58812b0cfdabce94cde70/core/store/modules/user/actions.js#L22) and the User UI session has started
- `EventBus.$emit('user-after-loggedin', res)` - executed after the successful [`user/me` action call](https://github.com/vuestorefront/vue-storefront/blob/fabea12dd6ab4f8824b58812b0cfdabce94cde70/core/store/modules/user/actions.js#L123) - so the user has been authorized and the profile loaded

### Actions

The user store provides the following public actions:

#### `startSession (context)`

Just to mark that the session is started and loading the current user token from the `localForage` - for the further usage.

#### `resetPassword (context, { email })`

Calls the `vue-storefront-api` endpoint to send the password reset link to specified `email` address

#### `login (context, { username, password })`

Called to login the user and receive the current token that can be used to authorize subsequent API calls. After user is successfully authorized the `user/me` action is dispatched to load the user profile data.

#### `register (context, { email, firstname, lastname, password, addresses })`

Registers the user account in the eCommerce platform / Magento.

#### `me (context, { refresh = true, useCache = true })`

Loads the user profile from eCommerce CMS; when `userCache` is set to true the result will be stored in the `localForage` and if it's stored before - returned from cache using the `fastest` strategy (network vs cache). If `refresh` is set to true - the user data will be pulled from the server despite the cached copy is available.

#### `update (context, userData)`

This action is used to update various user profile data. Please check the [user schema](https://github.com/vuestorefront/vue-storefront/blob/master/core/store/modules/user/userProfile.schema.json) for the data format details.

#### `changePassword (context, passwordData)`

Tries to change the user password to `passwordData.newPassword`.

#### `logout (context)`

This is used to log out the user, close the session and clear the user token. Please notice - the current shopping cart is closed after this call.

### Getters

All state members should have been accessed only by getters. Please take a look at the state reference for data formats

```js
const getters = {
  isLoggedIn(state) {
    return state.current !== null;
  },
};
```
