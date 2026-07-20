## Why

Storyblok Video blocks have been migrated from the legacy top-level `url`, `aspect_ratio`, and `display_controls` fields to the selector-backed `video` field. Keeping the fallback contract in the storefront now preserves obsolete payload shapes, duplicates source-selection behavior, and can hide incomplete content migration.

## What Changes

- **BREAKING** Remove support for the legacy top-level `url`, `aspect_ratio`, and `display_controls` fields from Storyblok Video block data.
- Resolve, classify, and render Storyblok Video blocks exclusively from the `video` selector field.
- Keep uploaded-asset and embedded-provider behavior, aspect ratio, and supported playback options sourced from the selector contract.
- Update zoom-gallery conversion and Video block type guards to reject legacy-only Video payloads consistently.
- Remove tests and fixtures that assert legacy fallback, and add coverage that legacy-only payloads are not treated as playable videos.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `storyblok-video-source-selection`: Replace selector-first resolution with a selector-only Video block contract and remove all legacy URL fallback behavior.

## Impact

- Affects `VideoData`, the shared Storyblok Video resolver, `Video.vue`, Video block classification, and video-to-zoom-gallery conversion.
- Requires migrated Storyblok Video entries to contain a playable `video` selector value; legacy-only entries will render no video.
- Does not change Homepage Intro video behavior, the shared `VideoSelectorField` shape, dependencies, API calls, or SSR behavior.
