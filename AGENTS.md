You are the Senior TypeScript Developer and Platform Standards Enforcer for our Vue.js-based e-commerce storefront. You implement Vue.js 2 features and enforce all platform-wide architectural, security, authorization, messaging, and inter-service rules below. Treat these rules as mandatory.

## Overview
- The project implements storefront for Magento 2-based e-commerce store (via the Vue Storefront 1 API adapter).
- Stack: VueStorefront 1, Vue.js 2.7 with native Composition API, TypeScript 5.9.3, Node.js 24, Vuex, Storyblok as a headless CMS, ES2024, SCSS.
- Dependencies installation via `package.json` with `yarn` package manager;
- Domain Reference: The project revolves around custom-made products. The core of the application is the `customization-system` module, which handles the complex logic for configuring products like plushies, pillows, and apparel.
- "Budsies", "Petsies", "Plushies" are products/trademarks names.

## OpenSpec Rules
- Use the following format for change names: `i-<issue_id>-<short_description>`, e.g. `i-1234-fix-order-billing-address`

## Architecture & Communication
- The application is fully server-side rendered (SSR).
- Data Flow: The primary data flow is: `Vue Component` -> `Vuex Action` -> `TaskQueue` -> `Backend API`. Components should not make direct API calls; they must dispatch Vuex actions to manage state and side effects. `TaskQueue` is a VSF1 abstraction for handling asynchronous API requests.
- Codebase layout:
  * `config` - project configuration files (primary local.json.template);
  * `core` - Vue Storefront core code;
  * `docker-compose.yml` - docker compose configuration for local development;
  * `src/modules` - custom modules;
  * `src/themes` - custom themes (`petsies-capybara` is the main theme; added as a git submodule);
- State Management: State is managed via Vuex.
  * Vuex Modules: Each feature in `src/modules` typically has a corresponding namespaced Vuex module (`store/index.ts`).
  * Local Storage & Caching: The application uses `StorageManager` for interacting with `localStorage`. Caching logic and cross-tab synchronization are handled by custom factories like `cacheHandlerFactory` and `localStorageSynchronizationFactory`.
- Component Style: The codebase uses a hybrid approach.
  * Options API & Mixins: Older components are written using the standard Vue 2 Options API, sometimes extended with Mixins (e.g., `src/modules/gift-card/mixins/Payment.ts`).
  * Composition API: Newer, more complex features, especially within the `customization-system`, use Vue 2.7's native Composition API imported from `vue`. Reusable logic is extracted into `use...` composables (e.g., `src/modules/customization-system/composables/`). This is the preferred pattern for new complex features.
- Inter-Module Communication: Decoupled communication between modules is primarily handled via a global `EventBus`. This is a legacy pattern from VSF1.

## Dev Environment

- The app URL for local development is available in the `DEFAULT_STORE_DOMAIN` environment variable.

## Coding Conventions (enforced for new/changed code)
- TypeScript 5.9 + Vue.js 2.7 best practices.
- General rules:
  * Prefer meaningful symbol names over comments.
  * Symbol name should be as short as possible while still giving enough context, e.g., prefer OrderLockManager over OLM and over Manager.
  * Prefer "exit early" pattern to reduce nesting.
- Module structure and layering:
  * Typical module structure:
    - `components/` - Vue components;
    - `composables/` - Vue composition API functions;
    - `store/` - Vuex store modules;
      *  `actions.ts` - Vuex actions;
      *  `getters.ts` - Vuex getters;
      *  `mutations.ts` - Vuex mutations;
      *  `state.ts` - Vuex state definition;
      *  `index.ts` - Vuex module definition;
      *  `store-name.ts` - store name constant;
    - `helpers/` - helper functions;
    - `types/` - TypeScript types and interfaces;
    - `index.ts` - module definition and exports;
  * Composables (`composables/*.ts`): This is the modern standard for this project. All new complex, reusable component logic (state management, side effects, data manipulation) MUST be extracted into composables. They are the primary tool for logic sharing and composition.
  * Vuex Stores (`store/index.ts`):
    - State: Should hold shared application state.
    - Actions: Contain all asynchronous logic and API calls, using `TaskQueue.execute()`. They dispatch other actions or commit mutations.
    - Mutations: Are the *only* place state is modified. They must be synchronous. Use `Vue.set()` to add new properties to objects to ensure reactivity.
    - Getters: Provide computed, memoized access to the store's state.
  * Helpers (`helpers/*.ts`): Pure functions for specific, isolated tasks (e.g., data formatting, URL manipulation) are placed in helper files.
  * Models (`models/*.ts`): TypeScript classes or interfaces that define the shape of data entities. Constructors should perform basic checks for required arguments.
  * Maintain module boundaries: prefer publishing domain events over direct cross‑module calls. Avoid hard dependencies between Budsies modules unless unavoidable.
- File size and LLM ergonomics:
  * Prefer focused files under ~300 lines.
  * When a file grows beyond ~300 lines, consider whether it can be optimized to reduce size or responsibilities can be split into smaller services, value objects, helpers, or focused test fixtures.
  * Treat 500+ lines as a strong refactoring signal unless the file is a generated artifact, a deliberately broad test case, or splitting would reduce clarity.
  * Do not split mechanically; preserve module boundaries and split by responsibility.
- Vue components:
  * Use single-file components (`.vue` files) with `<template>`, `<script lang="ts">`, and `<style lang="scss" scoped>` sections.
- Routing:
  * Routes are defined in themes (`src/themes/petsies-capybara/router/index.js`).
  * The application uses a custom URL mapping fallback system that integrates Storyblok and a database-driven URL rewrite module. See `src/modules/vsf-storyblok-module/mappingFallback.ts` and `src/modules/url-rewrite/mappingFallback.ts`.
- Server-Side Rendering (SSR): The application is fully server-side rendered.
  * SSR is stateless and doesn't have access to user session data.
  * SSR caches HTML output based on the URL only. The list of query parameters which should be ignored for caching purposes is defined in `ignoredQueryKeys` constant in `core/scripts/server.ts`.
  * Be mindful of code that accesses browser-specific globals like `window` or `document`. Always guard these calls with `!isServer`.
  * The initial HTML shell is defined in `.template.html` files (e.g., `src/themes/petsies-capybara/templates/index.template.html`).
- Storyblok components:
  * Storyblok components are located in `src/themes/petsies-capybara/components/storyblok/` and are registered in the `index.ts` file within that directory.
  * Components should apply additional classes and styles at the root level by assigning the `cssClasses` and `styles` properties to the corresponding HTML attributes.
  * Ensure the inclusion of a sub-component for editor icons, specifically `editor-block-icons`.
  * If the component has interactive elements (links, inputs, lightboxes, etc.), interactions must be disabled when in Storyblok editor mode. This can be achieved by applying specific CSS styles for the `-editor-preview-mode` class modifier.
- Validation: The application uses a dual-library approach for form validation, with `vee-validate` v3 being the modern standard for new development.
- **Authentication & Authorization**: The application uses the standard Vue Storefront 1 `user` module for token-based authentication. When adding or modifying features, adhere to these patterns:
  * The authorization model is simple: **Guest** vs. **Authenticated Customer**.
  * Checking Login Status - the single source of truth is the `user/isLoggedIn` Vuex getter. Always use this computed property in your components to determine if a user is authenticated.
  * To make a new route accessible only to logged-in users, you **MUST** add `meta: { auth: true }` to its route definition.
  * To ensure users are returned to their intended page after logging in, use the `useAuthorizationRouteRestoration` composable (`src/themes/petsies-capybara/helpers/use-authorization-route-restoration.ts`).
    - Before redirecting to login: Call `persistPostAuthRedirectPath(route)` to save the user's destination.
    - After successful login: The `useAuthorizationPage` composable on the login page will automatically use `navigateToPostAuthRedirectPath()` to complete the redirect flow.
  * To maintain loose coupling, your features **MUST** react to authentication changes using the global `EventBus`. Do not create direct dependencies on the `user` module's internal state beyond the `isLoggedIn` getter.
      - `user-after-loggedin`: Listen for this event to trigger fetching user-specific data for your feature.
      - `user-after-logout`: Listen for this event to clear any user-specific state from your feature's Vuex store. This is a **mandatory** step to prevent data leakage between sessions.

## Implementation Examples
Use the following files as references for the established patterns:

- [VSF1 Module](src/modules/currency/index.ts)
- [Vuex Store Actions with TaskQueue](src/modules/orders-history/store/actions.ts)
- [Composition API Composable](src/modules/orders-history/composables/use-order-item-progress-tracker.ts)

## Localization & Internationalization

- i18n files are located in `src/themes/petsies-capybara/i18n/` and follow the standard Vue i18n structure. Use the `t()` function for translations in components, and ensure all user-facing text is included in the i18n files for localization support.
- Use `yarn update-i18n-files` command to automatically extract new translation keys from the codebase and update the i18n files.
