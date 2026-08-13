## Why

Storyblok asset URLs can currently bypass the Budsies Cloudflare distribution whenever CMS data is rendered outside the responsive-image helpers, causing browsers and third-party crawlers to request Storyblok directly. The storefront needs one consistent asset-delivery contract so current and future Storyblok image, video, metadata, sharing, rich-text, and download consumers use the Budsies CDN without rewriting unrelated external URLs.

## What Changes

- Introduce a shared, idempotent Storyblok asset URL resolver backed by a configurable CDN origin.
- Route raw Storyblok image, video, social-sharing, metadata, rich-text, legacy background, and asset-link URLs through the resolver.
- Make responsive Storyblok image URL generation reuse the same origin parsing and CDN configuration instead of duplicating hostname splitting and hardcoded origins.
- Preserve non-Storyblok URLs unchanged and avoid double-rewriting URLs that already use the Budsies CDN.
- Add regression coverage for supported Storyblok URL forms, existing CDN URLs, unrelated external URLs, SSR output, and editor-preview updates.

## Capabilities

### New Capabilities

- `storyblok-asset-delivery`: Defines consistent delivery of Storyblok-owned assets through the configured Budsies CDN across storefront rendering surfaces.

### Modified Capabilities

None.

## Impact

- Affects `src/modules/vsf-storyblok-module`, Storyblok components in the `petsies-capybara` theme, Storyblok metadata rendering, rich-text rendering, sharing URLs, lightboxes, galleries, video selectors, legacy Storyblok components, and configuration templates.
- Requires the Cloudflare asset distribution to preserve Storyblok asset paths and image transformation paths; serving video or downloadable assets also requires compatible content types, byte-range behavior, and request methods.
- Does not proxy Storyblok Content API requests, the editor bridge script, embedded third-party video providers, promotion-platform images, or unrelated external assets.
