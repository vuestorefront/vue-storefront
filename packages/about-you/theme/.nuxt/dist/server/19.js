exports.ids = [19];
exports.modules = {

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(267);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("e44ee842", content, true, context)
};

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfRadio_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(242);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfRadio_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfRadio_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfRadio_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfRadio_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}.sf-radio{display:flex;display:var(--radio-display,flex);transition:background-color .25s cubic-bezier(1,.5,.8,1);transition:var(--radio-transition,background-color .25s cubic-bezier(1,.5,.8,1))}.sf-radio__label{display:flex;display:var(--radio-label-display,flex);font:var(--font-normal) var(--h4-font-size)/normal var(--font-family-secondary);font:var(--radio-label-font,var(--radio-label-font-weight,var(--font-normal)) var(--radio-label-font-size,var(--h4-font-size))/var(--radio-label-font-line-height,normal) var(--radio-label-font-family,var(--font-family-secondary)));color:var(--radio-label-color)}.sf-radio__checkmark{box-sizing:border-box;width:1.5rem;width:var(--radio-checkmark-size,1.5rem);height:1.5rem;height:var(--radio-checkmark-size,1.5rem);border:var(--radio-checkmark-border,var(--radio-checkmark-border-style,solid) var(--radio-checkmark-border-color,var(--c-gray-variant)));border-width:1px;border-width:var(--radio-checkmark-border-width,1px);border-radius:100%;border-radius:var(--radio-checkmark-border-radius,100%);transition:border .25s cubic-bezier(1,.5,.8,1);transition:var(--radio-checkmark-transition,border .25s cubic-bezier(1,.5,.8,1))}.sf-radio--is-active .sf-radio__checkmark{--radio-checkmark-border-width:9px;--radio-checkmark-border-color:var(--c-primary)}.sf-radio input{position:absolute;opacity:0;left:-1000%;width:1px;height:1px}.sf-radio input[style*=\"outline: none\"]:focus+.sf-radio__checkmark{outline:none}.sf-radio input:focus+.sf-radio__checkmark{outline-color:-webkit-focus-ring-color;outline-style:auto}.sf-radio__container{position:relative;display:flex;display:var(--radio-container-display,flex);align-items:var(--radio-container-align-items);flex:1;padding:var(--radio-container-padding,var(--spacer-sm) var(--spacer-lg) var(--spacer-sm) var(--spacer-sm));cursor:pointer;cursor:var(--radio-container-cursor,pointer)}.sf-radio:hover{--radio-checkmark-border-color:var(--c-primary)}.sf-radio__content{flex:1;margin:var(--radio-content-margin,0 0 0 var(--spacer-sm))}.sf-radio__details{margin:var(--radio-details-margin,var(--spacer-xs) 0 0 0);color:var(--c-text-muted);color:var(--radio-details-color,var(--c-text-muted));font:var(--font-light) var(--font-xs)/1.2 var(--font-family-secondary);font:var(--radio-details-font,var(--radio-details-font-weight,var(--font-light)) var(--radio-details-font-size,var(--font-xs))/var(--radio-details-font-line-height,1.2) var(--radio-details-font-family,var(--font-family-secondary)))}.sf-radio__description{margin:var(--radio-description-margin,var(--spacer-xs) 0 0 0);font:var(--font-light) var(--font-xs)/1.6 var(--font-family-primary);font:var(--radio-description-font,var(--radio-description-font-weight,var(--font-light)) var(--radio-description-font-size,var(--font-xs))/var(--radio-description-font-line-height,1.6) var(--radio-description-font-family,var(--font-family-primary)));color:var(--radio-description-margin)}.sf-radio--is-active{background:var(--c-light);background:var(--radio-background,var(--c-light))}.sf-radio.is-disabled{--radio-checkmark-border-color:var(--c-text-disabled);--radio-details-color:var(--c-text-disabled);--radio-description-margin:var(--c-text-disabled);--radio-label-color:var(--c-text-disabled);--radio-container-cursor:default}.sf-radio.is-disabled:hover{--radio-checkmark-border-color:var(--c-text-disabled)}.sf-radio--transparent.sf-radio--is-active{--radio-background:transparent}@media (min-width:1024px){.sf-radio{--radio-container-padding:var(--spacer-sm)}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(359);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("770ec54b", content, true, context)
};

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Shipping_vue_vue_type_style_index_0_id_0c91de6e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(310);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Shipping_vue_vue_type_style_index_0_id_0c91de6e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Shipping_vue_vue_type_style_index_0_id_0c91de6e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Shipping_vue_vue_type_style_index_0_id_0c91de6e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Shipping_vue_vue_type_style_index_0_id_0c91de6e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only[data-v-0c91de6e]{display:none!important}}@media (max-width:1023px){.desktop-only[data-v-0c91de6e]{display:none!important}}.title[data-v-0c91de6e]{margin:var(--spacer-xl) 0 var(--spacer-base) 0}.form__select[data-v-0c91de6e]{display:flex;align-items:center;--select-option-font-size:var(--font-size--lg)}.form__select[data-v-0c91de6e]  .sf-select__dropdown{font-size:var(--font-size--lg);margin:0;color:var(--c-text);font-family:var(--font-family--secondary);font-weight:var(--font-weight--normal)}@media (min-width:1024px){.form[data-v-0c91de6e]{display:flex;flex-wrap:wrap;align-items:center}}.form__element[data-v-0c91de6e]{margin:0 0 var(--spacer-base) 0}@media (min-width:1024px){.form__element[data-v-0c91de6e]{flex:0 0 100%}}@media (min-width:1024px){.form__element--half[data-v-0c91de6e]{flex:1 1 50%}}@media (min-width:1024px){.form__element--half-even[data-v-0c91de6e]{padding:0 0 0 var(--spacer-xl)}}.form__group[data-v-0c91de6e]{display:flex;align-items:center}@media (min-width:1024px){.form__action[data-v-0c91de6e]{flex:0 0 100%;display:flex}}.form__action-button[data-v-0c91de6e],.form__back-button[data-v-0c91de6e]{--button-width:100%}@media (min-width:1024px){.form__action-button[data-v-0c91de6e],.form__back-button[data-v-0c91de6e]{--button-width:auto}}.form__action-button[data-v-0c91de6e]{margin:0 var(--spacer-xl) 0 0}.form__back-button[data-v-0c91de6e]{margin:0 0 var(--spacer-sm) 0}@media (min-width:1024px){.form__back-button[data-v-0c91de6e]{margin:0 var(--spacer-xl) 0 0}}.form__radio-group[data-v-0c91de6e]{flex:0 0 100%;margin:0 0 var(--spacer-2xl) var(--spacer-base)}.shipping[data-v-0c91de6e]{margin:0 calc(var(--spacer-xl)*-1)}.shipping__label[data-v-0c91de6e]{display:flex;justify-content:space-between}.shipping__description[data-v-0c91de6e]{--radio-description-margin:0;--radio-description-font-size:var(--font-size--xs)}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/molecules/SfRadio/SfRadio.vue?vue&type=template&id=fbea212c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sf-radio",class:{
    'sf-radio--is-active': _vm.isChecked,
    'is-disabled': _vm.disabled,
  }},[_vm._ssrNode("<label class=\"sf-radio__container\">","</label>",[_c('input',{directives:[{name:"focus",rawName:"v-focus"}],attrs:{"type":"radio","name":_vm.name,"disabled":_vm.disabled},domProps:{"value":_vm.value,"checked":_vm.isChecked},on:{"input":_vm.inputHandler}},[]),_vm._ssrNode(" "),_vm._t("checkmark",[_c('div',{staticClass:"sf-radio__checkmark",class:{ 'sf-radio__checkmark--is-active': _vm.isChecked }})],null,{ isChecked: _vm.isChecked, disabled: _vm.disabled }),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"sf-radio__content\">","</div>",[_vm._t("label",[(_vm.label)?_c('div',{staticClass:"sf-radio__label"},[_vm._v(_vm._s(_vm.label))]):_vm._e()],null,{ label: _vm.label, isChecked: _vm.isChecked, disabled: _vm.disabled }),_vm._ssrNode(" "),_vm._t("details",[(_vm.details)?_c('p',{staticClass:"sf-radio__details"},[_vm._v("\n          "+_vm._s(_vm.details)+"\n        ")]):_vm._e()],null,{ details: _vm.details }),_vm._ssrNode(" "),_vm._t("description",[(_vm.description)?_c('p',{staticClass:"sf-radio__description"},[_vm._v("\n          "+_vm._s(_vm.description)+"\n        ")]):_vm._e()],null,{ description: _vm.description })],2)],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfRadio/SfRadio.vue?vue&type=template&id=fbea212c&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/utilities/directives/focus/focus-directive.js
var focus_directive = __webpack_require__(215);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/molecules/SfRadio/SfRadio.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SfRadiovue_type_script_lang_js_ = ({
  name: "SfRadio",
  directives: {
    focus: focus_directive["a" /* focus */]
  },
  model: {
    prop: "selected",
    event: "input"
  },
  props: {
    name: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    details: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: String,
      default: ""
    }
  },
  computed: {
    isChecked() {
      return this.value === this.selected;
    }

  },
  methods: {
    inputHandler() {
      this.$emit("input", this.value);
    }

  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfRadio/SfRadio.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfRadio_SfRadiovue_type_script_lang_js_ = (SfRadiovue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfRadio/SfRadio.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(266)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  SfRadio_SfRadiovue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "307a4ff0"
  
)

/* harmony default export */ var SfRadio = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/Checkout/Shipping.vue?vue&type=template&id=0c91de6e&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('SfHeading',{staticClass:"sf-heading--left sf-heading--no-underline title",attrs:{"level":3,"title":"Shipping"}}),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"form\" data-v-0c91de6e>","</div>",[_c('SfInput',{staticClass:"form__element form__element--half",attrs:{"data-cy":"shipping-details-input_firstName","label":"First name","name":"firstName","required":""},model:{value:(_vm.shippingDetails.firstName),callback:function ($$v) {_vm.$set(_vm.shippingDetails, "firstName", $$v)},expression:"shippingDetails.firstName"}}),_vm._ssrNode(" "),_c('SfInput',{staticClass:"form__element form__element--half form__element--half-even",attrs:{"data-cy":"shipping-details-input_lastName","label":"Last name","name":"lastName","required":""},model:{value:(_vm.shippingDetails.lastName),callback:function ($$v) {_vm.$set(_vm.shippingDetails, "lastName", $$v)},expression:"shippingDetails.lastName"}}),_vm._ssrNode(" "),_c('SfInput',{staticClass:"form__element",attrs:{"data-cy":"shipping-details-input_streetName","label":"Street name","name":"streetName","required":""},model:{value:(_vm.shippingDetails.streetName),callback:function ($$v) {_vm.$set(_vm.shippingDetails, "streetName", $$v)},expression:"shippingDetails.streetName"}}),_vm._ssrNode(" "),_c('SfInput',{staticClass:"form__element",attrs:{"data-cy":"shipping-details-input_apartmanet","label":"House/Apartment number","name":"apartment","required":""},model:{value:(_vm.shippingDetails.apartment),callback:function ($$v) {_vm.$set(_vm.shippingDetails, "apartment", $$v)},expression:"shippingDetails.apartment"}}),_vm._ssrNode(" "),_c('SfInput',{staticClass:"form__element form__element--half",attrs:{"data-cy":"shipping-details-input_city","label":"City","name":"city","required":""},model:{value:(_vm.shippingDetails.city),callback:function ($$v) {_vm.$set(_vm.shippingDetails, "city", $$v)},expression:"shippingDetails.city"}}),_vm._ssrNode(" "),_c('SfInput',{staticClass:"form__element form__element--half form__element--half-even",attrs:{"data-cy":"shipping-details-input_state","label":"State/Province","name":"state","required":""},model:{value:(_vm.shippingDetails.state),callback:function ($$v) {_vm.$set(_vm.shippingDetails, "state", $$v)},expression:"shippingDetails.state"}}),_vm._ssrNode(" "),_c('SfInput',{staticClass:"form__element form__element--half",attrs:{"data-cy":"shipping-details-input_postalCode","label":"Zip-code","name":"zipCode","required":""},model:{value:(_vm.shippingDetails.postalCode),callback:function ($$v) {_vm.$set(_vm.shippingDetails, "postalCode", $$v)},expression:"shippingDetails.postalCode"}}),_vm._ssrNode(" "),_c('SfSelect',{staticClass:"form__element form__element--half form__element--half-even form__select sf-select--underlined",attrs:{"data-cy":"shipping-details-select_country","label":"Country","required":""},model:{value:(_vm.shippingDetails.country),callback:function ($$v) {_vm.$set(_vm.shippingDetails, "country", $$v)},expression:"shippingDetails.country"}},_vm._l((_vm.COUNTRIES),function(countryOption){return _c('SfSelectOption',{key:countryOption.key,attrs:{"value":countryOption.key}},[_vm._v("\n        "+_vm._s(countryOption.label)+"\n      ")])}),1),_vm._ssrNode(" "),_c('SfInput',{staticClass:"form__element",attrs:{"data-cy":"shipping-details-input_phone","label":"Phone number","name":"phone","required":""},model:{value:(_vm.shippingDetails.phone),callback:function ($$v) {_vm.$set(_vm.shippingDetails, "phone", $$v)},expression:"shippingDetails.phone"}})],2),_vm._ssrNode(" "),_c('SfHeading',{staticClass:"sf-heading--left sf-heading--no-underline title",attrs:{"level":3,"title":"Shipping method"}}),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"form\" data-v-0c91de6e>","</div>",[_vm._ssrNode("<div class=\"form__radio-group\" data-v-0c91de6e>","</div>",_vm._l((_vm.shippingMethods),function(item){return _c('SfRadio',{key:_vm.checkoutGetters.getShippingMethodName(item),staticClass:"form__radio shipping",attrs:{"data-cy":"shipping-details-radio_shippingMethod","label":_vm.checkoutGetters.getShippingMethodName(item),"value":_vm.checkoutGetters.getShippingMethodId(item),"selected":_vm.checkoutGetters.getShippingMethodId(_vm.chosenShippingMethod),"name":"shippingMethod","description":_vm.checkoutGetters.getShippingMethodDescription(item)},on:{"input":function () { return _vm.chosenShippingMethod = item; }},scopedSlots:_vm._u([{key:"label",fn:function(ref){
var label = ref.label;
return [_c('div',{staticClass:"sf-radio__label shipping__label"},[_c('div',[_vm._v(_vm._s(label))]),_vm._v(" "),_c('div',[_vm._v("$"+_vm._s(_vm.$n(_vm.checkoutGetters.getShippingMethodPrice(item), 'currency')))])])]}},{key:"description",fn:function(ref){
var description = ref.description;
return [_c('div',{staticClass:"sf-radio__description shipping__description"},[_c('div',{staticClass:"shipping__info"},[_vm._v("\n              "+_vm._s(description)+"\n            ")])])]}}],null,true)})}),1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"form__action\" data-v-0c91de6e>","</div>",[_c('SfButton',{staticClass:"color-secondary form__back-button",attrs:{"data-cy":"shipping-btn_go-back"}},[_vm._v("\n        "+_vm._s(_vm.$t('Go back'))+"\n      ")]),_vm._ssrNode(" "),_c('SfButton',{staticClass:"form__action-button",attrs:{"data-cy":"shipping-btn_continue"},on:{"click":function($event){return _vm.$emit('nextStep')}}},[_vm._v("\n        "+_vm._s(_vm.$t('Continue to payment'))+"\n      ")])],2)],2)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./_theme/pages/Checkout/Shipping.vue?vue&type=template&id=0c91de6e&scoped=true&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfHeading/SfHeading.vue + 4 modules
var SfHeading = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfInput/SfInput.vue + 4 modules
var SfInput = __webpack_require__(97);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue + 4 modules
var SfButton = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfSelect/SfSelect.vue + 9 modules
var SfSelect = __webpack_require__(218);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfRadio/SfRadio.vue + 4 modules
var SfRadio = __webpack_require__(386);

// EXTERNAL MODULE: ../composables/lib/index.es.js
var index_es = __webpack_require__(8);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/Checkout/Shipping.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


const COUNTRIES = [{
  key: 'US',
  label: 'United States'
}, {
  key: 'UK',
  label: 'United Kingdom'
}, {
  key: 'IT',
  label: 'Italy'
}, {
  key: 'PL',
  label: 'Poland'
}];
/* harmony default export */ var Shippingvue_type_script_lang_js_ = ({
  name: 'PersonalDetails',
  components: {
    SfHeading: SfHeading["a" /* default */],
    SfInput: SfInput["a" /* default */],
    SfButton: SfButton["a" /* default */],
    SfSelect: SfSelect["a" /* default */],
    SfRadio: SfRadio["a" /* default */]
  },

  setup(props, context) {
    context.emit('changeStep', 1);
    const {
      shippingDetails,
      chosenShippingMethod,
      shippingMethods
    } = Object(index_es["i" /* useCheckout */])();
    return {
      shippingDetails,
      chosenShippingMethod,
      shippingMethods,
      checkoutGetters: index_es["c" /* checkoutGetters */],
      COUNTRIES
    };
  }

});
// CONCATENATED MODULE: ./_theme/pages/Checkout/Shipping.vue?vue&type=script&lang=js&
 /* harmony default export */ var Checkout_Shippingvue_type_script_lang_js_ = (Shippingvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./_theme/pages/Checkout/Shipping.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(358)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Checkout_Shippingvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "0c91de6e",
  "6c0f54ec"
  
)

/* harmony default export */ var Shipping = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=19.js.map