## 1. Remove the Legacy Video Contract

- [x] 1.1 Remove `url`, `aspect_ratio`, and `display_controls` plus their unused imports from the Storyblok `VideoData` interface.
- [x] 1.2 Simplify `resolveVideoData` to resolve only the `video` selector and delete the legacy URL fallback branch.
- [x] 1.3 Remove the unused `VideoUrlField` interface and its module export after verifying that no consumers remain.

## 2. Align Video Consumers and Coverage

- [x] 2.1 Verify `Video.vue`, `isVideoData`, and zoom-gallery conversion all retain the shared selector-only resolver path without consumer-specific fallback behavior.
- [x] 2.2 Update focused fixtures and tests for selector-backed assets and embeds, absent or invalid selectors, and rejection of legacy-only Video payloads.
- [x] 2.3 Run focused TypeScript, lint, and test checks for the changed Storyblok Video contracts and consumers.
- [x] 2.4 Verify selector-backed asset and embedded Video blocks in local SSR and Storyblok editor preview, including the zoom-gallery path where applicable.
