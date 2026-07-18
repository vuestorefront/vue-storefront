## MODIFIED Requirements

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

## REMOVED Requirements

### Requirement: Legacy URL fallback
**Reason**: Storyblok Video content has been migrated to the selector-backed `video` field, so the transitional top-level `url`, `aspect_ratio`, and `display_controls` contract is obsolete.

**Migration**: Populate and publish the Video block's `video` selector field before deploying this change. Legacy-only payloads will no longer classify, render, or convert into zoom-gallery video assets.
