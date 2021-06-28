/**
 * Replaces new line to br tag based on regex /\r\n/g -> this can be overwritten by passing
 * your own regex as second param.
 *
 * returns a single sting best printed as raw html.
 *
 * Vue 1.0  <p> {{{ text | nl2br }}} </p>
 *
 * Vue 2.0  <p v-html="$options.filters.nl2br(text)"></p>
 * NOTE: v-html does not support the piped filter syntax so directly access the filter function.
 */

function nl2br (text: string, reg = /(?:\r\n|\r|\n)/g): string {
  if (text == null) {
    return text;
  }

  let i;
  let s = '';
  const lines = text.split(reg);
  const l = lines.length;

  for (i = 0; i < l; ++i) {
    s += lines[i];

    if (i !== l - 1) {
      s += '<br/>';
    }
  }

  return s;
}

export default nl2br;
