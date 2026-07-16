## Context

The baseline Homepage Intro Section renders responsive `image` and `mobile_image` assets with an overlaid content layer. The baseline Storyblok Video block uses `VideoData.url`, `aspect_ratio`, and optional `display_controls`, and its type guard and zoom-gallery conversion depend on that URL contract. There is no shared compound field that can represent either an uploaded asset or an embedded provider.

The storefront is SSR-rendered, uses Vue 2.6 and TypeScript 3.1, and must not determine the initial media branch through unguarded browser globals. Existing Storyblok entries using `url` need to remain functional without content migration.

## Goals / Non-Goals

**Goals:**

- Establish `VideoSelectorField` as the primary contract for new Storyblok Video block content.
- Preserve `url` only as a fallback when the selector field is absent.
- Keep `VideoData` aligned with its minimal legacy fields while consistently resolving source, ratio, and playback settings from one selected contract.
- Complete responsive asset-only Homepage Intro video without sacrificing the existing SSR/first-paint image fallback, content layer, CTA behavior, or editor-preview safety.
- Keep source-resolution rules in focused TypeScript helpers rather than duplicating precedence logic across components and gallery conversion.
- Load and play only the Homepage Intro video asset applicable to the current responsive breakpoint.
- Allow authors to adjust the desktop content area's horizontal bounds and use the shared alignment setting without changing centered mobile presentation.

**Non-Goals:**

- Migrating Storyblok content or removing support for the legacy `url`, `aspect_ratio`, or `display_controls` fields in this change.
- Replacing `StreamingVideo`, adding a new player dependency, or supporting providers outside the existing `VideoProvider` set.
- Changing Homepage Intro text content, CTA routing or behavior, image authoring, or API data flow beyond desktop content positioning and alignment.
- Supporting URL-based sources or configurable playback behavior in Homepage Intro.

## Decisions

### Use `video` as the new Video block selector field

`VideoData` will expose `video?: VideoSelectorField` alongside optional legacy `url`, `aspect_ratio`, and `display_controls`. Making the URL and aspect ratio optional allows selector-only blocks to rely exclusively on selector metadata. The `video` field represents the complete selector payload; it is not a standalone Storyblok `AssetField`.

An alternative was to add separate asset and playback fields directly to `VideoData`. That would duplicate data already carried by `VideoSelectorField`. Another alternative was to reuse only `url`, but it cannot represent selector assets or selector-level playback metadata.

### Resolve a single effective video contract by field presence

A pure resolver will return a selector-backed effective source whenever `video` is not `undefined`. It will consult legacy `url` and top-level Video block settings only when `video` is absent. An empty or incomplete selector therefore produces no playable source and does not silently reveal stale legacy content. This implements the requested precedence literally and makes authoring errors observable.

The resolved shape will contain source kind, asset URL or provider/video ID, source-specific aspect ratio, and effective playback settings. `Video.vue`, `isVideoData`, and zoom-gallery conversion will share this resolver or equivalent focused helpers. For legacy URLs and selector URLs, the resolver preserves only `display_controls` and ignores autoplay, muted, and loop values even if they are present in the flat selector payload. For asset sources, it preserves autoplay, muted, loop, and controls, with every omitted flag defaulting to false for the general Video block.

Selector assets provide a numeric aspect ratio, while selector embeds and legacy URL video provide an `AspectRatio` value. The resolver preserves those types instead of normalizing them. `StreamingVideo` continues to accept only the predefined `AspectRatio` values as it did before this change.

### Interpret the flat selector according to source type

`VideoSelectorField` remains a flat contract containing the source fields and all playback flags. Consumers determine whether the selected source is URL-based or asset-based. URL-based consumers honor only `display_controls`; asset consumers honor autoplay, muted, loop, and `display_controls`.

A discriminated union was rejected because the existing flat field already represents the Storyblok payload. The behavioral distinction belongs in source resolution, and URL playback flags other than controls are deliberately ignored.

An alternative was to fall back whenever the selector was invalid. That is more forgiving, but contradicts the requirement that `url` be used only when the new field is not specified and can mask incomplete selector authoring.

### Preserve the legacy URL fallback contract

`VideoData.video` contains the selector rather than a standalone asset. Selector-backed assets render through `video.asset`; selector-backed embeds render through its provider and ID. Existing URL-only entries render through `url`. The type guard accepts a renderable selector, or a renderable legacy URL only when the selector is absent.

Adding a separate asset field or `autoplay`, `muted`, or `loop` directly to `VideoData` was rejected because those properties would duplicate selector metadata and leave competing source contracts.

### Keep Homepage Intro asset-only and responsive without browser-only state on SSR

The configured image remains in the rendered markup beneath native video as the initial and recovery surface. One native video contains mobile and desktop `source` candidates guarded by media queries derived from the shared breakpoint values. Native media selection therefore loads and plays only the applicable source while keeping SSR output deterministic without reading `window`. `background_video.asset` and `background_video.aspect_ratio` define the desktop media. `mobile_background_video.asset` and `mobile_background_video.aspect_ratio` define the mobile media when specified; otherwise mobile remains on its configured static image rather than implicitly using the desktop video. The applicable selector aspect ratio sizes the media container, with the fallback image positioned inside that box, so the video is not cropped by an unrelated image ratio.

Homepage Intro ignores selector URL fields and selector playback settings. Every rendered hero video uses native autoplay, muted, looped, inline playback with controls hidden. A transparent single-pixel data URI is used as the poster, so no readiness flags or media event state are required and the image beneath remains visible while video is unavailable. The media container clips a one-pixel video overscan to prevent fractional device-pixel rounding from exposing the image at the video edge. Content and CTA layers remain above non-interactive background media, and editor-preview mode disables media and CTA interaction as required.

An alternative was to select a single source in JavaScript from viewport width. That risks SSR/hydration divergence and introduces browser-global handling solely for presentation selection.

### Make desktop content bounds configurable and apply shared alignment

Homepage Intro accepts optional `desktop_content_start` and `desktop_content_end` values as numbers or numeric strings. Values are normalized to percentages and clamped independently to the 0–100 range. Missing, empty, or invalid values use the established 55% start and 5% end defaults. These values affect only the desktop content layer; mobile spacing remains unchanged.

Mobile heading and CTA alignment remains centered regardless of the shared Storyblok alignment value. At the desktop breakpoint, the content defaults to left alignment when the setting is omitted and applies `left`, `center`, or `right` to the heading, subtitle, and CTA when configured. Position controls define the available content area, while alignment controls content placement within that area.

An alternative was to expose a single width or a set of layout presets. Independent start and end percentages map directly to the existing padding-based layout and provide sufficient control without introducing a new positioning model.

### Preserve shared embedded aspect-ratio inputs

`StreamingVideo` will remain the provider abstraction for the general Video block and keep its existing embedded-video playback and predefined `AspectRatio` contract. URL-based selectors pass their provider, video identifier, embedded aspect ratio, and controls visibility to it; autoplay, muted, and loop selector values are not forwarded. These values come from the legacy `VideoData.url`, `aspect_ratio`, and `display_controls` fields only when `video` is absent. General Video block assets use their explicit flags with false defaults. Homepage Intro does not use `StreamingVideo`.

Building a Homepage Intro-specific YouTube embed was rejected because it would duplicate provider rules and create a second player path.

## Risks / Trade-offs

- [A populated but invalid selector suppresses a valid legacy URL] → Treat selector presence as authoritative and surface invalid content during Storyblok preview instead of silently masking it.
- [A selector-only payload has no legacy URL] → Make `url` optional and ensure every consumer resolves the selector before reading fallback fields.
- [Responsive variants may cause unnecessary media downloads or duplicate playback] → Render one native video with breakpoint-qualified sources and verify that only the applicable asset is requested and played.
- [Invalid or extreme desktop content positions may break layout] → Accept numeric strings from Storyblok, reject invalid values, clamp valid values to percentages, and preserve defaults when values are unavailable.
- [Hero asset loading or autoplay can fail] → Keep responsive static images rendered beneath video and use a transparent poster so the image remains the visible fallback without readiness state.
- [Provider flags differ in support] → Normalize flags through `StreamingVideo`, apply only supported parameters, and preserve usable defaults when a provider ignores a setting.
- [Responsive and selector handling can introduce TypeScript or SSR regressions] → Use TypeScript 3.1-compatible syntax, avoid browser-only branching during SSR, and validate with repository type/lint commands.

## Migration Plan

1. Add/export `VideoSelectorField`, the selector-backed `video` contract, and effective-source helpers while retaining legacy `url`, `aspect_ratio`, and `display_controls` support.
2. Update Video, gallery, and Homepage Intro consumers for selector, fallback, invalid selector, viewport, and image-only cases.
3. Add the selector-backed `video` field to the Storyblok Video block schema and the optional desktop content-position fields to Homepage Intro; existing URL-backed entries require no content migration.
4. Deploy and monitor Video blocks and homepage hero behavior across desktop/mobile and preview mode.
5. Roll back application code if necessary; do not delete legacy Storyblok fields. Removal of the URL fallback is a separate future change.
