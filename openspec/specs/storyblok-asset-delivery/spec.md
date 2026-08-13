## Purpose

Ensure every Storyblok-owned asset exposed by storefront content is delivered through the configured Budsies CDN while preserving unrelated URLs and Storyblok image transformation behavior.

## Requirements

### Requirement: Recognized Storyblok assets use the configured CDN
The storefront SHALL replace the origin of a recognized Storyblok asset URL with the configured Storyblok asset CDN origin while preserving the asset path, query string, and fragment.

#### Scenario: Canonical Storyblok asset URL
- **WHEN** storefront content contains an asset URL hosted by `a.storyblok.com`
- **THEN** the emitted asset URL uses the configured Storyblok asset CDN origin with the remaining URL components preserved

#### Scenario: Legacy S3 Storyblok asset URL
- **WHEN** storefront content contains an asset URL whose `s3.amazonaws.com` path begins with `/a.storyblok.com/`
- **THEN** the emitted asset URL uses the configured Storyblok asset CDN origin and the Storyblok asset path after that prefix

#### Scenario: Asset already uses the configured CDN
- **WHEN** storefront content contains an asset URL that already uses the configured Storyblok asset CDN origin
- **THEN** the emitted URL remains unchanged

### Requirement: Unrelated URLs remain unchanged
The storefront MUST normalize only recognized Storyblok asset origins and MUST preserve unrelated, relative, data, blob, empty, and unparseable URL values unchanged.

#### Scenario: External non-Storyblok asset
- **WHEN** storefront content contains an asset URL from an unrelated external origin
- **THEN** the storefront emits that URL unchanged

#### Scenario: Non-network URL
- **WHEN** storefront content contains a relative, data, blob, empty, or unparseable URL value
- **THEN** the storefront emits that value unchanged

### Requirement: Storyblok asset delivery covers every storefront rendering surface
The storefront SHALL use the configured Storyblok asset CDN for recognized Storyblok assets emitted by responsive and raw images, image lightboxes and galleries, asset-backed videos, rich-text images, social-sharing image parameters, social metadata images, asset download links, and legacy Storyblok background-image components.

#### Scenario: Visual asset rendered in storefront content
- **WHEN** a recognized Storyblok image or video asset is rendered by any supported Storyblok component, rich-text node, lightbox, or gallery
- **THEN** every browser-requested URL for that asset uses the configured Storyblok asset CDN

#### Scenario: Asset URL exposed to a third party
- **WHEN** a recognized Storyblok asset is emitted in social metadata or a social-sharing URL
- **THEN** the asset URL exposed to the crawler or sharing service uses the configured Storyblok asset CDN

#### Scenario: Storyblok asset link
- **WHEN** a Storyblok link or rich-text link targets a recognized Storyblok asset
- **THEN** the resulting download or navigation URL uses the configured Storyblok asset CDN

### Requirement: Responsive image transformations remain compatible
The storefront SHALL construct resized and format-converted Storyblok image URLs on the configured Storyblok asset CDN using the same asset path and transformation semantics as the Storyblok image service.

#### Scenario: Responsive image source generation
- **WHEN** the storefront generates responsive sources for a recognized Storyblok image
- **THEN** each fallback, WebP, and AVIF source uses the configured Storyblok asset CDN and retains the requested dimensions, fit mode, density descriptor, format, and quality

#### Scenario: Input already uses the configured CDN
- **WHEN** responsive image generation receives an asset URL already using the configured Storyblok asset CDN
- **THEN** it successfully extracts the asset identity and produces valid transformed CDN URLs without duplicating the CDN origin

### Requirement: Delivery is consistent across SSR and editor preview updates
The storefront SHALL apply Storyblok asset URL normalization during server rendering, client rendering, and live Storyblok editor-preview content updates.

#### Scenario: Server-rendered Storyblok content
- **WHEN** a Storyblok page is rendered on the server
- **THEN** recognized Storyblok asset URLs in the generated HTML use the configured Storyblok asset CDN before the response is sent

#### Scenario: Live editor-preview update
- **WHEN** the Storyblok editor bridge replaces content without re-fetching the story
- **THEN** recognized Storyblok asset URLs rendered from the updated content use the configured Storyblok asset CDN
