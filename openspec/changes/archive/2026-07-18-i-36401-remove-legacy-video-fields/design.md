## Context

The Storyblok Video block currently exposes `video?: VideoSelectorField` alongside the legacy top-level `url`, `aspect_ratio`, and `display_controls` properties. `resolveVideoData` gives the selector precedence but still reconstructs embedded-video data from the legacy fields when `video` is absent. `Video.vue`, `isVideoData`, and zoom-gallery conversion all inherit that fallback through the resolver.

Storyblok content has now been migrated into the selector-backed `video` field. The storefront can therefore retire the transitional dual contract and use the same selector representation for assets and provider embeds.

## Goals / Non-Goals

**Goals:**

- Make the `video` selector the only supported source for Storyblok Video blocks.
- Remove legacy fields from the TypeScript data contract and shared resolution behavior.
- Keep Video rendering, type-guard classification, and zoom-gallery conversion consistent.
- Preserve existing selector-backed asset and embed behavior, including option defaults and editor-preview interaction safety.

**Non-Goals:**

- Changing the `VideoSelectorField` schema or playback semantics.
- Changing Homepage Intro video behavior.
- Adding runtime migration or fallback for Storyblok content that was not migrated.
- Removing the unused shared `VideoUrlField` type because no unrelated consumers remain.

## Decisions

### Keep one VideoData-level resolver

`resolveVideoData` will remain the common entry point for `Video.vue`, `isVideoData`, and zoom-gallery conversion, but it will delegate only to `resolveVideoSelectorField(videoData.video)`. Keeping one resolver prevents consumers from developing different validity or precedence rules while removing the obsolete fallback branch.

Calling `resolveVideoSelectorField` independently from every consumer was rejected because it would duplicate access to the `video` property and weaken the current consistency boundary.

### Remove legacy properties from VideoData

`VideoData` will retain only the selector-backed `video` property in addition to the shared `ItemData` fields. The `AspectRatio` import formerly used by the removed top-level fields will be removed, and the now-unused `VideoUrlField` definition and barrel export will be deleted.

Keeping deprecated optional properties in the interface was rejected because it would advertise payload shapes the renderer deliberately no longer supports.

### Treat absent or invalid selectors as non-video content

If `video` is absent, null-like, or lacks a playable asset or valid provider embed, resolution returns `undefined`. Consequently, `Video.vue` renders no media, `isVideoData` returns false, and zoom-gallery conversion produces no asset. No compatibility warning or fallback is added at runtime because content migration is an authoring/deployment responsibility.

## Risks / Trade-offs

- [A legacy-only Storyblok entry remains after migration] → It will stop rendering; validate migrated content before or alongside deployment and restore it by populating the `video` selector field.
- [Consumers relied on the optional legacy TypeScript properties] → Type checking will expose those call sites; update fixtures and producers to create selector-backed payloads.
- [Resolution behavior diverges between render and gallery paths] → Retain `resolveVideoData` as the single resolver and cover both consumers with focused selector-only tests.

## Migration Plan

1. Confirm applicable Storyblok Video entries have been migrated from complete legacy `url` data into `video` and published.
2. Deploy the storefront change that removes the legacy fields and fallback.
3. Verify representative uploaded assets and provider embeds in normal rendering, zoom galleries, SSR, and editor preview.
4. If unmigrated content is discovered, roll back the storefront deployment or populate and publish its `video` selector field; do not reintroduce a second content contract as the long-term fix.

## Open Questions

None.
