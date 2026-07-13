## Why

The Homepage Intro Section supports responsive static images but has no normalized asset-video field, while the reusable Storyblok Video block supports only the older URL field. A shared selector-based contract is needed so the Video block can render uploaded or embedded video and Homepage Intro can consume uploaded assets without breaking existing URL-backed Video blocks or image-only heroes.

## What Changes

- Introduce a shared `VideoSelectorField` contract for URL-based and uploaded asset video sources.
- Add optional desktop and mobile selector fields to `HomepageIntroSectionData`.
- Add an optional `video` field of type `VideoSelectorField` to `VideoData`.
- Make `video` the primary source of asset and embedded video data, including selector-level aspect ratio.
- For URL-based selector video, honor only `display_controls` and ignore autoplay, muted, and loop values; for asset video, honor all four playback options.
- Use the legacy `VideoData.url` source only when `video` is not specified; a present selector does not silently fall back to `url`.
- Define `VideoData.video` exclusively as a `VideoSelectorField`; uploaded assets are read from `video.asset` rather than from a standalone `AssetField` contract.
- Make `VideoData.url` and top-level `aspect_ratio` optional at the type boundary so selector-only Video blocks do not require redundant legacy values.
- Retain top-level `aspect_ratio` and `display_controls` only as legacy URL fallback settings.
- Update Video block type guards, rendering, and downstream gallery conversion to resolve the primary selector contract consistently.
- Implement the Homepage Intro Section against the asset value of its desktop and mobile `VideoSelectorField` fields. Hero video always autoplays muted and looped with controls hidden; selector playback values and URL-based sources are ignored.
- Size the Homepage Intro media container from the applicable mobile or desktop selector's `aspect_ratio` so the complete asset video fits its responsive media box.
- Give Homepage Intro asset videos a transparent single-pixel poster so the existing responsive image remains visible beneath video before media is available, without readiness state.

## Capabilities

### New Capabilities

- `storyblok-video-source-selection`: Defines primary selector-based video resolution, legacy URL fallback, and selector-aware rendering for Storyblok video consumers.

### Modified Capabilities

None.

## Impact

- Affects Storyblok contracts in `HomepageIntroSectionData`, `VideoData`, and the shared `VideoSelectorField` type/export surface.
- Affects `HomepageIntroSection.vue`, `Video.vue`, the Video block type guard, and video-to-zoom-gallery conversion.
- Requires Storyblok schema alignment for the new Video block selector field; existing URL-only entries remain supported without migration.
- Does not add dependencies or permit direct API calls; rendering remains SSR-safe and follows existing Storyblok editor-preview interaction rules.
