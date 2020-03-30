# `icmaa-teaser` module

Load and show teaser from cms, filtered by tags and clusters.

## Default translations

We have a bunch of default translations which are used for common texts at the teasers.
These translations are in some GoogleSheet and should be synced with the translation CSV's in the `icmaa-teaser/resource/i18n/` folder.

There is a field in the CMS which contains a list of all default translations – where you can select either a translation or just type your language text.

We build a helper class and a custom Vue filter which is included by a mixin called: `icmaa-teaser/mixins/translatorMixin.ts`.
If you include this mixin you can user the filter in the templates like: `{{ 'My custom string' | translate }}`.
It will look in the default translations to translate the text or just show the string you provide if nothing is found.

## Configs

...

## Todo

[ ] ...
