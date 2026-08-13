## 1. CDN Compatibility and Configuration

- [ ] 1.1 Validate representative original image, transformed image, video, and downloadable Storyblok asset paths through `sb-assets.budsies.com`, including content types, `HEAD`, byte-range requests, query strings, and cache behavior; record any distribution prerequisite before routing those asset types.
- [x] 1.2 Add `storyblok.assetCdnOrigin` to storefront configuration defaults and `config/local.json.template`, using the current Budsies asset CDN as the deployment default.

## 2. Shared Storyblok Asset URL Policy

- [x] 2.1 Implement a pure Storyblok-module URL parser/resolver for canonical `a.storyblok.com`, legacy S3, already-proxied, unrelated, relative, data, blob, empty, and malformed inputs while preserving path, query, and fragment components.
- [x] 2.2 Add unit tests proving recognized-origin conversion, idempotence, separator handling, URL component preservation, and unchanged unsupported inputs.
- [x] 2.3 Export the shared resolver through the Storyblok module's public boundary for theme consumers.

## 3. Responsive Image Integration

- [x] 3.1 Refactor responsive source generation, resized-image URL generation, dimension parsing, and the global Storyblok image component to use the shared origin/path policy and configured CDN origin.
- [x] 3.2 Add regression tests that preserve existing fallback, WebP, AVIF, fit, dimensions, density, format, and quality output for canonical, legacy S3, and already-proxied inputs.

## 4. Direct Asset Sink Migration

- [x] 4.1 Route Storyblok Image lightbox items and LightboxGallery modal images through the raw asset resolver, with component tests asserting that no original Storyblok origin is rendered.
- [x] 4.2 Route Storyblok asset videos and homepage desktop/mobile background videos through the raw asset resolver while leaving embedded video providers unchanged.
- [x] 4.3 Normalize rich-text image resource attributes and rich-text asset links before generic component rendering.
- [x] 4.4 Normalize Storyblok Open Graph images, future Twitter image output, and Pinterest sharing media while correctly encoding sharing query parameters.
- [x] 4.5 Normalize recognized Storyblok asset links before general external-link routing and normalize the registered legacy Tile background image without changing unrelated links or backgrounds.

## 5. End-to-End Verification

- [ ] 5.1 Add SSR and Storyblok editor-preview regression coverage demonstrating that published and live-updated content emit the same CDN asset URLs.
- [x] 5.2 Run the focused Storyblok, BaseImage, rich-text, link, video, and theme component test suites plus TypeScript validation, and resolve any regressions.
- [ ] 5.3 Search the storefront for remaining direct Storyblok asset rendering sinks, document intentional exclusions, and verify representative pages' rendered HTML and network requests contain no direct Storyblok asset origin.
