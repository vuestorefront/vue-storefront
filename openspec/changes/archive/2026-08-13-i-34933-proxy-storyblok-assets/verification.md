## CDN compatibility

Validation attempted on 2026-08-13 against the representative image paths embedded in the existing responsive-image helpers.

- `HEAD https://sb-assets.budsies.com/f/109999/1080x1080/485ba42bde/petsies_homepage_images_1_.png` returned `403` from CloudFront/S3.
- The configured development storefront did not expose usable representative Storyblok image, video, or download URLs in its returned HTML.
- Original image, transformed image, video, download, byte-range, query-string, and cache-hit behavior therefore remain unverified with current accessible fixtures.

Deployment prerequisite: obtain currently published representative asset URLs (including a video and a downloadable non-image asset), then require successful CDN `GET` and `HEAD` responses with correct content types, successful `206 Partial Content` for range requests, preserved query behavior, and expected CloudFront cache headers before enabling raw video and download routing in production.

## Storefront sink inventory

The implementation scan found no remaining production hardcoding of `a.storyblok.com`, legacy `s3.amazonaws.com/a.storyblok.com`, or `sb-assets.budsies.com` outside the centralized asset URL policy and configuration default. Test fixtures intentionally retain all supported origins.

Intentional exclusions remain CMS-authored raw HTML, the Storyblok Content API, Storyblok editor bridge script, embedded video providers, promotion-platform assets, and unrelated external assets. Storyblok asset URLs are normalized only when supplied through specialized typed fields.
