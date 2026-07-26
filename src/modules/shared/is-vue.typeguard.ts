/* eslint-disable valid-typeof */

import Vue, { ComponentPublicInstance } from 'vue';

export default function isVue (
  arg: unknown
): arg is Vue | ComponentPublicInstance {
  return arg instanceof Vue;
}
