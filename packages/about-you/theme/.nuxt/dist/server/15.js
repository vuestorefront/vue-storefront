exports.ids = [15];
exports.modules = {

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(269);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("764ac0bd", content, true, context)
};

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(271);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("19393b46", content, true, context)
};

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(273);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("249c0be2", content, true, context)
};

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(275);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("3235703a", content, true, context)
};

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(277);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("5da08c60", content, true, context)
};

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(279);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("1fc5f19e", content, true, context)
};

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(281);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("3600f1bc", content, true, context)
};

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/atoms/SfArrow/SfArrow.vue?vue&type=template&id=c9db9d3c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('SfButton',_vm._g({staticClass:"sf-arrow",attrs:{"type":"button"}},_vm.$listeners),[_vm._t("default",[_c('SfIcon',{staticClass:"sf-arrow__icon",attrs:{"size":"1.5rem","icon":"arrow_left","aria-hidden":"true"}})])],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfArrow/SfArrow.vue?vue&type=template&id=c9db9d3c&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue + 4 modules
var SfButton = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfIcon/SfIcon.vue + 6 modules
var SfIcon = __webpack_require__(6);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/atoms/SfArrow/SfArrow.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var SfArrowvue_type_script_lang_js_ = ({
  name: "SfArrow",
  components: {
    SfButton: SfButton["a" /* default */],
    SfIcon: SfIcon["a" /* default */]
  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfArrow/SfArrow.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfArrow_SfArrowvue_type_script_lang_js_ = (SfArrowvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfArrow/SfArrow.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(278)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  SfArrow_SfArrowvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "0edd16a1"
  
)

/* harmony default export */ var SfArrow = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfCallToAction_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(243);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfCallToAction_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfCallToAction_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfCallToAction_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfCallToAction_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}.sf-call-to-action{display:flex;display:var(--banner-display,flex);box-sizing:border-box;flex-direction:column;flex-direction:var(--call-to-action-flex-direction,column);align-items:var(--call-to-action-align-items);justify-content:left;justify-content:var(--call-to-action-justify-content,left);min-height:auto;min-height:var(--call-to-action-height,auto);padding:var(--call-to-action-padding,var(--spacer-base));background:var(--_call-to-action-background-image) transparent no-repeat 0 0;background:var(--call-to-action-background,var(--call-to-action-background-image,var(--_call-to-action-background-image)) var(--call-to-action-background-color,var(--_call-to-action-background-color,transparent)) no-repeat var(--call-to-action-background-position,0 0));background-size:cover;background-size:var(--call-to-action-background-size,cover)}.sf-call-to-action__text-container{display:flex;justify-content:flex-start;justify-content:var(--call-to-action-text-container-justify-content,flex-start);flex-direction:column;flex-direction:var(--call-to-action-text-container-flex-direction,column);width:var(--call-to-action-text-container-width);margin:var(--call-to-action-text-container-margin)}.sf-call-to-action__title{margin:var(--call-to-action-title-margin,0 0 var(--spacer-sm) 0);color:var(--c-white);color:var(--call-to-action-color,var(--call-to-action-title-color,var(--c-white)));font:var(--font-semibold) var(--h2-font-size)/1.4 var(--font-family-secondary);font:var(--call-to-action-title-font,var(--call-to-action-title-font-weight,var(--font-semibold)) var(--call-to-action-title-font-size,var(--h2-font-size))/var(--call-to-action-title-font-line-height,1.4) var(--call-to-action-title-font-family,var(--font-family-secondary)));text-transform:none;text-transform:var(--call-to-action-title-text-transform,none)}.sf-call-to-action__description{margin:var(--call-to-action-description-margin,0 0 var(--spacer-sm) 0);color:var(--c-white);color:var(--call-to-action-color,var(--call-to-action-description-color,var(--c-white)));font:var(--font-light) var(--font-base)/1.6 var(--font-family-primary);font:var(--call-to-action-description-font,var(--call-to-action-description-font-weight,var(--font-light)) var(--call-to-action-description-font-size,var(--font-base))/var(--call-to-action-description-font-line-height,1.6) var(--call-to-action-description-font-family,var(--font-family-primary)))}@media (min-width:1024px){.sf-call-to-action{--call-to-action-flex-direction:row;--call-to-action-justify-content:space-between;--call-to-action-align-items:center;--call-to-action-padding:var(--spacer-xl) var(--spacer-2xl);--call-to-action-height:12.5rem;--call-to-action-text-container-width:75%}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfSection_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(244);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfSection_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfSection_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfSection_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfSection_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}.sf-section{margin:var(--section-margin,calc(var(--spacer-lg)*2) 0 var(--spacer-lg) 0)}.sf-section__content{margin:var(--section-content-margin,calc(var(--spacer-lg)*2) 0 0 0)}@media (min-width:1024px){.sf-section{--section-margin:var(--spacer-3xl) 0;--section-content-margin:var(--spacer-2xl) 0 0 0}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_InstagramFeed_vue_vue_type_style_index_0_id_6b09d5c9_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(245);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_InstagramFeed_vue_vue_type_style_index_0_id_6b09d5c9_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_InstagramFeed_vue_vue_type_style_index_0_id_6b09d5c9_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_InstagramFeed_vue_vue_type_style_index_0_id_6b09d5c9_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_InstagramFeed_vue_vue_type_style_index_0_id_6b09d5c9_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only[data-v-6b09d5c9]{display:none!important}}@media (max-width:1023px){.desktop-only[data-v-6b09d5c9]{display:none!important}}.title[data-v-6b09d5c9]{--heading-title-font-weight:var(--font-weight--semibold);--section-margin:var(--spacer-xl) 0;--section-content-margin:var(--spacer-xl) 0;--heading-title-font-size:var(--h2-font-size)}@media (min-width:1024px){.title[data-v-6b09d5c9]{--section-margin:var(--spacer-2xl) 0;--section-content-margin:var(--spacer-2xl) 0}}.grid[data-v-6b09d5c9]{display:flex;max-height:20.625rem;width:100%;justify-content:center;margin:0}@media (min-width:1024px){.grid[data-v-6b09d5c9]{max-height:40.625rem;max-width:60rem;margin:0 auto}}.grid__row[data-v-6b09d5c9]{display:flex;flex-direction:column}.grid__row+.grid__row[data-v-6b09d5c9]{margin-left:var(--spacer-xs)}@media (min-width:1024px){.grid__row+.grid__row[data-v-6b09d5c9]{margin-left:var(--spacer-sm)}}.grid__col[data-v-6b09d5c9]{width:10rem;height:10rem}@media (min-width:1024px){.grid__col[data-v-6b09d5c9]{width:29.375rem;height:29.375rem}.grid__col.small[data-v-6b09d5c9]{height:10rem}}.grid__col+.grid__col[data-v-6b09d5c9]{margin-top:var(--spacer-xs)}@media (min-width:1024px){.grid__col+.grid__col[data-v-6b09d5c9]{margin-top:var(--spacer-sm)}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBanner_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(246);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBanner_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBanner_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBanner_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBanner_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}.sf-banner{box-sizing:border-box;display:flex;display:var(--banner-display,flex);align-items:flex-start;align-items:var(--banner-align-items,flex-start);justify-content:flex-start;justify-content:var(--banner-justify-content,flex-start);min-height:14rem;min-height:var(--banner-height,14rem);width:100%;width:var(--banner-width,100%);padding:var(--banner-padding,var(--spacer-xl));background:var(--_banner-background-image) transparent no-repeat 0 0;background:var(--banner-background,var(--banner-background-image,var(--_banner-background-image)) var(--banner-background-color,var(--_banner-background-color,transparent)) no-repeat var(--banner-background-position,0 0));background-size:cover;background-size:var(--banner-background-size,cover)}.sf-banner__container{display:flex;flex:0 0 50%;flex:0 0 var(--banner-container-width,50%);justify-content:flex-start;justify-content:var(--banner-container-justify-content,flex-start);align-items:flex-start;align-items:var(--banner-container-align-items,flex-start);flex-direction:column;flex-direction:var(--banner-container-flex-direction,column)}.sf-banner__subtitle{margin:0;margin:var(--banner-subtitle-margin,0);color:var(--c-dark-variant);color:var(--banner-color,var(--banner-subtitle-color,var(--c-dark-variant)));font:var(--font-normal) var(--font-2xs)/1.4 var(--font-family-secondary);font:var(--banner-subtitle-font,var(--banner-subtitle-font-weight,var(--font-normal)) var(--banner-subtitle-font-size,var(--font-2xs))/var(--banner-subtitle-font-line-height,1.4) var(--banner-subtitle-font-family,var(--font-family-secondary)));text-transform:uppercase;text-transform:var(--banner-subtitle-text-transform,uppercase)}.sf-banner__title{margin:.6875rem 0 0;margin:var(--banner-title-margin,.6875rem 0 0 0);color:var(--c-text);color:var(--banner-color,var(--banner-title-color,var(--c-text)));font:var(--font-normal) var(--h2-font-size)/1.4 var(--font-family-secondary);font:var(--banner-title-font,var(--banner-title-font-weight,var(--font-normal)) var(--banner-title-font-size,var(--h2-font-size))/var(--banner-title-font-line-height,1.4) var(--banner-title-font-family,var(--font-family-secondary)));text-transform:uppercase;text-transform:var(--banner-title-text-transform,uppercase)}.sf-banner__description{display:none;display:var(--banner-display-description,none);margin:var(--banner-description-margin,var(--spacer-sm) 0 var(--spacer-base) 0);color:var(--c-text);color:var(--banner-color,var(--banner-description-color,var(--c-text)));font:var(--font-light) var(--font-base)/1.6 var(--font-family-primary);font:var(--banner-description-font,var(--banner-description-font-weight,var(--font-light)) var(--banner-description-font-size,var(--font-base))/var(--banner-description-font-line-height,1.6) var(--banner-description-font-family,var(--font-family-primary)))}.sf-banner__call-to-action{display:none;display:var(--banner-display-call-to-action,none)}@media (min-width:1024px){.sf-banner{align-items:center;align-items:var(--banner-align-items,center);--banner-background-image:var(--_banner-background-desktop-image,var(--_banner-background-image));--banner-display-description:block;--banner-display-call-to-action:block;--banner-title-margin:var(--spacer-base) 0 0 0;--banner-subtitle-color:var(--c-gray);--banner-title-font-size:var(--h1-font-size);min-height:19rem;min-height:var(--banner-height,19rem)}}@media (min-width:1024px){.sf-banner--right{--banner-justify-content:flex-end}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MobileStoreBanner_vue_vue_type_style_index_0_id_25b2fcd1_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(247);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MobileStoreBanner_vue_vue_type_style_index_0_id_25b2fcd1_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MobileStoreBanner_vue_vue_type_style_index_0_id_25b2fcd1_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MobileStoreBanner_vue_vue_type_style_index_0_id_25b2fcd1_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MobileStoreBanner_vue_vue_type_style_index_0_id_25b2fcd1_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only[data-v-25b2fcd1]{display:none!important}}@media (max-width:1023px){.desktop-only[data-v-25b2fcd1]{display:none!important}}.banner-app[data-v-25b2fcd1]{--banner-title-margin:var(--spacer-base) 0 var(--spacer-xl) 0;--banner-padding:0 0 var(--spacer-2xl);--banner-title-font-size:var(--h1-font-size);--banner-subtitle-font-size:var(--font-size--xl);--banner-title-font-weight:var(--font-weight--semibold);--banner-subtitle-font-weight:var(--font-weight--medium);--banner-title-text-transform:capitalize;--banner-title-text-transform:none;--banner-background-size:contain;--banner-background-position:right;display:block;min-height:26.25rem;max-width:77.5rem;margin:0 auto;padding:5.625rem 31.25rem 0 5.625rem}.banner-app__call-to-action[data-v-25b2fcd1]{display:flex;flex-wrap:nowrap}.banner-app__button[data-v-25b2fcd1]{--image-width:10.875rem;--image-height:3.5625rem;pointer-events:visible}.banner-app__button+.banner-app__button[data-v-25b2fcd1]{margin:0 0 0 var(--spacer-base)}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfArrow_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(248);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfArrow_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfArrow_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfArrow_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfArrow_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}.sf-arrow{--button-width:2.75rem;--button-height:2.75rem;--button-padding:0 0.625rem;--button-background:var(--c-light);--button-transition:background 150ms linear;--icon-width:1.5rem;--icon-height:0.75rem;--icon-color:var(--c-dark);--button-box-shadow:0px 4px 4px var(--c-black);--box-shadow-transition-opacity-duration:150ms;display:flex;align-items:center;justify-content:center;justify-content:var(--arrow-justify-content,center)}.sf-arrow:hover{--button-background:var(--c-dark);--icon-color:var(--c-light);--button-box-shadow-opacity:0.25}.sf-arrow__icon{transform:var(--arrow-icon-transform)}.sf-arrow--long{--button-width:3.75rem;--button-height:1.875rem;--button-background:var(--c-white);--button-transition:transform 150ms linear;--arrow-justify-content:flex-start;--arrow-icon-transform:scale(0.855,0.75)}.sf-arrow--long:hover{transform:scale(1.17,1.34);transform-origin:center left}.sf-arrow--long.sf-arrow--right{--arrow-justify-content:flex-end;--arrow-icon-transform:rotate(180deg) scale(0.855,0.75)}.sf-arrow--long.sf-arrow--right:hover{transform-origin:center right}.sf-arrow--transparent{--button-background:transparent;--button-box-shadow:none}.sf-arrow--transparent:hover{--button-background:transparent;--icon-color:var(--c-dark)}.sf-arrow--rounded{--button-border-radius:100%}.sf-arrow--no-shadow{--button-box-shadow:none}.sf-arrow--right{--arrow-icon-transform:rotate(180deg)}.sf-arrow--top{--arrow-icon-transform:rotate(90deg)}.sf-arrow--down{--arrow-icon-transform:rotate(270deg)}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfCarousel_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(249);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfCarousel_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfCarousel_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfCarousel_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfCarousel_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}.sf-carousel{position:relative}.sf-carousel__wrapper{max-width:calc(100% - var(--carousel-controls-size));max-width:var(--carousel-width,calc(100% - var(--carousel-controls-size)));padding:var(--carousel-padding);margin:auto;overflow:hidden}.sf-carousel__slides{margin:0}.sf-carousel__controls{position:absolute;position:var(--carousel-controls-position,absolute);top:50%;top:var(--carousel-controls-top,50%);left:0;left:var(--carousel-controls-left,0);transform:translate3d(0,-50%,0);transform:var(--carousel-controls-transform,translate3d(0,-50%,0));display:none;display:var(--carousel-controls-display,none);justify-content:space-between;justify-content:var(--carousel-controls-justify-content,space-between);width:100%;width:var(--carousel-controls-width,100%)}.sf-carousel .glide__slide,.sf-carousel .glide__slides,.sf-carousel .glide__track{overflow:unset}.sf-carousel .glide__slides{margin:0}@media (min-width:1024px){.sf-carousel{--carousel-controls-size:15rem;--carousel-controls-display:flex}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/InstagramFeed.vue?vue&type=template&id=6b09d5c9&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('SfSection',{staticClass:"title",attrs:{"title-heading":"Share Your Look","subtitle-heading":"#YOURLOOK"}},[_c('div',{staticClass:"grid grid-images"},[_c('div',{staticClass:"grid__row"},[_c('div',{staticClass:"grid__col"},[(_vm.isMobile)?_c('SfImage',{attrs:{"src":"/homepage/imageAm.webp","alt":"katherina_trn","width":160,"height":160}},[_vm._v("katherina_trn")]):_c('SfImage',{attrs:{"src":"/homepage/imageAd.webp","alt":"katherina_trn","width":470,"height":470}},[_vm._v("katherina_trn")])],1),_vm._v(" "),_c('div',{staticClass:"grid__col small"},[(_vm.isMobile)?_c('SfImage',{attrs:{"src":"/homepage/imageBm.webp","alt":"katherina_trn","width":160,"height":160}},[_vm._v("katherina_trn")]):_c('SfImage',{attrs:{"src":"/homepage/imageCd.webp","alt":"katherina_trn","width":470,"height":160}},[_vm._v("katherina_trn")])],1)]),_vm._v(" "),_c('div',{staticClass:"grid__row"},[_c('div',{staticClass:"grid__col small"},[(_vm.isMobile)?_c('SfImage',{attrs:{"src":"/homepage/imageCm.webp","alt":"katherina_trn","width":160,"height":160}},[_vm._v("katherina_trn")]):_c('SfImage',{attrs:{"src":"/homepage/imageBd.webp","alt":"katherina_trn","width":470,"height":160}},[_vm._v("katherina_trn")])],1),_vm._v(" "),_c('div',{staticClass:"grid__col"},[(_vm.isMobile)?_c('SfImage',{attrs:{"src":"/homepage/imageDm.webp","alt":"katherina_trn","width":160,"height":160}},[_vm._v("katherina_trn")]):_c('SfImage',{attrs:{"src":"/homepage/imageDd.webp","alt":"katherina_trn","width":470,"height":470}},[_vm._v("katherina_trn")])],1)])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./_theme/components/InstagramFeed.vue?vue&type=template&id=6b09d5c9&scoped=true&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfSection/SfSection.vue + 4 modules
var SfSection = __webpack_require__(388);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfImage/SfImage.vue + 4 modules
var SfImage = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/utilities/mobile-observer.js
var mobile_observer = __webpack_require__(17);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/InstagramFeed.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var InstagramFeedvue_type_script_lang_js_ = ({
  name: 'InstagramFeed',
  components: {
    SfSection: SfSection["a" /* default */],
    SfImage: SfImage["a" /* default */]
  },
  computed: { ...Object(mobile_observer["a" /* mapMobileObserver */])()
  },

  beforeDestroy() {
    Object(mobile_observer["b" /* unMapMobileObserver */])();
  }

});
// CONCATENATED MODULE: ./_theme/components/InstagramFeed.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_InstagramFeedvue_type_script_lang_js_ = (InstagramFeedvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./_theme/components/InstagramFeed.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(272)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_InstagramFeedvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "6b09d5c9",
  "11fd17a7"
  
)

/* harmony default export */ var InstagramFeed = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/MobileStoreBanner.vue?vue&type=template&id=25b2fcd1&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('SfBanner',{staticClass:"sf-banner--left desktop-only banner-app",attrs:{"image":"/homepage/bannerD.png","subtitle":"Fashon to take away","title":"Download our application to your mobile"},scopedSlots:_vm._u([{key:"call-to-action",fn:function(){return [_c('div',{staticClass:"banner-app__call-to-action"},[_c('SfButton',{staticClass:"banner-app__button sf-button--pure",attrs:{"aria-label":"Go to Apple Product"},on:{"click":function () {}}},[_c('SfImage',{attrs:{"src":"/homepage/apple.png","alt":"App store"}})],1),_vm._v(" "),_c('SfButton',{staticClass:"banner-app__button sf-button--pure",attrs:{"aria-label":"Go to Google Product"},on:{"click":function () {}}},[_c('SfImage',{attrs:{"src":"/homepage/google.png","alt":"Google play"}})],1)],1)]},proxy:true}])})}
var staticRenderFns = []


// CONCATENATED MODULE: ./_theme/components/MobileStoreBanner.vue?vue&type=template&id=25b2fcd1&scoped=true&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfBanner/SfBanner.vue + 4 modules
var SfBanner = __webpack_require__(389);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfImage/SfImage.vue + 4 modules
var SfImage = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue + 4 modules
var SfButton = __webpack_require__(7);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/MobileStoreBanner.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var MobileStoreBannervue_type_script_lang_js_ = ({
  name: 'AppStoreBanner',
  components: {
    SfBanner: SfBanner["a" /* default */],
    SfImage: SfImage["a" /* default */],
    SfButton: SfButton["a" /* default */]
  }
});
// CONCATENATED MODULE: ./_theme/components/MobileStoreBanner.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_MobileStoreBannervue_type_script_lang_js_ = (MobileStoreBannervue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./_theme/components/MobileStoreBanner.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(276)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_MobileStoreBannervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "25b2fcd1",
  "1cce90bc"
  
)

/* harmony default export */ var MobileStoreBanner = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(363);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("27f6c756", content, true, context)
};

/***/ }),

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(365);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("60585f08", content, true, context)
};

/***/ }),

/***/ 314:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(367);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("d49feed8", content, true, context)
};

/***/ }),

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(369);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("3ea83166", content, true, context)
};

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBullets_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(312);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBullets_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBullets_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBullets_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBullets_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}.sf-bullet{box-sizing:border-box;width:.5rem;width:var(--bullet-width,var(--bullet-size,.5rem));height:.5rem;height:var(--bullet-height,var(--bullet-size,.5rem));margin:var(--bullet-margin,var(--spacer-2xs));border-radius:100%;border-radius:var(--bullet-border-radius,100%);background:var(--c-gray);background:var(--bullet-background,var(--c-gray));transition:transform .15s linear,box-shadow .15s linear;--bullet-box-shadow-opacity:0}.sf-bullet:before{content:\"\";position:absolute;z-index:-1;top:0;left:0;width:100%;height:100%;border-radius:inherit;transition:opacity .2s ease-in-out,box-shadow .2s ease-in-out;transition:var(--bullet-box-shadow-transition,opacity var(--bullet-box-shadow-transition-opacity-duration,.2s) var(--bullet-box-shadow-transition-opacity-timing-function,ease-in-out),box-shadow var(--bullet-box-shadow-transition-box-shadow-duration,.2s) var(--bullet-box-shadow-transition-box-shadow-timing-function,ease-in-out));opacity:var(--bullet-box-shadow-opacity);box-shadow:0 3px 4px 0 var(--c-black);box-shadow:var(--bullet-box-shadow,var(--bullet-box-shadow-h-offset,0) var(--bullet-box-shadow-v-offset,3px) var(--bullet-box-shadow-blur,4px) var(--bullet-box-shadow-spread,0) var(--bullet-box-shadow-color,var(--c-black)));will-change:opacity,box-shadow}.sf-bullet--active,.sf-bullet:hover{transform:scale3d(1.25,1.25,1);--bullet-box-shadow-opacity:0.25}.sf-bullet--active{--bullet-background:var(--c-primary);cursor:default}.sf-bullets{display:flex;align-items:center;padding:0;margin:0;list-style-type:none}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfHero_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(313);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfHero_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfHero_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfHero_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfHero_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}.sf-hero-item{display:flex;flex-direction:row;flex-direction:var(--hero-item-flex-direction,row);align-items:center;align-items:var(--hero-item-align-items,center);justify-content:flex-start;justify-content:var(--hero-item-justify-content,flex-start);box-sizing:border-box;min-height:14rem;min-height:var(--hero-item-height,14rem);width:100%;width:var(--hero-item-width,100%);padding:var(--hero-item-padding,var(--spacer-sm));color:var(--c-text);color:var(--hero-item-color,var(--c-text));background:var(--_hero-item-background-image) transparent no-repeat 0 0;background:var(--hero-item-background,var(--hero-item-background-image,var(--_hero-item-background-image)) var(--hero-item-background-color,var(--_hero-item-background-color,transparent)) no-repeat var(--hero-item-background-position,0 0));background-size:cover;background-size:var(--hero-item-background-size,cover)}.sf-hero-item__container{display:flex;flex-direction:column;align-items:flex-start;width:50%;width:var(--hero-item-container-width,50%)}.sf-hero-item__subtitle{margin:0;margin:var(--hero-item-subtitle-margin,0);color:var(--c-gray);color:var(--hero-item-subtitle-color,var(--c-gray));font:var(--font-normal) var(--font-2xs)/1.4 var(--font-family-secondary);font:var(--hero-item-subtitle-font,var(--hero-item-subtitle-font-weight,var(--font-normal)) var(--hero-item-subtitle-font-size,var(--font-2xs))/var(--hero-item-subtitle-font-line-height,1.4) var(--hero-item-subtitle-font-family,var(--font-family-secondary)));text-transform:uppercase;text-transform:var(--hero-item-subtitle-transform,uppercase)}.sf-hero-item__title{margin:var(--hero-item-title-margin,var(--spacer-xs) 0 0 0);color:var(--c-text);color:var(--hero-item-title-color,var(--c-text));font:var(--font-semibold) var(--h2-font-size)/1.2 var(--font-family-secondary);font:var(--hero-item-title-font,var(--hero-item-title-font-weight,var(--font-semibold)) var(--hero-item-title-font-size,var(--h2-font-size))/var(--hero-item-title-font-line-height,1.2) var(--hero-item-title-font-family,var(--font-family-secondary)));letter-spacing:.1px;text-transform:none;text-transform:var(--hero-item-title-transform,none)}.sf-hero-item__button{display:none;display:var(--hero-item-button-display,none)}.sf-hero-item--align-right{--hero-item-justify-content:flex-end}.sf-hero-item--position-bg-top-right{background-position:100% 0}.sf-hero-item--position-bg-bottom-right{background-position:100% 100%}.sf-hero-item--position-bg-bottom-left{background-position:0 100%}@media (min-width:1024px){.sf-hero-item{--hero-item-height:36.625rem;--hero-item-padding:var(--spacer-2xl);--hero-item-background-image:var(--_hero-item-background-desktop-image,var(--_hero-item-background-image))}.sf-hero-item__title{--hero-item-font-size:var(--h1-font-size);--hero-item-title-margin:var(--spacer-base) 0 var(--spacer-lg) 0}.sf-hero-item__button{--hero-item-button-display:block}}.sf-hero{position:relative}.sf-hero__controls{position:absolute;top:50%;top:var(--hero-controls-top,50%);transform:translate3d(0,-50%,0);display:none;display:var(--hero-controls-display,none);box-sizing:border-box;justify-content:space-between;justify-content:var(--hero-controls-justify-content,space-between);width:100%;width:var(--hero-controls-width,100%);padding:var(--hero-controls-padding,0 var(--spacer-sm))}.sf-hero__bullets{position:absolute;bottom:var(--spacer-xl);bottom:var(--hero-bullets-bottom,var(--spacer-xl));left:50%;transform:translate3d(-50%,0,0);display:none;display:var(--hero-bullets-display,none)}.sf-hero .glide__slides{margin:0}@media (min-width:1024px){.sf-hero__controls{--hero-controls-display:flex}.sf-hero__bullets{--hero-bullets-display:flex}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBannerGrid_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(314);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBannerGrid_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBannerGrid_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBannerGrid_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBannerGrid_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}.sf-banner-grid{--banner-align-items:flex-start;--banner-container-width:100%}.sf-banner-grid__row{display:block;display:var(--banner-grid-row-display,block);flex:var(--banner-grid-row-flex);margin:0;margin:var(--banner-grid-row-margin,0)}.sf-banner-grid__col{display:block;display:var(--banner-grid-col-display,block);flex:var(--banner-grid-col-flex);margin:0;margin:var(--banner-grid-col-margin,0)}.sf-banner-grid__col+.sf-banner-grid__col{--banner-grid-col-margin:var(--spacer-sm) 0 0 0}@media (min-width:1024px){.sf-banner-grid{--banner-grid-row-display:flex;--banner-grid-row-flex:0 0 100%;--banner-grid-col-display:flex}.sf-banner-grid__row{--banner-grid-row-margin:0}.sf-banner-grid__row+.sf-banner-grid__row{--banner-grid-row-margin:var(--spacer-xl) 0 0 0}.sf-banner-grid__col{--banner-grid-col-flex:1;flex-wrap:wrap;--banner-grid-col-margin:0}.sf-banner-grid__col+.sf-banner-grid__col{--banner-grid-col-margin:0 0 0 var(--spacer-xl)}.sf-banner-grid__col>.sf-banner,.sf-banner-grid__col>a{display:flex;flex:1}.sf-banner-grid__col--small{--banner-grid-col-flex:0 1 36%}.sf-banner-grid__col--medium{--banner-grid-col-flex:0 1 40%;--banner-container-width:70%}.sf-banner-grid__col--higher{--banner-height:510px}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_66416bee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(315);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_66416bee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_66416bee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_66416bee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_66416bee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only[data-v-66416bee]{display:none!important}}@media (max-width:1023px){.desktop-only[data-v-66416bee]{display:none!important}}#home[data-v-66416bee]{box-sizing:border-box;padding:0 var(--spacer-sm)}@media (min-width:1024px){#home[data-v-66416bee]{max-width:1240px;padding:0;margin:0 auto}}.hero[data-v-66416bee]{margin:var(--spacer-xl) auto var(--spacer-lg);--hero-item-background-position:center}.hero[data-v-66416bee]  .sf-link:hover{color:var(--c-white)}@media (min-width:1024px){.hero[data-v-66416bee]{margin:var(--spacer-xl) auto var(--spacer-2xl)}}.hero .sf-hero-item[data-v-66416bee]:nth-child(2n){--hero-item-background-position:left}@media (max-width:1023px){.hero .sf-hero-item[data-v-66416bee]:nth-child(2n){--hero-item-background-position:30%}.hero .sf-hero-item[data-v-66416bee]:nth-child(2n)  .sf-hero-item__wrapper.sf-button{align-items:flex-end;text-align:right;padding:var(--spacer-sm) var(--spacer-sm) var(--spacer-sm) var(--spacer-2xl)}.hero .sf-hero-item[data-v-66416bee]:nth-child(2n)  .sf-hero-item__subtitle,.hero .sf-hero-item[data-v-66416bee]:nth-child(2n)  .sf-hero-item__title{width:100%}}.hero[data-v-66416bee]  .sf-hero__control--left,.hero[data-v-66416bee]  .sf-hero__control--right{display:none}.banner-grid[data-v-66416bee]{--banner-container-width:50%;margin:var(--spacer-xl) 0}.banner-grid[data-v-66416bee]  .sf-link:hover{color:var(--c-white)}@media (min-width:1024px){.banner-grid[data-v-66416bee]{margin:var(--spacer-2xl) 0}.banner-grid[data-v-66416bee]  .sf-link{--button-width:auto}}.banner__tshirt[data-v-66416bee]{background-position:0}@media (min-width:1024px){.banner-central[data-v-66416bee]{--banner-container-flex:0 0 70%}}.similar-products[data-v-66416bee]{display:flex;justify-content:space-between;align-items:center;padding-bottom:var(--spacer-2xs);--heading-padding:0;border-bottom:1px solid var(--c-light)}@media (min-width:1024px){.similar-products[data-v-66416bee]{border-bottom:0;justify-content:center;padding-bottom:0}}.call-to-action[data-v-66416bee]{background-position:100%;margin:var(--spacer-xs) 0}@media (min-width:1024px){.call-to-action[data-v-66416bee]{margin:var(--spacer-xl) 0 var(--spacer-2xl) 0}}.carousel[data-v-66416bee]{margin:0 calc(var(--spacer-sm)*-1) 0 0}@media (min-width:1024px){.carousel[data-v-66416bee]{margin:0}}.carousel__item[data-v-66416bee]{margin:1.375rem 0 2.5rem}@media (min-width:1024px){.carousel__item[data-v-66416bee]{margin:var(--spacer-xl) 0 var(--spacer-xl) 0}}.carousel__item__product[data-v-66416bee]{--product-card-add-button-transform:translate3d(0,30%,0)}.carousel[data-v-66416bee]  .sf-arrow--long .sf-arrow--right{--arrow-icon-transform:rotate(180deg);transform-origin:center}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfCarousel/SfCarousel.vue?vue&type=template&id=3a0b2f9a&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sf-carousel"},[_vm._ssrNode("<div class=\"sf-carousel__controls\">","</div>",[_vm._t("prev",[_c('SfArrow',{staticClass:"sf-arrow--long",attrs:{"aria-label":"previous"},on:{"click":function($event){return _vm.go('prev')}}})],null,{ go: function () { return _vm.go('prev'); } }),_vm._ssrNode(" "),_vm._t("next",[_c('SfArrow',{staticClass:"sf-arrow--long sf-arrow--right",attrs:{"aria-label":"next"},on:{"click":function($event){return _vm.go('next')}}})],null,{ go: function () { return _vm.go('next'); } })],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"sf-carousel__wrapper\">","</div>",[_vm._ssrNode("<div class=\"glide\">","</div>",[_vm._ssrNode("<div data-glide-el=\"track\" class=\"glide__track\">","</div>",[_vm._ssrNode("<ul class=\"glide__slides sf-carousel__slides\">","</ul>",[_vm._t("default")],2)])])])],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfCarousel/SfCarousel.vue?vue&type=template&id=3a0b2f9a&

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(3);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfCarousel/_internal/SfCarouselItem.vue?vue&type=template&id=07c837be&
var SfCarouselItemvue_type_template_id_07c837be_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"sf-carousel-item glide__slide"},[_vm._t("default")],2)}
var SfCarouselItemvue_type_template_id_07c837be_staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfCarousel/_internal/SfCarouselItem.vue?vue&type=template&id=07c837be&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfCarousel/_internal/SfCarouselItem.vue?vue&type=script&lang=js&
//
//
//
//
//
/* harmony default export */ var SfCarouselItemvue_type_script_lang_js_ = ({
  name: "SfCarouselItem"
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfCarousel/_internal/SfCarouselItem.vue?vue&type=script&lang=js&
 /* harmony default export */ var _internal_SfCarouselItemvue_type_script_lang_js_ = (SfCarouselItemvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfCarousel/_internal/SfCarouselItem.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  _internal_SfCarouselItemvue_type_script_lang_js_,
  SfCarouselItemvue_type_template_id_07c837be_render,
  SfCarouselItemvue_type_template_id_07c837be_staticRenderFns,
  false,
  null,
  null,
  "dce1ba90"
  
)

/* harmony default export */ var SfCarouselItem = (component.exports);
// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfArrow/SfArrow.vue + 4 modules
var SfArrow = __webpack_require__(257);

// EXTERNAL MODULE: external "@glidejs/glide"
var glide_ = __webpack_require__(211);
var glide_default = /*#__PURE__*/__webpack_require__.n(glide_);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfCarousel/SfCarousel.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




external_vue_default.a.component("SfCarouselItem", SfCarouselItem);
/* harmony default export */ var SfCarouselvue_type_script_lang_js_ = ({
  name: "SfCarousel",
  components: {
    SfArrow: SfArrow["a" /* default */]
  },
  props: {
    /** Carousel options like glide.js (https://glidejs.com/docs/) */
    settings: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      glide: null,
      defaultSettings: {
        type: "carousel",
        rewind: true,
        perView: 4,
        slidePerPage: true,
        gap: 0,
        breakpoints: {
          1023: {
            perView: 2,
            peek: {
              before: 0,
              after: 50
            }
          }
        }
      }
    };
  },

  computed: {
    mergedOptions() {
      let breakpoints = { ...this.defaultSettings.breakpoints
      };

      if (this.settings.breakpoints) {
        breakpoints = { ...breakpoints,
          ...this.settings.breakpoints
        };
      }

      return { ...this.defaultSettings,
        ...this.settings,
        breakpoints: breakpoints
      };
    }

  },
  mounted: function () {
    this.$nextTick(() => {
      if (!this.$slots.default) return;
      const glide = new glide_default.a(this.$refs.glide, this.mergedOptions);
      glide.mount();
      glide.on("run.before", move => {
        const {
          slidePerPage,
          rewind,
          type
        } = this.mergedOptions;
        if (!slidePerPage) return;
        const {
          perView
        } = glide.settings;
        if (!perView > 1) return;
        const size = this.$slots.default.filter(slot => slot.tag).length;
        const {
          direction
        } = move;
        let page, newIndex;

        switch (direction) {
          case ">":
          case "<":
            page = Math.ceil(glide.index / perView);
            newIndex = page * perView + (direction === ">" ? perView : -perView);

            if (newIndex >= size) {
              if (type === "slider" && !rewind) {
                newIndex = glide.index;
              } else {
                newIndex = 0;
              }
            } else if (newIndex < 0 || newIndex + perView > size) {
              if (type === "slider" && !rewind) {
                newIndex = glide.index;
              } else {
                newIndex = size - perView;
              }
            }

            move.direction = "=";
            move.steps = newIndex;
        }
      });
      this.glide = glide;
    });
  },
  methods: {
    go(direct) {
      if (!this.glide) return;

      switch (direct) {
        case "prev":
          this.glide.go("<");
          break;

        case "next":
          this.glide.go(">");
          break;
      }
    }

  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfCarousel/SfCarousel.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfCarousel_SfCarouselvue_type_script_lang_js_ = (SfCarouselvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfCarousel/SfCarousel.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(280)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var SfCarousel_component = Object(componentNormalizer["a" /* default */])(
  SfCarousel_SfCarouselvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "b25e2c1c"
  
)

/* harmony default export */ var SfCarousel = __webpack_exports__["a"] = (SfCarousel_component.exports);

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/molecules/SfCallToAction/SfCallToAction.vue?vue&type=template&id=89b86658&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"sf-call-to-action",style:(_vm.style)},[_vm._ssrNode("<div class=\"sf-call-to-action__text-container\">","</div>",[_vm._t("title",[(_vm.title)?_c('h2',{staticClass:"sf-call-to-action__title"},[_vm._v("\n        "+_vm._s(_vm.title)+"\n      ")]):_vm._e()],null,{ title: _vm.title }),_vm._ssrNode(" "),_vm._t("description",[(_vm.description)?_c('p',{staticClass:"sf-call-to-action__description"},[_vm._v("\n        "+_vm._s(_vm.description)+"\n      ")]):_vm._e()],null,{ description: _vm.description })],2),_vm._ssrNode(" "),_vm._t("button",[(_vm.buttonText)?_c('SfButton',{staticClass:"sf-call-to-action__button"},[_vm._v("\n      "+_vm._s(_vm.buttonText)+"\n    ")]):_vm._e()],null,{ buttonText: _vm.buttonText })],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfCallToAction/SfCallToAction.vue?vue&type=template&id=89b86658&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue + 4 modules
var SfButton = __webpack_require__(7);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/molecules/SfCallToAction/SfCallToAction.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SfCallToActionvue_type_script_lang_js_ = ({
  name: "SfCallToAction",
  components: {
    SfButton: SfButton["a" /* default */]
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    buttonText: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    background: {
      type: String,
      default: ""
    },
    image: {
      type: [String, Object],
      default: ""
    }
  },
  computed: {
    style() {
      const image = this.image;
      const background = this.background;
      return {
        "--_call-to-action-background-image": image.mobile ? `url(${image.mobile})` : `url(${image})`,
        "--_call-to-action-background-desktop-image": image.desktop && `url(${image.desktop})`,
        "--_call-to-action-background-color": background
      };
    }

  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfCallToAction/SfCallToAction.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfCallToAction_SfCallToActionvue_type_script_lang_js_ = (SfCallToActionvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfCallToAction/SfCallToAction.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(268)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  SfCallToAction_SfCallToActionvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "5605f6de"
  
)

/* harmony default export */ var SfCallToAction = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/molecules/SfSection/SfSection.vue?vue&type=template&id=a1a22d18&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"sf-section"},[_vm._t("heading",[_c('SfHeading',{class:{ 'sf-heading--underline': _vm.hasUnderlinedModifier },attrs:{"level":_vm.levelHeading,"title":_vm.titleHeading,"subtitle":_vm.subtitleHeading}})],null,{ levelHeading: _vm.levelHeading, titleHeading: _vm.titleHeading, subtitleHeading: _vm.subtitleHeading }),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"sf-section__content\">","</div>",[_vm._t("default")],2)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfSection/SfSection.vue?vue&type=template&id=a1a22d18&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfHeading/SfHeading.vue + 4 modules
var SfHeading = __webpack_require__(28);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/molecules/SfSection/SfSection.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SfSectionvue_type_script_lang_js_ = ({
  name: "SfSection",
  components: {
    SfHeading: SfHeading["a" /* default */]
  },
  props: {
    /**
     * Heading title
     */
    titleHeading: {
      type: String,
      default: ""
    },

    /**
     * Heading subtitle
     */
    subtitleHeading: {
      type: String,
      default: ""
    },

    /**
     * Heading tag level
     */
    levelHeading: {
      type: Number,
      default: 2
    }
  },

  data() {
    return {
      hasUnderlinedModifier: false
    };
  },

  mounted: function () {
    this.hasUnderlinedModifier = this.$el.classList.contains("sf-section--underline");
  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfSection/SfSection.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfSection_SfSectionvue_type_script_lang_js_ = (SfSectionvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfSection/SfSection.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(270)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  SfSection_SfSectionvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "ad6079f8"
  
)

/* harmony default export */ var SfSection = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/molecules/SfBanner/SfBanner.vue?vue&type=template&id=7566776e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',_vm._g({staticClass:"sf-banner",style:(_vm.style)},_vm.isMobile ? _vm.$listeners : {}),[_vm._ssrNode("<div class=\"sf-banner__container\">","</div>",[_vm._t("subtitle",[(_vm.subtitle)?_c('h2',{staticClass:"sf-banner__subtitle"},[_vm._v("\n        "+_vm._s(_vm.subtitle)+"\n      ")]):_vm._e()],null,{ subtitle: _vm.subtitle }),_vm._ssrNode(" "),_vm._t("title",[(_vm.title)?_c('h1',{staticClass:"sf-banner__title"},[_vm._v("\n        "+_vm._s(_vm.title)+"\n      ")]):_vm._e()],null,{ title: _vm.title }),_vm._ssrNode(" "),_vm._t("description",[(_vm.description)?_c('p',{staticClass:"sf-banner__description"},[_vm._v("\n        "+_vm._s(_vm.description)+"\n      ")]):_vm._e()],null,{ description: _vm.description }),_vm._ssrNode(" "),_vm._t("call-to-action",[(_vm.buttonText)?_c('SfButton',_vm._g({staticClass:"sf-banner__call-to-action color-secondary"},!_vm.isMobile ? _vm.$listeners : {}),[_vm._v("\n        "+_vm._s(_vm.buttonText)+"\n      ")]):_vm._e()],null,{ buttonText: _vm.buttonText })],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfBanner/SfBanner.vue?vue&type=template&id=7566776e&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue + 4 modules
var SfButton = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/utilities/mobile-observer.js
var mobile_observer = __webpack_require__(17);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/molecules/SfBanner/SfBanner.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var SfBannervue_type_script_lang_js_ = ({
  name: "SfBanner",
  components: {
    SfButton: SfButton["a" /* default */]
  },
  props: {
    /**
     * Banner title
     */
    title: {
      type: String,
      default: ""
    },

    /**
     * Banner subtitle (at the top)
     */
    subtitle: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },

    /** text that will be displayed inside the button. You can replace the button  with "call-to-action" slot */
    buttonText: {
      type: String,
      default: ""
    },

    /** Background color in HEX (eg #FFFFFF) */
    background: {
      type: String,
      default: ""
    },

    /** Background image. Influenced by $banner-background-size, $banner-background-position CSS props. */
    image: {
      type: [String, Object],
      default: ""
    }
  },
  computed: { ...Object(mobile_observer["a" /* mapMobileObserver */])(),

    style() {
      const image = this.image;
      const background = this.background;
      return {
        "--_banner-background-image": image.mobile ? `url(${image.mobile})` : `url(${image})`,
        "--_banner-background-desktop-image": image.desktop && `url(${image.desktop})`,
        "--_banner-background-color": background
      };
    }

  },

  beforeDestroy() {
    Object(mobile_observer["b" /* unMapMobileObserver */])();
  }

});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfBanner/SfBanner.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfBanner_SfBannervue_type_script_lang_js_ = (SfBannervue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfBanner/SfBanner.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(274)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  SfBanner_SfBannervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "a5f19084"
  
)

/* harmony default export */ var SfBanner = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/Home.vue?vue&type=template&id=66416bee&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"home"}},[_c('LazyHydrate',{attrs:{"when-idle":""}},[_c('SfHero',{staticClass:"hero"},_vm._l((_vm.heroes),function(hero,i){return _c('SfHeroItem',{key:i,class:hero.className,attrs:{"title":hero.title,"subtitle":hero.subtitle,"button-text":hero.buttonText,"background":hero.background,"image":hero.image}})}),1)],1),_vm._ssrNode(" "),_c('LazyHydrate',{attrs:{"when-visible":""}},[_c('SfBannerGrid',{staticClass:"banner-grid",attrs:{"banner-grid":1},scopedSlots:_vm._u([_vm._l((_vm.banners),function(item){return {key:item.slot,fn:function(){return [_c('SfBanner',{key:item.slot,class:item.class,attrs:{"title":item.title,"subtitle":item.subtitle,"description":item.description,"button-text":item.buttonText,"image":item.image}})]},proxy:true}})],null,true)})],1),_vm._ssrNode(" "),_c('LazyHydrate',{attrs:{"when-visible":""}},[_c('div',{staticClass:"similar-products"},[_c('SfHeading',{attrs:{"title":"Match with it","level":3}}),_vm._v(" "),_c('nuxt-link',{staticClass:"smartphone-only",attrs:{"to":_vm.localePath('/c/women')}},[_vm._v("See all")])],1)]),_vm._ssrNode(" "),_c('LazyHydrate',{attrs:{"when-visible":""}},[_c('SfCarousel',{staticClass:"carousel",attrs:{"settings":{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }},scopedSlots:_vm._u([{key:"prev",fn:function(ref){
var go = ref.go;
return [_c('SfArrow',{staticClass:"sf-arrow--left sf-arrow--long",attrs:{"aria-label":"prev"},on:{"click":function($event){return go('prev')}}})]}},{key:"next",fn:function(ref){
var go = ref.go;
return [_c('SfArrow',{staticClass:"sf-arrow--right sf-arrow--long",attrs:{"aria-label":"next"},on:{"click":function($event){return go('next')}}})]}}])},[_vm._v(" "),_vm._v(" "),_vm._l((_vm.products),function(product,i){return _c('SfCarouselItem',{key:i,staticClass:"carousel__item"},[_c('SfProductCard',{staticClass:"carousel__item__product",attrs:{"data-cy":"home-url_product","title":product.title,"image":product.image,"regular-price":product.price.regular,"max-rating":product.rating.max,"score-rating":product.rating.score,"show-add-to-cart-button":true,"is-on-wishlist":product.isOnWishlist,"link":"/"},on:{"click:wishlist":function($event){return _vm.toggleWishlist(i)}}})],1)})],2)],1),_vm._ssrNode(" "),_c('LazyHydrate',{attrs:{"when-visible":""}},[_c('SfCallToAction',{staticClass:"call-to-action",attrs:{"title":"Subscribe to Newsletters","button-text":"Subscribe","description":"Be aware of upcoming sales and events. Receive gifts and special offers!","image":"/homepage/newsletter.webp"}})],1),_vm._ssrNode(" "),_c('LazyHydrate',{attrs:{"when-visible":""}},[_c('InstagramFeed')],1),_vm._ssrNode(" "),_c('LazyHydrate',{attrs:{"when-visible":""}},[_c('MobileStoreBanner')],1)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./_theme/pages/Home.vue?vue&type=template&id=66416bee&scoped=true&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfHero/SfHero.vue?vue&type=template&id=2dd65658&
var SfHerovue_type_template_id_2dd65658_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sf-hero"},[_vm._ssrNode("<div class=\"glide\">","</div>",[_vm._ssrNode("<div data-glide-el=\"track\" class=\"glide__track\">","</div>",[_vm._ssrNode("<ul class=\"glide__slides sf-hero__slides\">","</ul>",[_vm._t("default")],2)])]),_vm._ssrNode(" "),(_vm.numberOfPages > 1)?_vm._ssrNode("<div class=\"sf-hero__controls\">","</div>",[_vm._t("prev",[_c('div',{on:{"click":function($event){return _vm.go('prev')}}},[_c('SfArrow',{staticClass:"sf-arrow sf-arrow--transparent",attrs:{"aria-label":"previous"}})],1)],null,{ go: function () { return _vm.go('prev'); } }),_vm._ssrNode(" "),_vm._t("next",[_c('div',{on:{"click":function($event){return _vm.go('next')}}},[_c('SfArrow',{staticClass:"sf-arrow sf-arrow--right sf-arrow--transparent",attrs:{"aria-label":"next"}})],1)],null,{ go: function () { return _vm.go('next'); } })],2):_vm._e(),_vm._ssrNode(" "),(_vm.numberOfPages > 1)?_vm._ssrNode("<div class=\"sf-hero__bullets\">","</div>",[_vm._t("bullets",[_c('SfBullets',{attrs:{"total":_vm.numberOfPages,"current":_vm.page - 1},on:{"click":function($event){return _vm.go($event)}}})],null,{ numberOfPages: _vm.numberOfPages, page: _vm.page, go: _vm.go })],2):_vm._e()],2)}
var SfHerovue_type_template_id_2dd65658_staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfHero/SfHero.vue?vue&type=template&id=2dd65658&

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(3);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfHero/_internal/SfHeroItem.vue?vue&type=template&id=28fdd8ce&
var SfHeroItemvue_type_template_id_28fdd8ce_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"glide__slide sf-hero-item",style:(_vm.style)},[_vm._ssrNode("<div class=\"sf-hero-item__container\">","</div>",[_vm._t("subtitle",[(_vm.subtitle)?_c('div',{staticClass:"sf-hero-item__subtitle"},[_vm._v(_vm._s(_vm.subtitle))]):_vm._e()],null,{ subtitle: _vm.subtitle }),_vm._ssrNode(" "),_vm._t("title",[(_vm.title)?_c('h1',{staticClass:"sf-hero-item__title"},[_vm._v(_vm._s(_vm.title))]):_vm._e()],null,{ title: _vm.title }),_vm._ssrNode(" "),_vm._t("call-to-action",[(_vm.buttonText)?_c('div',{staticClass:"sf-hero-item__button"},[_c('SfButton',[_vm._v("\n          "+_vm._s(_vm.buttonText)+"\n        ")])],1):_vm._e()],null,{ buttonText: _vm.buttonText })],2)])}
var SfHeroItemvue_type_template_id_28fdd8ce_staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfHero/_internal/SfHeroItem.vue?vue&type=template&id=28fdd8ce&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue + 4 modules
var SfButton = __webpack_require__(7);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfHero/_internal/SfHeroItem.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SfHeroItemvue_type_script_lang_js_ = ({
  name: "SfHeroItem",
  components: {
    SfButton: SfButton["a" /* default */]
  },
  props: {
    /** Hero item title */
    title: {
      type: String,
      default: ""
    },

    /** Hero item subtitle (at the top) */
    subtitle: {
      type: String,
      default: ""
    },

    /** text that will be displayed inside the button. You can replace the button  with "call-to-action" slot */
    buttonText: {
      type: String,
      default: ""
    },

    /** Background color */
    background: {
      type: String,
      default: ""
    },

    /** Background image path */
    image: {
      type: [Object, String],
      default: ""
    }
  },
  computed: {
    style() {
      const image = this.image;
      const background = this.background;
      return {
        "--_hero-item-background-image": image.mobile ? `url(${image.mobile})` : `url(${image})`,
        "--_hero-item-background-desktop-image": image.desktop && `url(${image.desktop})`,
        "--_hero-item-background-color": background
      };
    }

  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfHero/_internal/SfHeroItem.vue?vue&type=script&lang=js&
 /* harmony default export */ var _internal_SfHeroItemvue_type_script_lang_js_ = (SfHeroItemvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfHero/_internal/SfHeroItem.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  _internal_SfHeroItemvue_type_script_lang_js_,
  SfHeroItemvue_type_template_id_28fdd8ce_render,
  SfHeroItemvue_type_template_id_28fdd8ce_staticRenderFns,
  false,
  null,
  null,
  "1ae6a478"
  
)

/* harmony default export */ var SfHeroItem = (component.exports);
// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfArrow/SfArrow.vue + 4 modules
var SfArrow = __webpack_require__(257);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/atoms/SfBullets/SfBullets.vue?vue&type=template&id=123c08da&
var SfBulletsvue_type_template_id_123c08da_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ol',{staticClass:"sf-bullets"},[_vm._l((_vm.inactiveLeft),function(_,index){return [_vm._t("inactive",[_c('li',{key:index},[_c('SfButton',{staticClass:"sf-button--pure sf-bullet",attrs:{"aria-label":'Go to slide ' + (index + 1)},on:{"click":function($event){return _vm.go(index)}}})],1)],null,{ index: index, go: _vm.go })]}),_vm._ssrNode(" "),_vm._t("active",[_c('li',[_c('SfButton',{staticClass:"sf-button--pure sf-bullet sf-bullet--active",attrs:{"aria-label":"Current slide"}})],1)]),_vm._ssrNode(" "),_vm._l((_vm.inactiveRight),function(_,index){return [_vm._t("inactive",[_c('li',{key:_vm.inactiveLeft + 1 + index},[_c('SfButton',{staticClass:"sf-button--pure sf-bullet",attrs:{"aria-label":'Go to slide ' + (_vm.inactiveLeft + 2 + index)},on:{"click":function($event){return _vm.go(_vm.inactiveLeft + 1 + index)}}})],1)],null,{ index: _vm.inactiveLeft + 1 + index, go: _vm.go })]})],2)}
var SfBulletsvue_type_template_id_123c08da_staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfBullets/SfBullets.vue?vue&type=template&id=123c08da&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/atoms/SfBullets/SfBullets.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SfBulletsvue_type_script_lang_js_ = ({
  name: "SfBullets",
  components: {
    SfButton: SfButton["a" /* default */]
  },
  props: {
    /**
     * Number of bullets in total (active + inactive)
     */
    total: {
      type: Number,
      default: 0
    },

    /**
     * Index of the currently active bullet (0-indexed)
     */
    current: {
      type: Number,
      default: 0
    }
  },
  computed: {
    inactiveRight() {
      return this.total - 1 - this.current;
    },

    inactiveLeft() {
      return this.total - this.inactiveRight - 1;
    }

  },
  methods: {
    go(index) {
      this.$emit("click", index);
    }

  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfBullets/SfBullets.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfBullets_SfBulletsvue_type_script_lang_js_ = (SfBulletsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfBullets/SfBullets.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(362)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var SfBullets_component = Object(componentNormalizer["a" /* default */])(
  SfBullets_SfBulletsvue_type_script_lang_js_,
  SfBulletsvue_type_template_id_123c08da_render,
  SfBulletsvue_type_template_id_123c08da_staticRenderFns,
  false,
  injectStyles,
  null,
  "e5429c9e"
  
)

/* harmony default export */ var SfBullets = (SfBullets_component.exports);
// EXTERNAL MODULE: external "@glidejs/glide"
var glide_ = __webpack_require__(211);
var glide_default = /*#__PURE__*/__webpack_require__.n(glide_);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfHero/SfHero.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





external_vue_default.a.component("SfHeroItem", SfHeroItem);
/* harmony default export */ var SfHerovue_type_script_lang_js_ = ({
  name: "SfHero",
  components: {
    SfArrow: SfArrow["a" /* default */],
    SfBullets: SfBullets
  },
  props: {
    /**
     * Slider options like glide.js (https://glidejs.com/docs/)
     */
    sliderOptions: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      glide: null,
      defaultOptions: {
        type: "slider",
        rewind: true,
        autoplay: 5000,
        perView: 1,
        gap: 0
      }
    };
  },

  computed: {
    mergedOptions() {
      return { ...this.defaultOptions,
        ...this.sliderOptions
      };
    },

    numberOfPages() {
      return this.$slots.default ? this.$slots.default.filter(slot => slot.tag).length : 0;
    },

    page() {
      if (this.glide) {
        return this.glide.index + 1;
      }

      return 1;
    }

  },

  mounted() {
    if (this.numberOfPages) {
      this.$nextTick(() => {
        if (!this.$slots.default) return;
        const glide = new glide_default.a(this.$refs.glide, this.mergedOptions);
        glide.mount();
        this.glide = glide;
      });
    }
  },

  methods: {
    go(direct) {
      if (!this.glide) return;

      switch (direct) {
        case "prev":
          this.glide.go("<");
          break;

        case "next":
          this.glide.go(">");
          break;

        default:
          this.glide.go(`=${direct}`);
          break;
      }
    }

  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfHero/SfHero.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfHero_SfHerovue_type_script_lang_js_ = (SfHerovue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfHero/SfHero.vue



function SfHero_injectStyles (context) {
  
  var style0 = __webpack_require__(364)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var SfHero_component = Object(componentNormalizer["a" /* default */])(
  SfHero_SfHerovue_type_script_lang_js_,
  SfHerovue_type_template_id_2dd65658_render,
  SfHerovue_type_template_id_2dd65658_staticRenderFns,
  false,
  SfHero_injectStyles,
  null,
  "23d641b2"
  
)

/* harmony default export */ var SfHero = (SfHero_component.exports);
// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfBanner/SfBanner.vue + 4 modules
var SfBanner = __webpack_require__(389);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfCallToAction/SfCallToAction.vue + 4 modules
var SfCallToAction = __webpack_require__(387);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfSection/SfSection.vue + 4 modules
var SfSection = __webpack_require__(388);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfCarousel/SfCarousel.vue + 9 modules
var SfCarousel = __webpack_require__(385);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfProductCard/SfProductCard.vue + 4 modules
var SfProductCard = __webpack_require__(220);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfImage/SfImage.vue + 4 modules
var SfImage = __webpack_require__(20);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfBannerGrid/SfBannerGrid.vue?vue&type=template&id=71b3afb1&
var SfBannerGridvue_type_template_id_71b3afb1_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sf-banner-grid"},[(_vm.bannerGrid === 1)?[_vm._ssrNode("<div class=\"sf-banner-grid__row\">","</div>",[_vm._ssrNode("<div class=\"sf-banner-grid__col\">","</div>",[_vm._t("banner-A")],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"sf-banner-grid__col sf-banner-grid__col--medium\">","</div>",[_vm._t("banner-B")],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"sf-banner-grid__col\">","</div>",[_vm._ssrNode("<div class=\"sf-banner-grid__row\">","</div>",[_vm._ssrNode("<div class=\"sf-banner-grid__col\">","</div>",[_vm._t("banner-C")],2)]),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"sf-banner-grid__row\">","</div>",[_vm._ssrNode("<div class=\"sf-banner-grid__col\">","</div>",[_vm._t("banner-D")],2)])],2)],2)]:_vm._e(),_vm._ssrNode(" "),(_vm.bannerGrid === 2)?[_vm._ssrNode("<div class=\"sf-banner-grid__row\">","</div>",[_vm._ssrNode("<div class=\"sf-banner-grid__col sf-banner-grid__col--small\">","</div>",[_vm._t("banner-A")],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"sf-banner-grid__col\">","</div>",[_vm._ssrNode("<div class=\"sf-banner-grid__row\">","</div>",[_vm._ssrNode("<div class=\"sf-banner-grid__col sf-banner-grid__col--higher\">","</div>",[_vm._t("banner-B")],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"sf-banner-grid__col sf-banner-grid__col--higher\">","</div>",[_vm._t("banner-C")],2)],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"sf-banner-grid__row\">","</div>",[_vm._ssrNode("<div class=\"sf-banner-grid__col\">","</div>",[_vm._t("banner-D")],2)])],2)],2)]:_vm._e()],2)}
var SfBannerGridvue_type_template_id_71b3afb1_staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfBannerGrid/SfBannerGrid.vue?vue&type=template&id=71b3afb1&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfBannerGrid/SfBannerGrid.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var SfBannerGridvue_type_script_lang_js_ = ({
  name: "SfBannerGrid",
  props: {
    bannerGrid: {
      type: Number,
      default: 1
    }
  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfBannerGrid/SfBannerGrid.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfBannerGrid_SfBannerGridvue_type_script_lang_js_ = (SfBannerGridvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfBannerGrid/SfBannerGrid.vue



function SfBannerGrid_injectStyles (context) {
  
  var style0 = __webpack_require__(366)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var SfBannerGrid_component = Object(componentNormalizer["a" /* default */])(
  SfBannerGrid_SfBannerGridvue_type_script_lang_js_,
  SfBannerGridvue_type_template_id_71b3afb1_render,
  SfBannerGridvue_type_template_id_71b3afb1_staticRenderFns,
  false,
  SfBannerGrid_injectStyles,
  null,
  "f943029c"
  
)

/* harmony default export */ var SfBannerGrid = (SfBannerGrid_component.exports);
// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfHeading/SfHeading.vue + 4 modules
var SfHeading = __webpack_require__(28);

// EXTERNAL MODULE: ./_theme/components/InstagramFeed.vue + 4 modules
var InstagramFeed = __webpack_require__(296);

// EXTERNAL MODULE: ./_theme/components/MobileStoreBanner.vue + 4 modules
var MobileStoreBanner = __webpack_require__(297);

// EXTERNAL MODULE: external "vue-lazy-hydration"
var external_vue_lazy_hydration_ = __webpack_require__(39);
var external_vue_lazy_hydration_default = /*#__PURE__*/__webpack_require__.n(external_vue_lazy_hydration_);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/Home.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var Homevue_type_script_lang_js_ = ({
  name: 'Home',
  components: {
    InstagramFeed: InstagramFeed["a" /* default */],
    SfHero: SfHero,
    SfBanner: SfBanner["a" /* default */],
    SfCallToAction: SfCallToAction["a" /* default */],
    SfSection: SfSection["a" /* default */],
    SfCarousel: SfCarousel["a" /* default */],
    SfProductCard: SfProductCard["a" /* default */],
    SfImage: SfImage["a" /* default */],
    SfBannerGrid: SfBannerGrid,
    SfHeading: SfHeading["a" /* default */],
    SfArrow: SfArrow["a" /* default */],
    SfButton: SfButton["a" /* default */],
    MobileStoreBanner: MobileStoreBanner["a" /* default */],
    LazyHydrate: external_vue_lazy_hydration_default.a
  },

  data() {
    return {
      heroes: [{
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        buttonText: 'Learn more',
        background: '#eceff1',
        image: '/homepage/bannerH.webp',
        link: '/c/women/women-clothing-shirts'
      }, {
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        buttonText: 'Learn more',
        background: '#efebe9',
        image: '/homepage/bannerA.webp',
        link: '/c/women/women-shoes-sandals',
        className: 'sf-hero-item--position-bg-top-left sf-hero-item--align-right'
      }, {
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        buttonText: 'Learn more',
        background: '#fce4ec',
        image: '/homepage/bannerB.webp',
        link: '/c/women/women-clothing-dresses'
      }],
      banners: [{
        slot: 'banner-A',
        subtitle: 'Dresses',
        title: 'Cocktail & Party',
        description: 'Find stunning women\'s cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.',
        buttonText: 'Shop now',
        image: {
          mobile: '/homepage/bannerB.webp',
          desktop: '/homepage/bannerF.webp'
        },
        class: 'sf-banner--slim desktop-only',
        link: '/c/women/women-clothing-skirts'
      }, {
        slot: 'banner-B',
        subtitle: 'Dresses',
        title: 'Linen Dresses',
        description: 'Find stunning women\'s cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.',
        buttonText: 'Shop now',
        image: '/homepage/bannerE.webp',
        class: 'sf-banner--slim banner-central desktop-only',
        link: '/c/women/women-clothing-dresses'
      }, {
        slot: 'banner-C',
        subtitle: 'T-Shirts',
        title: 'The Office Life',
        image: '/homepage/bannerC.webp',
        class: 'sf-banner--slim banner__tshirt',
        link: '/c/women/women-clothing-shirts'
      }, {
        slot: 'banner-D',
        subtitle: 'Summer Sandals',
        title: 'Eco Sandals',
        image: '/homepage/bannerG.webp',
        class: 'sf-banner--slim',
        link: '/c/women/women-shoes-sandals'
      }],
      products: [{
        title: 'Cream Beach Bag',
        image: '/homepage/productA.webp',
        price: {
          regular: '50.00 $'
        },
        rating: {
          max: 5,
          score: 4
        },
        isOnWishlist: true
      }, {
        title: 'Cream Beach Bag',
        image: '/homepage/productB.webp',
        price: {
          regular: '50.00 $'
        },
        rating: {
          max: 5,
          score: 4
        },
        isOnWishlist: false
      }, {
        title: 'Cream Beach Bag',
        image: '/homepage/productC.webp',
        price: {
          regular: '50.00 $'
        },
        rating: {
          max: 5,
          score: 4
        },
        isOnWishlist: false
      }, {
        title: 'Cream Beach Bag',
        image: '/homepage/productA.webp',
        price: {
          regular: '50.00 $'
        },
        rating: {
          max: 5,
          score: 4
        },
        isOnWishlist: false
      }, {
        title: 'Cream Beach Bag',
        image: '/homepage/productB.webp',
        price: {
          regular: '50.00 $'
        },
        rating: {
          max: 5,
          score: 4
        },
        isOnWishlist: false
      }, {
        title: 'Cream Beach Bag',
        image: '/homepage/productC.webp',
        price: {
          regular: '50.00 $'
        },
        rating: {
          max: 5,
          score: 4
        },
        isOnWishlist: false
      }, {
        title: 'Cream Beach Bag',
        image: '/homepage/productA.webp',
        price: {
          regular: '50.00 $'
        },
        rating: {
          max: 5,
          score: 4
        },
        isOnWishlist: false
      }, {
        title: 'Cream Beach Bag',
        image: '/homepage/productB.webp',
        price: {
          regular: '50.00 $'
        },
        rating: {
          max: 5,
          score: 4
        },
        isOnWishlist: false
      }]
    };
  },

  methods: {
    toggleWishlist(index) {
      this.products[index].isOnWishlist = !this.products[index].isOnWishlist;
    }

  }
});
// CONCATENATED MODULE: ./_theme/pages/Home.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Homevue_type_script_lang_js_ = (Homevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./_theme/pages/Home.vue



function Home_injectStyles (context) {
  
  var style0 = __webpack_require__(368)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var Home_component = Object(componentNormalizer["a" /* default */])(
  pages_Homevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  Home_injectStyles,
  "66416bee",
  "2a325b7a"
  
)

/* harmony default export */ var Home = __webpack_exports__["default"] = (Home_component.exports);

/***/ })

};;
//# sourceMappingURL=15.js.map