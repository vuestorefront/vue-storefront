exports.ids = [20];
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

/***/ 311:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(361);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("5ff8f460", content, true, context)
};

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_ThankYou_vue_vue_type_style_index_0_id_649f9b3c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(311);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_ThankYou_vue_vue_type_style_index_0_id_649f9b3c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_ThankYou_vue_vue_type_style_index_0_id_649f9b3c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_ThankYou_vue_vue_type_style_index_0_id_649f9b3c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_ThankYou_vue_vue_type_style_index_0_id_649f9b3c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only[data-v-649f9b3c]{display:none!important}}@media (max-width:1023px){.desktop-only[data-v-649f9b3c]{display:none!important}}#thank-you[data-v-649f9b3c]{box-sizing:border-box}@media (min-width:1024px){#thank-you[data-v-649f9b3c]{max-width:1272px;padding:0 var(--spacer-sm);margin:0 auto}}.heading[data-v-649f9b3c]{--heading-padding:var(--spacer-base) 0}@media (min-width:1024px){.heading[data-v-649f9b3c]{--heading-padding:var(--spacer-sm) 0 var(--spacer-xs) 0}}.paragraph[data-v-649f9b3c]{margin:0;color:var(--c-link);font:var(--font-weight--normal) var(--font-size--base)/1.6 var(--font-family--primary)}@media (min-width:1024px){.paragraph[data-v-649f9b3c]{font-weight:var(--font-weight--light);font-size:var(--font-size--sm);margin-bottom:var(--spacer-lg)}}.banner[data-v-649f9b3c]{--call-to-action-color:var(--c-text);--call-to-action-title-font-size:var(--h2-font-size);--call-to-action-title-font-weight:var(--font-weight--semibold);--call-to-action-text-container-width:50%}@media (min-width:1024px){.banner[data-v-649f9b3c]{margin:0 0 var(--spacer-2xl) 0}}.banner__order-number[data-v-649f9b3c]{display:flex;flex-direction:column;font:var(--font-weight--light) var(--font-size--sm)/1.4 var(--font-family--primary)}@media (min-width:1024px){.banner__order-number[data-v-649f9b3c]{flex-direction:row;font-size:var(--font-size--normal)}}.section[data-v-649f9b3c]{display:flex;flex-direction:column;margin:0 auto}@media (min-width:1024px){.section[data-v-649f9b3c]{flex-direction:row;padding:0;background:var(--c-light)}}.order[data-v-649f9b3c]{background:var(--c-light);padding-bottom:var(--spacer-sm)}@media (min-width:1024px){.order[data-v-649f9b3c]{width:100%;padding:var(--spacer-xl) var(--spacer-xl) var(--spacer-2xl) var(--spacer-2xl)}}.order__heading[data-v-649f9b3c]{--heading-title-font-weight:var(--font-weight--bold)}@media (min-width:1024px){.order__heading[data-v-649f9b3c]{--heading-title-color:var(--c-link);--heading-title-font-weight:var(--font-weight--swemibold)}}@media (max-width:1023px){.order__contact[data-v-649f9b3c],.order__heading[data-v-649f9b3c],.order__paragraph[data-v-649f9b3c]{margin:0;padding-left:var(--spacer-sm);padding-right:var(--spacer-sm)}}.order__contact[data-v-649f9b3c]{padding-bottom:var(--spacer-base);--heading-title-font-size:var(--font-size--lg);--heading-title-font-weight:var(--font-weight--medium)}@media (min-width:1024px){.order__contact[data-v-649f9b3c]{--heading-title-font-size:var(--font-size--base);--heading-title-font-weight:var(--font-weight--normal);padding:0 var(--spacer-sm);border:2px solid var(--c-white);border-width:2px 0}}.order__notifications-button[data-v-649f9b3c]{--button-width:calc(100% - var(--spacer-lg));margin:0 auto}@media (min-width:1024px){.order__notifications-button[data-v-649f9b3c]{margin:var(--spacer-xl) 0 0 0}}.contact[data-v-649f9b3c]{color:var(--c-dark-variant);font:var(--font-weight--light) var(--font-size--base)/1.6 var(--font-family--secondary)}@media (min-width:1024px){.contact[data-v-649f9b3c]{font-weight:var(--font-weight--normal);font-size:var(--font-size--sm)}}.contact__city[data-v-649f9b3c],.contact__name[data-v-649f9b3c],.contact__street[data-v-649f9b3c]{margin:0}.contact__email[data-v-649f9b3c]{margin:var(--spacer-sm) 0 0 0}@media (min-width:1024px){.contact__email[data-v-649f9b3c]{margin-bottom:var(--spacer-sm)}}.contact__city[data-v-649f9b3c],.contact__email[data-v-649f9b3c],.contact__name[data-v-649f9b3c],.contact__street[data-v-649f9b3c]{font-size:var(--font-size--sm)}.additional-info[data-v-649f9b3c]{--heading-title-font-weight:var(--font-weight--bold);padding:0 var(--spacer-sm)}@media (min-width:1024px){.additional-info[data-v-649f9b3c]{--heading-title-color:var(--c-link);--heading-title-font-weight:var(--font-weight--semibold);width:100%;display:flex;flex-direction:column;justify-content:space-between;padding:var(--spacer-xl) var(--spacer-xl) var(--spacer-2xl) var(--spacer-2xl)}}.feedback-button[data-v-649f9b3c]{margin:var(--spacer-xl) 0 var(--spacer-sm) 0}@media (min-width:1024px){.feedback-button[data-v-649f9b3c]{margin:var(--spacer-base) 0 0 0}}.back-button[data-v-649f9b3c]{--button-width:calc(100% - var(--spacer-lg));margin:0 auto var(--spacer-sm) auto}@media (min-width:1024px){.back-button[data-v-649f9b3c]{margin:var(--spacer-xl) auto}}@media (min-width:1024px){.button-size[data-v-649f9b3c]{--button-width:25rem}}", ""]);
// Exports
module.exports = exports;


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

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/Checkout/ThankYou.vue?vue&type=template&id=649f9b3c&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"thank-you"}},[_c('SfCallToAction',{staticClass:"banner",attrs:{"title":"Thank you for your order!","image":{
      mobile: '/thankyou/bannerM.png',
      desktop: '/thankyou/bannerD.png',
    }},scopedSlots:_vm._u([{key:"description",fn:function(){return [_c('div',{staticClass:"banner__order-number"},[_c('span',[_vm._v(_vm._s(_vm.$t('Order No.')))]),_vm._v(" "),_c('strong',[_vm._v(_vm._s(_vm.orderNumber))])])]},proxy:true}])}),_vm._ssrNode(" "),_vm._ssrNode("<section class=\"section\" data-v-649f9b3c>","</section>",[_vm._ssrNode("<div class=\"order\" data-v-649f9b3c>","</div>",[_c('SfHeading',{staticClass:"order__heading heading sf-heading--left",attrs:{"title":"Your Purchase","level":3}}),_vm._ssrNode(" <p class=\"order__paragraph paragraph\" data-v-649f9b3c>"+_vm._ssrEscape("\n        "+_vm._s(_vm.$t('Successful placed order'))+"\n      ")+"</p> "),_vm._ssrNode("<div class=\"order__contact\" data-v-649f9b3c>","</div>",[_c('SfHeading',{staticClass:"heading sf-heading--left sf-heading--no-underline",attrs:{"level":6,"title":"Primary contacts for any questions"}}),_vm._ssrNode(" <div class=\"contact\" data-v-649f9b3c><p class=\"contact__name\" data-v-649f9b3c>"+_vm._ssrEscape(_vm._s(_vm.companyDetails.name))+"</p> <p class=\"contact__street\" data-v-649f9b3c>"+_vm._ssrEscape(_vm._s(_vm.companyDetails.street))+"</p> <p class=\"contact__city\" data-v-649f9b3c>"+_vm._ssrEscape(_vm._s(_vm.companyDetails.city))+"</p> <p class=\"contact__email\" data-v-649f9b3c>"+_vm._ssrEscape(_vm._s(_vm.companyDetails.email))+"</p></div>")],2),_vm._ssrNode(" "),_c('SfButton',{staticClass:"order__notifications-button button-size"},[_vm._v(_vm._s(_vm.$t('Allow order notifications')))])],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"additional-info\" data-v-649f9b3c>","</div>",[_vm._ssrNode("<div data-v-649f9b3c>","</div>",[_c('SfHeading',{staticClass:"heading sf-heading--left",attrs:{"title":"Your Account","level":3}}),_vm._ssrNode(" <p class=\"paragraph\" data-v-649f9b3c>"+_vm._ssrEscape("\n          "+_vm._s(_vm.$t('Info after order'))+"\n        ")+"</p>")],2),_vm._ssrNode(" "),_vm._ssrNode("<div data-v-649f9b3c>","</div>",[_c('SfHeading',{staticClass:"heading sf-heading--left",attrs:{"title":"What can we improve","level":3}}),_vm._ssrNode(" <p class=\"paragraph\" data-v-649f9b3c>"+_vm._ssrEscape("\n          "+_vm._s(_vm.$t('Feedback'))+"\n        ")+"</p> "),_c('SfButton',{staticClass:"feedback-button color-secondary sf-button--full-width button-size"},[_vm._v(_vm._s(_vm.$t('Send my feedback')))])],2)],2)],2),_vm._ssrNode(" "),_c('SfButton',{staticClass:"back-button color-secondary button-size"},[_vm._v(_vm._s(_vm.$t('Go back to shop')))])],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./_theme/pages/Checkout/ThankYou.vue?vue&type=template&id=649f9b3c&scoped=true&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfHeading/SfHeading.vue + 4 modules
var SfHeading = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue + 4 modules
var SfButton = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfCallToAction/SfCallToAction.vue + 4 modules
var SfCallToAction = __webpack_require__(387);

// EXTERNAL MODULE: external "@vue/composition-api"
var composition_api_ = __webpack_require__(2);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/Checkout/ThankYou.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var ThankYouvue_type_script_lang_js_ = ({
  components: {
    SfHeading: SfHeading["a" /* default */],
    SfButton: SfButton["a" /* default */],
    SfCallToAction: SfCallToAction["a" /* default */]
  },

  setup(props, context) {
    context.emit('changeStep', 4);
    const companyDetails = Object(composition_api_["ref"])({
      name: 'Divante Headquarter',
      street: 'St. Dmowskiego 17, 53-534',
      city: 'Wroclaw, Poland',
      email: 'demo@vuestorefront.io'
    });
    const orderNumber = Object(composition_api_["ref"])('80932031-030-00');
    return {
      companyDetails,
      orderNumber
    };
  }

});
// CONCATENATED MODULE: ./_theme/pages/Checkout/ThankYou.vue?vue&type=script&lang=js&
 /* harmony default export */ var Checkout_ThankYouvue_type_script_lang_js_ = (ThankYouvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./_theme/pages/Checkout/ThankYou.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(360)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  Checkout_ThankYouvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "649f9b3c",
  "559d2093"
  
)

/* harmony default export */ var ThankYou = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=20.js.map