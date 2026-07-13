## ADDED Requirements

### Requirement: Selector-first Video block contract
The system SHALL allow a Storyblok Video block to specify an optional `video` value using the `VideoSelectorField` contract, and SHALL treat that value as the authoritative source whenever the field is specified.

#### Scenario: Selector asset is specified
- **WHEN** a Video block specifies `video` with a playable asset
- **THEN** the system renders the selector asset using its aspect ratio and its autoplay, muted, loop, and display-controls settings

#### Scenario: Selector embed is specified
- **WHEN** a Video block specifies `video` with a supported provider and video identifier
- **THEN** the system renders the embedded video through the shared streaming-video abstraction using the selector's aspect ratio and display-controls setting

#### Scenario: Specified selector is incomplete
- **WHEN** a Video block has a `video` field that does not contain a playable asset or valid embedded source
- **THEN** the system renders no video and does not fall back to the legacy `url` field

### Requirement: Legacy URL fallback
The system SHALL resolve `VideoData.url` only when selector-backed `video` is not specified, preserving existing URL-backed Storyblok Video entries.

#### Scenario: Selector is absent and URL is valid
- **WHEN** a Video block does not specify `video` and its legacy `url` contains a supported provider and video identifier
- **THEN** the system renders the legacy embedded video using the block's `aspect_ratio` and `display_controls`, with omitted playback flags disabled

#### Scenario: Selector and URL are absent
- **WHEN** a Video block specifies neither `video` nor a valid legacy `url`
- **THEN** the system does not classify or render the item as playable video content

### Requirement: Selector-exclusive uploaded assets
The system SHALL define `VideoData.video` as a `VideoSelectorField` and SHALL obtain uploaded Video block assets exclusively from `video.asset`, not from a standalone asset contract.

#### Scenario: Video field contains no playable selector source
- **WHEN** a Video block payload contains `video` without a playable selector asset or embedded source and also contains a valid legacy `url`
- **THEN** the system does not classify or render the invalid selector and does not fall back to the legacy URL

### Requirement: Consistent source resolution across consumers
All Video block consumers SHALL apply the same selector-presence precedence when classifying items, rendering Video blocks, and converting Video data for the zoom gallery.

#### Scenario: Gallery receives selector-backed YouTube video
- **WHEN** zoom-gallery conversion receives a Video block with a YouTube selector and a conflicting legacy URL
- **THEN** the converted gallery asset uses the selector's provider, video identifier, aspect ratio, and applicable playback settings

#### Scenario: Gallery receives URL fallback video
- **WHEN** zoom-gallery conversion receives a Video block without `video` and with a valid supported legacy URL
- **THEN** the converted gallery asset uses the legacy URL source, `aspect_ratio`, and `display_controls`

### Requirement: Source-specific playback behavior
The system SHALL honor only `display_controls` for URL-based selector sources, matching the legacy URL-based `VideoData` behavior, and SHALL honor autoplay, muted, loop, and `display_controls` for uploaded asset selector sources.

#### Scenario: URL selector contains asset playback flags
- **WHEN** a URL-based selector contains autoplay, muted, or loop values
- **THEN** the system ignores those values and applies only its `display_controls` value

#### Scenario: Asset selector contains playback flags
- **WHEN** an uploaded asset selector contains autoplay, muted, loop, or `display_controls` values
- **THEN** the system applies those values to the asset video

### Requirement: Stable general Video playback defaults
The general Storyblok Video block SHALL keep controls hidden for URL sources when `display_controls` is omitted, and SHALL default every omitted asset playback flag to false.

#### Scenario: URL selector omits controls option
- **WHEN** a playable URL-based selector omits `display_controls`
- **THEN** the rendered embedded Video block keeps controls hidden

#### Scenario: Asset selector omits playback flags
- **WHEN** a playable asset selector omits autoplay, muted, loop, and `display_controls`
- **THEN** the rendered asset does not autoplay, is not forced muted or looping, and keeps controls hidden

### Requirement: Storyblok editor interaction safety
The system SHALL prevent pointer interaction with selector-backed asset and embedded video surfaces while the Video block is rendered in Storyblok editor-preview mode.

#### Scenario: Selector video appears in editor preview
- **WHEN** an author previews a selector-backed Video block in the Storyblok editor
- **THEN** pointer interaction with its video surface is disabled
