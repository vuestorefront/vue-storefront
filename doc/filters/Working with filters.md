# Working with filters

Filters are used to apply common text formatting. In Vue Storefront there are two types of filters.


## Core filters

Core filters are located in `core/filters` folder. There are two core filters:

* price - it converts number to price string,
* htmlDecode - it decodes any named and numerical character references in text.
* date - it converts date string to format defined in config file

To add new core filter you have to create new file `core/filters/{filter-name}/index.js` and write there filter code. If you want to register it just add it to `core/filters/index.js`.

## Theme filters

Theme filters should be located in `src/themes/{theme_name}/filters`. To add new theme filter you have to create new file `filters/{filter-name}/index.js` in theme scope and write there filter code. If you want to register it just add it to `filters/index.js` in theme scope as well.
