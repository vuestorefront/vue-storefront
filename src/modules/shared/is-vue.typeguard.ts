/* eslint-disable valid-typeof */

import Vue from 'vue';

export default function isVue (
  arg: unknown
): arg is Vue {
  return arg instanceof Vue;
}
