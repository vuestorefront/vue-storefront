# storyblok-video-source-selection Specification

## Purpose
Define selector-only video resolution for Storyblok Video blocks and responsive Homepage Intro asset videos after removal of the legacy top-level Video fields.

## Requirements
### Requirement: Selector-first Video block contract
The system SHALL resolve a Storyblok Video block exclusively from its optional `video` value using the `VideoSelectorField` contract.

#### Scenario: Selector asset is specified
- **WHEN** a Video block specifies `video` with a playable asset
- **THEN** the system renders the selector asset using its aspect ratio and its `video.options.autoplay`, `video.options.muted`, `video.options.loop`, and `video.options.display_controls` settings

#### Scenario: Selector embed is specified
- **WHEN** a Video block specifies `video` with a supported provider and video identifier
- **THEN** the system renders the embedded video through the shared streaming-video abstraction using the selector's aspect ratio and display-controls setting

#### Scenario: Selector is absent or incomplete
- **WHEN** a Video block does not specify `video` or its value does not contain a playable asset or valid embedded source
- **THEN** the system renders no video

### Requirement: Selector-exclusive uploaded assets
The system SHALL define `VideoData.video` as a `VideoSelectorField` and SHALL obtain all Video block source data, including uploaded assets and provider embeds, exclusively from that selector contract.

#### Scenario: Video field contains no playable selector source
- **WHEN** a Video block payload contains `video` without a playable selector asset or embedded source
- **THEN** the system does not classify or render the item as playable video content

### Requirement: Consistent source resolution across consumers
All Video block consumers SHALL apply the same selector-only resolution rules when classifying items, rendering Video blocks, and converting Video data for the zoom gallery.

#### Scenario: Gallery receives selector-backed YouTube video
- **WHEN** zoom-gallery conversion receives a Video block with a playable YouTube selector
- **THEN** the converted gallery asset uses the selector's provider, video identifier, aspect ratio, and applicable playback settings

#### Scenario: Gallery receives legacy-only video data
- **WHEN** zoom-gallery conversion receives a Video block without a playable `video` selector even if legacy top-level video fields are present
- **THEN** the conversion produces no gallery asset

### Requirement: Source-specific playback behavior
The system SHALL honor only `video.options.display_controls` for URL-based selector sources and SHALL honor `video.options.autoplay`, `video.options.muted`, `video.options.loop`, and `video.options.display_controls` for uploaded asset selector sources.

#### Scenario: URL selector contains asset playback flags
- **WHEN** a URL-based selector's `options` contains autoplay, muted, or loop values
- **THEN** the system ignores those values and applies only its `options.display_controls` value

#### Scenario: Asset selector contains playback flags
- **WHEN** an uploaded asset selector's `options` contains autoplay, muted, loop, or `display_controls` values
- **THEN** the system applies those values to the asset video

### Requirement: Stable general Video playback defaults
The general Storyblok Video block SHALL keep controls hidden for selector URL sources when `video.options.display_controls` is omitted and SHALL default every omitted asset option to false.

#### Scenario: URL selector omits controls option
- **WHEN** a playable URL-based selector omits `options.display_controls`
- **THEN** the rendered embedded Video block keeps controls hidden

#### Scenario: Asset selector omits playback flags
- **WHEN** a playable asset selector omits `options.autoplay`, `options.muted`, `options.loop`, and `options.display_controls`
- **THEN** the rendered asset does not autoplay, is not forced muted or looping, and keeps controls hidden

### Requirement: Responsive Homepage Intro asset selection
The Homepage Intro Section SHALL render selector-backed uploaded assets through one native video element, SHALL assign one applicable asset URL to its `src` after client mount, and SHALL load and play only that URL for the current responsive breakpoint.

#### Scenario: Desktop asset is applicable
- **WHEN** the viewport is at the desktop breakpoint and `background_video` contains a playable asset
- **THEN** the system selects the desktop asset and does not load or play the mobile asset

#### Scenario: Mobile asset is applicable
- **WHEN** the viewport is below the desktop breakpoint and `mobile_background_video` contains a playable asset
- **THEN** the system selects the mobile asset and does not load or play the desktop asset

#### Scenario: Viewport crosses the video breakpoint
- **WHEN** the mounted Homepage Intro Section crosses between mobile and desktop breakpoints
- **THEN** the system replaces the video's `src` URL with the applicable asset and does not leave the previous responsive asset playing

#### Scenario: Mobile asset is absent
- **WHEN** the viewport is below the desktop breakpoint and only `background_video` contains a playable asset
- **THEN** the system keeps the configured mobile image visible and does not implicitly use the desktop video

#### Scenario: Selector contains an embedded source
- **WHEN** a Homepage Intro video selector contains a URL-based source without a playable uploaded asset
- **THEN** the system does not render that source as Homepage Intro video

### Requirement: Stable Homepage Intro playback and fallback
The Homepage Intro Section SHALL autoplay applicable asset video muted, looped, inline, without controls, and SHALL keep the configured responsive image rendered beneath the video as its loading and failure fallback.

#### Scenario: Selector playback options differ
- **WHEN** an applicable Homepage Intro asset selector disables autoplay, muted, or loop or enables controls
- **THEN** the system ignores those options and renders the hero video autoplaying, muted, looped, inline, and without controls

#### Scenario: Video media is not yet available
- **WHEN** the applicable video has not produced a frame or cannot play
- **THEN** the responsive image remains visible beneath the transparent video surface without readiness-state handling

#### Scenario: Responsive video defines an aspect ratio
- **WHEN** an applicable Homepage Intro asset selector provides an aspect ratio
- **THEN** the media container uses that ratio and clips the video overlay so the fallback image does not appear at fractional-pixel edges

### Requirement: Configurable Homepage Intro desktop content bounds
The Homepage Intro Section SHALL allow optional `desktop_content_start` and `desktop_content_end` values expressed as numbers or numeric strings and SHALL apply them as percentages only at the desktop breakpoint.

#### Scenario: Desktop content bounds are omitted or invalid
- **WHEN** content-start or content-end is missing, empty, or not numeric
- **THEN** the system uses 55% for the start and 5% for the end respectively

#### Scenario: Desktop content bounds are valid
- **WHEN** content-start or content-end contains a numeric number or string
- **THEN** the system clamps the value to the 0–100 range and applies it as the corresponding desktop percentage

#### Scenario: Homepage Intro is rendered on mobile
- **WHEN** the viewport is below the desktop breakpoint
- **THEN** desktop content-start and content-end values do not change the mobile content spacing

### Requirement: Responsive Homepage Intro content alignment
The Homepage Intro Section SHALL apply the shared Storyblok alignment value to its heading, subtitle, and CTA at the desktop breakpoint only.

#### Scenario: Desktop alignment is configured
- **WHEN** the Homepage Intro Section is rendered on desktop with left, center, or right alignment
- **THEN** its heading, subtitle, and CTA use that alignment within the configured content bounds

#### Scenario: Desktop alignment is omitted
- **WHEN** the Homepage Intro Section is rendered on desktop without an alignment value
- **THEN** its heading, subtitle, and CTA are left-aligned

#### Scenario: Mobile alignment is configured
- **WHEN** the Homepage Intro Section is rendered below the desktop breakpoint
- **THEN** its heading, subtitle, and CTA remain centered regardless of the shared alignment value

### Requirement: Storyblok editor interaction safety
The system SHALL prevent pointer interaction with selector-backed asset and embedded video surfaces while their Storyblok components are rendered in editor-preview mode and SHALL keep Homepage Intro content above its non-interactive background media.

#### Scenario: Selector video appears in editor preview
- **WHEN** an author previews a selector-backed Video block in the Storyblok editor
- **THEN** pointer interaction with its video surface is disabled

#### Scenario: Homepage Intro video appears in editor preview
- **WHEN** an author previews a Homepage Intro Section with selector-backed background video in the Storyblok editor
- **THEN** pointer interaction with its background video and CTA is disabled and its content remains above the video
