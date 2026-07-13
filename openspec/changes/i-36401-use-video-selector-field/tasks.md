## 1. Video Contracts and Resolution

- [x] 1.1 Define the flat `VideoSelectorField` contract with URL, asset, aspect-ratio, and playback fields.
- [x] 1.2 Export `VideoSelectorField` from the module's public type surface.
- [x] 1.3 Update `VideoData` with selector-backed `video` as the primary field; make legacy `url` and `aspect_ratio` optional; retain only `aspect_ratio` and `display_controls` outside the selector; do not retain a standalone asset contract.
- [x] 1.4 Add a typed pure resolver for selector-first source, source-specific aspect-ratio, and effective playback settings; ignore autoplay, muted, and loop for URL sources; and ensure a present invalid selector suppresses legacy URL fallback.
- [x] 1.5 Update `isVideoData` to use the shared resolution rules.

## 2. Update Shared and General Video Rendering

- [x] 2.1 Update `Video.vue` to render the resolved selector asset or embed, pass selector embed values to `StreamingVideo`, use legacy URL values only when the selector is absent, apply general Video block defaults, and retain editor-preview pointer blocking.
- [x] 2.2 Refactor zoom-gallery conversion to use the same effective-source resolution and retain legacy YouTube URL fallback.

## 3. Homepage Intro Asset Video

- [x] 3.1 Add optional `background_video` and `mobile_background_video` `VideoSelectorField` values to `HomepageIntroSectionData`.
- [x] 3.2 Remove the unused injected browser `WindowObject` from the baseline Homepage Intro Section.
- [x] 3.3 Render only selector assets as native desktop and mobile hero videos at their respective CSS breakpoints, apply the corresponding selector `aspect_ratio` to the media container, and avoid implicit desktop-video fallback on mobile.
- [x] 3.4 Apply fixed muted, autoplay, looped, inline playback with controls hidden, ignoring selector playback and URL values.
- [x] 3.5 Use a transparent single-pixel poster and retain the responsive image beneath video without readiness state.
- [x] 3.6 Preserve inherited Storyblok styles, content stacking, CTA usability, and editor-preview interaction blocking using TypeScript 3.1-compatible code.

## 4. Migration and Validation

- [ ] 4.1 Add selector-backed `video` to the Storyblok Video block schema while retaining existing URL-backed entries without migration.
- [x] 4.2 Run the repository TypeScript and focused lint checks for all changed theme and shared-module files.
- [ ] 4.3 Verify the homepage asset hero and general Video block in local SSR across desktop, mobile, URL-fallback, failure, and Storyblok preview cases, checking first paint and media network behavior.
