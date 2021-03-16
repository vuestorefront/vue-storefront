exports.ids = [18];
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

/***/ 308:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(355);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("2094628a", content, true, context)
};

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Payment_vue_vue_type_style_index_0_id_4960512e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(308);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Payment_vue_vue_type_style_index_0_id_4960512e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Payment_vue_vue_type_style_index_0_id_4960512e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Payment_vue_vue_type_style_index_0_id_4960512e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Payment_vue_vue_type_style_index_0_id_4960512e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only[data-v-4960512e]{display:none!important}}@media (max-width:1023px){.desktop-only[data-v-4960512e]{display:none!important}}.title[data-v-4960512e]{margin:var(--spacer-xl) 0 var(--spacer-base) 0}.form__select[data-v-4960512e]{display:flex;align-items:center;--select-option-font-size:var(--font-size--lg)}.form__select[data-v-4960512e]  .sf-select__dropdown{font-size:var(--font-size--lg);margin:0;color:var(--c-text);font-family:var(--font-family--secondary);font-weight:var(--font-weight--normal)}@media (min-width:1024px){.form[data-v-4960512e]{display:flex;flex-wrap:wrap;align-items:center}}.form__element[data-v-4960512e]{margin:0 0 var(--spacer-base) 0}@media (min-width:1024px){.form__element[data-v-4960512e]{flex:0 0 100%}}@media (min-width:1024px){.form__element--half[data-v-4960512e]{flex:1 1 50%}}@media (min-width:1024px){.form__element--half-even[data-v-4960512e]{padding:0 0 0 var(--spacer-xl)}}@media (min-width:1024px){.form__action[data-v-4960512e]{flex:0 0 100%;display:flex}}.form__action-button[data-v-4960512e],.form__back-button[data-v-4960512e]{--button-width:100%}@media (min-width:1024px){.form__action-button[data-v-4960512e],.form__back-button[data-v-4960512e]{--button-width:auto}}.form__action-button[data-v-4960512e]{margin:0 var(--spacer-xl) 0 0}.form__back-button[data-v-4960512e]{margin:0 0 var(--spacer-sm) 0}@media (min-width:1024px){.form__back-button[data-v-4960512e]{margin:0 var(--spacer-xl) 0 0}}.form__radio-group[data-v-4960512e]{flex:0 0 100%;margin:0 0 var(--spacer-2xl) 0}@media (min-width:1024px){.payment-methods[data-v-4960512e]{display:flex;padding:var(--spacer-lg) 0;border:1px solid var(--c-light);border-width:1px 0}}.payment-method[data-v-4960512e]{--radio-container-align-items:center;--ratio-content-margin:0 0 0 var(--spacer-base);--radio-label-font-size:var(--font-size--base);--radio-background:transparent;white-space:nowrap;border:solid var(--c-light);border-width:1px 0 0}.payment-method[data-v-4960512e]:last-child{border-width:1px 0}@media (min-width:1024px){.payment-method[data-v-4960512e]{border:0;--radio-border-radius:4px}}", ""]);
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

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/Checkout/Payment.vue?vue&type=template&id=4960512e&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('SfHeading',{staticClass:"sf-heading--left sf-heading--no-underline title",attrs:{"level":3,"title":"Billing address"}}),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"form\" data-v-4960512e>","</div>",[_c('SfCheckbox',{staticClass:"form__element",attrs:{"label":"Copy address data from shipping","name":"copyShippingAddress"},model:{value:(_vm.sameAsShipping),callback:function ($$v) {_vm.sameAsShipping=$$v},expression:"sameAsShipping"}}),_vm._ssrNode(" "),_c('SfInput',{staticClass:"form__element form__element--half",attrs:{"data-cy":"payment-input_firstName","label":"First name","name":"firstName","required":""},model:{value:(_vm.billingDetails.firstName),callback:function ($$v) {_vm.$set(_vm.billingDetails, "firstName", $$v)},expression:"billingDetails.firstName"}}),_vm._ssrNode(" "),_c('SfInput',{staticClass:"form__element form__element--half form__element--half-even",attrs:{"data-cy":"payment-input_lastName","label":"Last name","name":"lastName","required":""},model:{value:(_vm.billingDetails.lastName),callback:function ($$v) {_vm.$set(_vm.billingDetails, "lastName", $$v)},expression:"billingDetails.lastName"}}),_vm._ssrNode(" "),_c('SfInput',{staticClass:"form__element",attrs:{"data-cy":"payment-input_streetName","label":"Street name","name":"streetName","required":""},model:{value:(_vm.billingDetails.streetName),callback:function ($$v) {_vm.$set(_vm.billingDetails, "streetName", $$v)},expression:"billingDetails.streetName"}}),_vm._ssrNode(" "),_c('SfInput',{staticClass:"form__element",attrs:{"data-cy":"payment-input_apartment","label":"House/Apartment number","name":"apartment","required":""},model:{value:(_vm.billingDetails.apartment),callback:function ($$v) {_vm.$set(_vm.billingDetails, "apartment", $$v)},expression:"billingDetails.apartment"}}),_vm._ssrNode(" "),_c('SfInput',{staticClass:"form__element form__element--half",attrs:{"data-cy":"payment-input_","label":"City","name":"city","required":""},model:{value:(_vm.billingDetails.city),callback:function ($$v) {_vm.$set(_vm.billingDetails, "city", $$v)},expression:"billingDetails.city"}}),_vm._ssrNode(" "),_c('SfInput',{staticClass:"form__element form__element--half form__element--half-even",attrs:{"data-cy":"payment-input_state","label":"State/Province","name":"state","required":""},model:{value:(_vm.billingDetails.state),callback:function ($$v) {_vm.$set(_vm.billingDetails, "state", $$v)},expression:"billingDetails.state"}}),_vm._ssrNode(" "),_c('SfInput',{staticClass:"form__element form__element--half",attrs:{"data-cy":"payment-input_postalCode","label":"Zip-code","name":"zipCode","required":""},model:{value:(_vm.billingDetails.postalCode),callback:function ($$v) {_vm.$set(_vm.billingDetails, "postalCode", $$v)},expression:"billingDetails.postalCode"}}),_vm._ssrNode(" "),_c('SfSelect',{staticClass:"form__element form__element--half form__element--half-even form__select sf-select--underlined",attrs:{"data-cy":"payment-select_billingDetails","label":"Country","required":""},model:{value:(_vm.billingDetails.country),callback:function ($$v) {_vm.$set(_vm.billingDetails, "country", $$v)},expression:"billingDetails.country"}},_vm._l((_vm.COUNTRIES),function(countryOption){return _c('SfSelectOption',{key:countryOption.key,attrs:{"value":countryOption.key}},[_vm._v("\n        "+_vm._s(countryOption.label)+"\n      ")])}),1),_vm._ssrNode(" "),_c('SfInput',{staticClass:"form__element",attrs:{"data-cy":"payment-input_phone","label":"Phone number","name":"phone","required":""},model:{value:(_vm.billingDetails.phone),callback:function ($$v) {_vm.$set(_vm.billingDetails, "phone", $$v)},expression:"billingDetails.phone"}})],2),_vm._ssrNode(" "),_c('SfHeading',{staticClass:"sf-heading--left sf-heading--no-underline title",attrs:{"level":3,"title":"Payment methods"}}),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"form\" data-v-4960512e>","</div>",[_vm._ssrNode("<div class=\"form__element payment-methods\" data-v-4960512e>","</div>",_vm._l((_vm.paymentMethods),function(item){return _c('SfRadio',{key:item.value,staticClass:"form__radio payment-method",attrs:{"data-cy":"payment-radio_paymentMethod","label":item.label,"value":item.value,"name":"paymentMethod","description":item.description},scopedSlots:_vm._u([{key:"label",fn:function(){return [_c('div',{staticClass:"sf-radio__label"},[_vm._v("\n            "+_vm._s(item.label)+"\n          ")])]},proxy:true}],null,true),model:{value:(_vm.chosenPaymentMethod),callback:function ($$v) {_vm.chosenPaymentMethod=$$v},expression:"chosenPaymentMethod"}})}),1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"form__action\" data-v-4960512e>","</div>",[_c('SfButton',{staticClass:"color-secondary form__back-button",attrs:{"data-cy":"payment-btn_go-back"}},[_vm._v("\n        "+_vm._s(_vm.$t('Go back'))+"\n      ")]),_vm._ssrNode(" "),_c('SfButton',{staticClass:"form__action-button",attrs:{"data-cy":"payment-btn_review"},on:{"click":function($event){return _vm.$emit('nextStep')}}},[_vm._v("\n        "+_vm._s(_vm.$t('Pay for order'))+"\n      ")])],2)],2)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./_theme/pages/Checkout/Payment.vue?vue&type=template&id=4960512e&scoped=true&

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

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfImage/SfImage.vue + 4 modules
var SfImage = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfCheckbox/SfCheckbox.vue + 4 modules
var SfCheckbox = __webpack_require__(214);

// EXTERNAL MODULE: external "@vue/composition-api"
var composition_api_ = __webpack_require__(2);

// EXTERNAL MODULE: ../composables/lib/index.es.js
var index_es = __webpack_require__(8);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/Checkout/Payment.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
/* harmony default export */ var Paymentvue_type_script_lang_js_ = ({
  name: 'Payment',
  components: {
    SfHeading: SfHeading["a" /* default */],
    SfInput: SfInput["a" /* default */],
    SfButton: SfButton["a" /* default */],
    SfSelect: SfSelect["a" /* default */],
    SfRadio: SfRadio["a" /* default */],
    SfImage: SfImage["a" /* default */],
    SfCheckbox: SfCheckbox["a" /* default */]
  },

  setup(props, context) {
    context.emit('changeStep', 2);
    const {
      billingDetails,
      shippingDetails,
      paymentMethods,
      chosenPaymentMethod
    } = Object(index_es["i" /* useCheckout */])();
    const sameAsShipping = Object(composition_api_["ref"])(false);
    Object(composition_api_["watch"])(sameAsShipping, () => {
      if (sameAsShipping.value) {
        billingDetails.value = { ...shippingDetails.value
        };
      } else {
        billingDetails.value = Object.keys(billingDetails.value).reduce((prev, curr) => ({ ...prev,
          [curr]: ''
        }), {});
      }
    });
    return {
      billingDetails,
      paymentMethods,
      chosenPaymentMethod,
      sameAsShipping,
      COUNTRIES
    };
  }

});
// CONCATENATED MODULE: ./_theme/pages/Checkout/Payment.vue?vue&type=script&lang=js&
 /* harmony default export */ var Checkout_Paymentvue_type_script_lang_js_ = (Paymentvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./_theme/pages/Checkout/Payment.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(354)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Checkout_Paymentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "4960512e",
  "76d31938"
  
)

/* harmony default export */ var Payment = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=18.js.map