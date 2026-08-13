## Context

See `proposal.md` for motivation. Commit `29c4ad361a` changed the theme's responsive image generators to emit `https://sb-assets.budsies.com`, and companion commit `c54c323573` changed the legacy global Storyblok image component. Both implementations still parse `a.storyblok.com` independently and hardcode the CDN origin.

Storyblok asset URLs also reach rendering sinks as unmodified `AssetField.filename` values, rich-text attributes, SEO field strings, and link URLs. These paths include image lightboxes and galleries, asset videos, Pinterest media, Open Graph images, legacy background images, and asset links. Published stories arrive through Vuex actions, but draft content can be injected directly by the Storyblok editor bridge, so fetch-time rewriting alone cannot cover every lifecycle.

## Goals / Non-Goals

**Goals:**

- Establish one module-owned interpretation of recognized Storyblok asset URLs.
- Make URL normalization idempotent, SSR-safe, and safe for arbitrary non-Storyblok inputs.
- Separate raw asset delivery from image transformation construction.
- Apply normalization at typed rendering boundaries so editor-preview updates follow the same path as published content.
- Keep the CDN origin configurable while retaining the current Budsies CDN as the default deployment value.

**Non-Goals:**

- Proxy Storyblok Content API requests or the Storyblok editor bridge script.
- Proxy YouTube, promotion-platform, or other non-Storyblok assets.
- Add runtime fallback from a failed CDN request to Storyblok origin.
- Change responsive image sizing, quality, density, or format policy.

## Decisions

### 1. Put asset URL policy in the Storyblok module

Add a pure helper owned by `src/modules/vsf-storyblok-module` that accepts an arbitrary string and returns either a CDN URL or the original value. Theme image helpers and components consume this helper rather than owning Storyblok origin rules.

The helper reads a `storyblok.assetCdnOrigin` configuration value whose deployment template defaults to `https://sb-assets.budsies.com`. It recognizes:

- canonical URLs with host `a.storyblok.com`;
- legacy URLs with host `s3.amazonaws.com` and path prefix `/a.storyblok.com/`; and
- the configured CDN origin, which is returned unchanged.

Matching uses parsed host and path components rather than substring replacement. The helper preserves paths, query strings, and fragments, removes duplicate origin separators, and returns unsupported or invalid inputs unchanged.

**Alternative considered:** Keep replacing hostnames independently in each component. Rejected because it perpetuates hardcoded configuration, inconsistent legacy URL handling, and future bypasses.

### 2. Separate raw asset resolution from image transformation generation

The raw resolver only maps a recognized asset to the configured CDN. A responsive-image builder uses the same parsed asset path, inserts Storyblok image-service transformation segments before query or fragment components, and emits fallback, WebP, and AVIF sources.

Dimension parsing operates on the parsed asset path and supports both origin and already-proxied inputs. Existing responsive sizing and quality policies remain unchanged.

**Alternative considered:** Make the raw resolver append a default `/m` transformation. Rejected because videos, downloads, metadata images, and original-size lightbox assets require untransformed delivery.

### 3. Normalize at asset sinks instead of mutating whole story responses

Use the shared resolver at the boundaries that turn CMS values into browser or third-party URLs:

- responsive image generators and the legacy global image component;
- Image lightbox items and LightboxGallery modal assets;
- asset video resolution, including homepage background videos;
- rich-text image attributes and rich-text asset links;
- Open Graph and future Twitter metadata images;
- social-sharing media values;
- Storyblok asset links before general external-link routing; and
- the registered legacy Tile background component.

This preserves raw CMS data in Vuex and automatically covers live preview updates because every render passes through the same boundary.

**Alternative considered:** Recursively rewrite story responses in the Vuex load actions. Rejected because editor bridge updates bypass those actions and recursive string rewriting cannot reliably infer field intent.

### 4. Keep CDN capability validation outside the URL resolver

Before enabling raw video and download routing in production, validate the Cloudflare distribution for original asset paths, image transformation paths, correct content types, `HEAD`, byte-range requests, caching, and expected query-string behavior. The application does not fall back to Storyblok after a CDN error because doing so would make asset origin behavior nondeterministic and defeat the delivery policy.

## Risks / Trade-offs

- **[Cloudflare does not support video range requests or original downloads]** → Validate representative assets before deployment and fix the distribution behavior before enabling the storefront change.
- **[A new Storyblok asset hostname is introduced]** → Keep the recognized-origin list centralized and cover each supported form with unit tests.
- **[Configuration is missing in an environment]** → Ship the current Budsies CDN origin in the configuration template/defaults and test configuration resolution.
- **[CDN cache contains stale content]** → Preserve complete asset paths and query strings and document the existing Cloudflare purge/versioning procedure during deployment validation.
- **[Social services cache old origin URLs]** → Accept third-party cache lag; new storefront output becomes canonical after deployment.

## Migration Plan

1. Validate the Cloudflare distribution with representative original images, transformed images, videos, and downloadable assets.
2. Add the configured CDN origin and shared URL resolver with isolated unit coverage.
3. Refactor existing responsive-image builders and the global Storyblok image component to use the shared policy without changing generated dimensions or formats.
4. Migrate each direct asset sink and add focused rendering tests, including SSR and editor-preview updates.
5. Deploy and verify rendered HTML and browser network traffic on representative Storyblok pages.
6. Monitor CDN errors, content types, video playback, social previews, and cache behavior.

Rollback consists of reverting the storefront change and configuration while leaving the Cloudflare distribution in place; no CMS content or persistent data migration is required.
