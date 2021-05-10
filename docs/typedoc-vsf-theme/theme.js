const { default: MarkdownTheme } = require('typedoc-plugin-markdown/dist/theme');

exports.default = class VsfCustomTheme extends MarkdownTheme {
  constructor(renderer, basePath) {
    super(renderer, basePath);
  }
};
