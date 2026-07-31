## 1. Default-selection behavior

- [x] 1.1 Mark the generated Standard production-time option as the default while retaining the existing empty-selection guard in the shared customization defaulting flow.
- [x] 1.2 Confirm the Standard default uses the shared customization defaulting flow without adding widget-level state initialization.
- [x] 1.3 Verify restored and edited-cart production-time values preserve an existing Rush or Super Rush selection.

## 2. Production-time presentation

- [x] 2.1 Reverse the timeline widget's turnaround-time sort so it displays longest-to-shortest in every layout, retaining its stable fallback and no empty position when Super Rush is absent.
- [x] 2.2 Calculate fastest-available independently from the reversed display sequence and retain existing prices, slots, sold-out disabling, and emitted selection values.
- [x] 2.3 Update the production-time option card to render the configured duration plus option name as its bold first line and the calculated target ship date as its muted second line.
- [x] 2.4 Add or update localization keys for the duration-first card label and regenerate the theme i18n resources if required.

## 3. Existing product-flow alignment

- [x] 3.1 Update `src/themes/petsies-capybara/e2e-tests/tests/product/forevers-plush.spec.ts` to rely on the Standard default instead of setting a production-time option by index.
