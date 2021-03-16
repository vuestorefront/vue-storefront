exports.ids = [4,5,6,7,8,9,10,11];
exports.modules = {

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(230);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("8d552100", content, true, context)
};

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfTabs_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(228);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfTabs_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfTabs_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfTabs_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfTabs_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}.sf-tabs{display:flex;flex-wrap:wrap}.sf-tabs__title{z-index:var(--tabs-title-z-index);display:flex;display:var(--tabs-title-display,flex);box-sizing:border-box;flex:0 0 100%;flex:var(--tabs-title-flex,0 0 100%);justify-content:space-between;margin:var(--tabs-title-margin);padding:var(--tabs-title-padding,var(--spacer-sm));background:var(--tabs-title-background);border:var(--tabs-title-border,var(--tabs-title-border-style,solid) var(--tabs-title-border-color,var(--c-light)));border-width:0 0 1px;border-width:var(--tabs-title-border-width,0 0 1px 0);color:var(--tabs-title-color);transition:color .15s ease-in-out;font:var(--font-normal) var(--h3-font-size)/1.4 var(--font-family-secondary);font:var(--tabs-title-font,var(--tabs-title-font-weight,var(--font-normal)) var(--tabs-title-font-size,var(--h3-font-size))/var(--tabs-title-font-line-height,1.4) var(--tabs-title-font-family,var(--font-family-secondary)))}.sf-tabs__title--active{--tabs-title-border-width:0;--tabs-title-color:var(--c-primary)}.sf-tabs__title--active+.sf-tabs__content{--tabs-content-border-width:var(--tabs-content-border-width,1px 0 0 0)}.sf-tabs__content{flex:0 0 100%;order:var(--tabs-content-order);border:var(--tabs-content-border,var(--tabs-content-border-style,solid) var(--tabs-content-border-color,var(--c-light)));border-width:0;border-width:var(--tabs-content-border-width,0);color:var(--c-text);color:var(--tabs-content-color,var(--c-text));font:var(--font-light) var(--font-base)/1.6 var(--font-family-primary);font:var(--tabs-content-font,var(--tabs-content-font-weight,var(--font-light)) var(--tabs-content-font-size,var(--font-base))/var(--tabs-content-font-line-height,1.6) var(--tabs-content-font-family,var(--font-family-primary)))}.sf-tabs__content__tab{padding:var(--tabs-content-tab-padding,var(--spacer-base) var(--spacer-sm))}.sf-tabs__chevron{display:var(--tabs-chevron-display)}@media (min-width:1024px){.sf-tabs{--tabs-title-z-index:1;--tabs-content-order:1;--tabs-title-flex:0 0 auto;--tabs-title-margin:0 var(--spacer-lg) -2px 0;--tabs-title-padding:var(--spacer-xs) 0;--tabs-title-color:var(--c-text-muted);--tabs-title-font-size:var(--h4-font-size);--tabs-content-tab-padding:var(--spacer-base) 0;--tabs-chevron-display:none}.sf-tabs__title--active{--tabs-title-border-width:0 0 2px 0;--tabs-title-border-color:var(--c-text);--tabs-title-color:var(--c-text)}.sf-tabs__title--active+.sf-tabs__content{--tabs-content-border-width:2px 0 0 0}.sf-tabs__title:hover{--tabs-title-color:var(--c-text)}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(239);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("18592633", content, true, context)
};

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(241);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("d8298068", content, true, context)
};

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/SfTabs.vue?vue&type=template&id=5a2cd795&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sf-tabs"},[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/SfTabs.vue?vue&type=template&id=5a2cd795&

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(3);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/_internal/SfTab.vue?vue&type=template&id=59ef7ed4&
var SfTabvue_type_template_id_59ef7ed4_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Fragment',{staticClass:"sf-tabs__tab"},[_vm._t("title",[_c('SfButton',{staticClass:"sf-button--pure sf-tabs__title",class:{ 'sf-tabs__title--active': _vm.isActive },attrs:{"aria-pressed":_vm.isActive.toString()},on:{"click":_vm.tabClick}},[_vm._v("\n      "+_vm._s(_vm.title)+"\n      "),_c('SfChevron',{staticClass:"sf-tabs__chevron",class:{ 'sf-chevron--right': !_vm.isActive }})],1)],null,{ tabClick: _vm.tabClick, isActive: _vm.isActive, title: _vm.title }),_vm._v(" "),_c('div',{staticClass:"sf-tabs__content"},[(_vm.isActive)?_c('div',{staticClass:"sf-tabs__content__tab"},[(_vm.tabMaxContentHeight)?_c('SfScrollable',{attrs:{"max-content-height":_vm.tabMaxContentHeight,"show-text":_vm.tabShowText,"hide-text":_vm.tabHideText}},[_vm._t("default")],2):_vm._t("default")],2):_vm._e()])],2)}
var SfTabvue_type_template_id_59ef7ed4_staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/_internal/SfTab.vue?vue&type=template&id=59ef7ed4&

// EXTERNAL MODULE: external "vue-fragment"
var external_vue_fragment_ = __webpack_require__(209);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/utilities/helpers/check-environment.js
var check_environment = __webpack_require__(217);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfChevron/SfChevron.vue + 4 modules
var SfChevron = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue + 4 modules
var SfButton = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfScrollable/SfScrollable.vue + 4 modules
var SfScrollable = __webpack_require__(210);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/_internal/SfTab.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var SfTabvue_type_script_lang_js_ = ({
  name: "SfTab",
  components: {
    Fragment: external_vue_fragment_["Fragment"],
    SfChevron: SfChevron["a" /* default */],
    SfScrollable: SfScrollable["a" /* default */],
    SfButton: SfButton["a" /* default */]
  },
  inject: ["tabConfig"],
  props: {
    /**
     * Tab title.
     */
    title: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      isActive: false,
      desktopMin: 1024
    };
  },

  computed: {
    tabMaxContentHeight() {
      return this.tabConfig.tabMaxContentHeight;
    },

    tabShowText() {
      return this.tabConfig.tabShowText;
    },

    tabHideText() {
      return this.tabConfig.tabHideText;
    }

  },
  methods: {
    tabClick() {
      if (!check_environment["a" /* isClient */]) return;
      const width = Math.max(document.documentElement.clientWidth, window.innerWidth);
      if (this.isActive && width > this.desktopMin) return;
      this.$parent.$emit("toggle", this._uid);
    }

  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/_internal/SfTab.vue?vue&type=script&lang=js&
 /* harmony default export */ var _internal_SfTabvue_type_script_lang_js_ = (SfTabvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/_internal/SfTab.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  _internal_SfTabvue_type_script_lang_js_,
  SfTabvue_type_template_id_59ef7ed4_render,
  SfTabvue_type_template_id_59ef7ed4_staticRenderFns,
  false,
  null,
  null,
  "a1e3b1c4"
  
)

/* harmony default export */ var SfTab = (component.exports);
// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/SfTabs.vue?vue&type=script&lang=js&
//
//
//
//
//
//


external_vue_default.a.component("SfTab", SfTab);
/* harmony default export */ var SfTabsvue_type_script_lang_js_ = ({
  name: "SfTabs",
  props: {
    /** Which tab should be open at the beginning  */
    openTab: {
      type: Number,
      default: 1
    },

    /** Max height of visible content  */
    tabMaxContentHeight: {
      type: String,
      default: ""
    },

    /** Text for button showing content  */
    tabShowText: {
      type: String,
      default: "show"
    },

    /** Text for button hiding content  */
    tabHideText: {
      type: String,
      default: "hide"
    }
  },

  mounted() {
    this.$on("toggle", this.toggle);
    if (this.openTab) this.openChild();
  },

  methods: {
    toggle(id) {
      this.$children.forEach(child => {
        child._uid === id ? child.isActive = !child.isActive : child.isActive = false;
      });
    },

    openChild() {
      if (this.openTab < this.$children.length + 1) {
        this.$children[this.openTab - 1].isActive = true;
      }
    }

  },
  provide: function () {
    const tabConfig = {};
    Object.defineProperty(tabConfig, "tabMaxContentHeight", {
      get: () => this.tabMaxContentHeight
    });
    Object.defineProperty(tabConfig, "tabShowText", {
      get: () => this.tabShowText
    });
    Object.defineProperty(tabConfig, "tabHideText", {
      get: () => this.tabHideText
    });
    return {
      tabConfig
    };
  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/SfTabs.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfTabs_SfTabsvue_type_script_lang_js_ = (SfTabsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/SfTabs.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(229)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var SfTabs_component = Object(componentNormalizer["a" /* default */])(
  SfTabs_SfTabsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "0dc3759c"
  
)

/* harmony default export */ var SfTabs = __webpack_exports__["a"] = (SfTabs_component.exports);

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBreadcrumbs_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(231);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBreadcrumbs_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBreadcrumbs_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBreadcrumbs_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfBreadcrumbs_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}.sf-breadcrumbs__list{display:flex;flex-wrap:wrap;padding:0;margin:0;list-style:none}.sf-breadcrumbs__list-item:not(:last-child):after{padding:var(--breadcrumbs-list-item-before-padding,0 var(--spacer-sm));content:\"|\";content:var(--breadcrumbs-list-item-seperator,\"|\");color:var(--c-text-muted);color:var(--breadcrumbs-list-item-before-color,var(--c-text-muted))}.sf-breadcrumbs__breadcrumb{font:var(--font-normal) var(--font-sm)/1.6 var(--font-family-secondary);font:var(--breadcrumbs-font,var(--breadcrumbs-font-weight,var(--font-normal)) var(--breadcrumbs-font-size,var(--font-sm))/var(--breadcrumbs-font-line-height,1.6) var(--breadcrumbs-font-family,var(--font-family-secondary)));--link-color:var(--c-text-muted);--link-text-decoration:none}.sf-breadcrumbs__breadcrumb:hover{--link-color:var(--c-text)}.sf-breadcrumbs__breadcrumb--current{--link-color:var(--c-text);cursor:default}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfTable_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(232);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfTable_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfTable_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfTable_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfTable_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}.sf-table{box-sizing:border-box;width:100%;width:var(--table-width,100%);border:none;border-spacing:0;border-spacing:var(--table-border-spacing,0)}.sf-table__heading,.sf-table__row{box-sizing:border-box;display:flex;flex-wrap:wrap}.sf-table__heading{align-items:center;padding:var(--table-heading-padding,var(--spacer-sm) 0);background-color:transparent;background-color:var(--table-heading-background,transparent);border:var(--table-border,var(--table-border-style,solid) var(--table-border-color,var(--c-light)));border-width:2px 0;border-width:var(--table-border-width,2px 0 2px 0)}.sf-table__header{font:var(--font-semibold) var(--font-xs)/1.4 var(--font-family-secondary);font:var(--table-header-font,var(--table-header-font-weight,var(--font-semibold)) var(--table-header-font-size,var(--font-xs))/var(--table-header-font-line-height,1.4) var(--table-header-font-family,var(--font-family-secondary)));color:var(--c-text);color:var(--table-header-color,var(--c-text))}.sf-table__row{padding:var(--table-row-padding,var(--spacer-xs) 0);background-color:var(--table-row-background);box-shadow:var(--table-row-box-shadow);border:var(--table-row-border,var(--table-row-border-style,solid) var(--table-row-border-color,var(--c-light)));border-width:0 0 2px;border-width:var(--table-row-border-width,0 0 2px 0)}.sf-table__data{color:var(--c-dark-variant);color:var(--table-data-color,var(--c-dark-variant));font:var(--font-normal) var(--font-sm)/1.6 var(--font-family-secondary);font:var(--table-data-font,var(--table-data-font-weight,var(--font-normal)) var(--table-data-font-size,var(--font-sm))/var(--table-data-font-line-height,1.6) var(--table-data-font-family,var(--font-family-secondary)))}.sf-table__data,.sf-table__header{box-sizing:border-box;flex:0 0 calc(100%/var(--_table-column-width));flex:var(--table-column-flex,0 0 calc(100%/var(--_table-column-width)));padding:0;padding:var(--table-column-padding,0);text-align:left;text-align:var(--table-column-text-align,left)}.sf-table__data:nth-child(2n),.sf-table__header:nth-child(2n){order:1;order:var(--_table-column-order,1)}.sf-table--no-border{--table-row-border-width:0}@media (min-width:1024px){.sf-table{--table-row-padding:var(--spacer-sm) var(--spacer-sm);--table-heading-padding:var(--spacer-sm) var(--spacer-sm);--table-heading-background:transparent;--table-column-flex:1;--_table-column-order:0;--table-header-font-size:var(--font-sm);--table-header-font-weight:var(--font-normal)}.sf-table--no-border{--table-row-border-width:0}.sf-table__row:hover{--table-row-box-shadow:0 4px 20px rgba(100,122,145,0.19)}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(283);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("b2709178", content, true, context)
};

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(285);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("b4a77724", content, true, context)
};

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(287);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("32abb810", content, true, context)
};

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(289);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("56a816d3", content, true, context)
};

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(291);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("0ff70175", content, true, context)
};

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(293);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("453c5c5d", content, true, context)
};

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(295);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("fe1f107c", content, true, context)
};

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyProfile_vue_vue_type_style_index_0_id_00889392_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(250);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyProfile_vue_vue_type_style_index_0_id_00889392_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyProfile_vue_vue_type_style_index_0_id_00889392_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyProfile_vue_vue_type_style_index_0_id_00889392_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyProfile_vue_vue_type_style_index_0_id_00889392_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 283:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only[data-v-00889392]{display:none!important}}@media (max-width:1023px){.desktop-only[data-v-00889392]{display:none!important}}.message[data-v-00889392],.notice[data-v-00889392]{font-family:var(--font-family--primary);line-height:1.6}.message[data-v-00889392]{margin:0 0 var(--spacer-xl) 0;font-size:var(--font-size--base)}.message__label[data-v-00889392]{font-weight:400}.notice[data-v-00889392]{margin:var(--spacer-lg) 0 0 0;font-size:var(--font-size--sm)}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_ShippingDetails_vue_vue_type_style_index_0_id_30812432_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(251);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_ShippingDetails_vue_vue_type_style_index_0_id_30812432_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_ShippingDetails_vue_vue_type_style_index_0_id_30812432_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_ShippingDetails_vue_vue_type_style_index_0_id_30812432_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_ShippingDetails_vue_vue_type_style_index_0_id_30812432_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only[data-v-30812432]{display:none!important}}@media (max-width:1023px){.desktop-only[data-v-30812432]{display:none!important}}.message[data-v-30812432]{font-family:var(--font-family--primary);line-height:1.6;font-size:var(--font-size--base);margin:0 0 var(--spacer-base)}.shipping-list[data-v-30812432]{margin-bottom:var(--spacer-base)}.shipping[data-v-30812432]{display:flex;padding:var(--spacer-xl) 0;border-top:1px solid var(--c-light)}.shipping[data-v-30812432]:last-child{border-bottom:1px solid var(--c-light)}.shipping__content[data-v-30812432]{flex:1;color:var(--c-text);font-size:var(--font-size--base);font-weight:300;line-height:1.6}.shipping__actions[data-v-30812432]{flex:1;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end}@media (min-width:1024px){.shipping__actions[data-v-30812432]{flex-direction:row;align-items:center;justify-content:flex-end}}.shipping__button-delete[data-v-30812432]{color:var(--c-link)}@media (min-width:1024px){.shipping__button-delete[data-v-30812432]{margin-left:var(--spacer-base)}}.shipping__address[data-v-30812432],.shipping__address p[data-v-30812432]{margin:0}.shipping__client-name[data-v-30812432]{font-size:var(--font-size--base);font-weight:500}.action-button[data-v-30812432]{width:100%}@media (min-width:1024px){.action-button[data-v-30812432]{width:auto}}@media (max-width:1023px){.tab-orphan[data-v-30812432]  .sf-tabs__title{display:none}.tab-orphan[data-v-30812432]  .sf-tabs__content{border:0;padding:0}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_BillingDetails_vue_vue_type_style_index_0_id_03c42ae5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(252);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_BillingDetails_vue_vue_type_style_index_0_id_03c42ae5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_BillingDetails_vue_vue_type_style_index_0_id_03c42ae5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_BillingDetails_vue_vue_type_style_index_0_id_03c42ae5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_BillingDetails_vue_vue_type_style_index_0_id_03c42ae5_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only[data-v-03c42ae5]{display:none!important}}@media (max-width:1023px){.desktop-only[data-v-03c42ae5]{display:none!important}}.message[data-v-03c42ae5]{font-family:var(--font-family--primary);line-height:1.6;font-size:var(--font-size--base);margin:0 0 var(--spacer-base)}.billing-list[data-v-03c42ae5]{margin-bottom:var(--spacer-base)}.billing[data-v-03c42ae5]{display:flex;padding:var(--spacer-xl) 0;border-top:1px solid var(--c-light)}.billing[data-v-03c42ae5]:last-child{border-bottom:1px solid var(--c-light)}.billing__content[data-v-03c42ae5]{flex:1;color:var(--c-text);font-size:var(--font-size--base);font-weight:300;line-height:1.6}.billing__actions[data-v-03c42ae5]{flex:1;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end}@media (min-width:1024px){.billing__actions[data-v-03c42ae5]{flex-direction:row;align-items:center;justify-content:flex-end}}.billing__button-delete[data-v-03c42ae5]{color:var(--c-link)}@media (min-width:1024px){.billing__button-delete[data-v-03c42ae5]{margin-left:var(--spacer-base)}}.billing__address[data-v-03c42ae5],.billing__address p[data-v-03c42ae5]{margin:0}.billing__client-name[data-v-03c42ae5]{font-size:var(--font-size--base);font-weight:500}.action-button[data-v-03c42ae5]{width:100%}@media (min-width:1024px){.action-button[data-v-03c42ae5]{width:auto}}@media (max-width:1023px){.tab-orphan[data-v-03c42ae5]  .sf-tabs__title{display:none}.tab-orphan[data-v-03c42ae5]  .sf-tabs__content{border:0;padding:0}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_LoyaltyCard_vue_vue_type_style_index_0_id_c33b6a5a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(253);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_LoyaltyCard_vue_vue_type_style_index_0_id_c33b6a5a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_LoyaltyCard_vue_vue_type_style_index_0_id_c33b6a5a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_LoyaltyCard_vue_vue_type_style_index_0_id_c33b6a5a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_LoyaltyCard_vue_vue_type_style_index_0_id_c33b6a5a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only[data-v-c33b6a5a]{display:none!important}}@media (max-width:1023px){.desktop-only[data-v-c33b6a5a]{display:none!important}}@media (max-width:1023px){.tab-orphan[data-v-c33b6a5a]{--tabs-title-display:none;--tabs-content-padding:0;--tabs-conent-border-width:0}}.message[data-v-c33b6a5a]{margin:0 0 var(--spacer-2xl) 0;font:var(--font-weight--light) var(--font-size--base)/1.6 var(--font-family--primary)}.message__link[data-v-c33b6a5a]{color:var(--c-primary);--link-weight:var(--font-weight--medium);--link-font-family:var(--font-family--primary);--link-font-size:var(--font-size--base);text-decoration:none}.message__link[data-v-c33b6a5a]:hover{color:var(--c-text)}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyNewsletter_vue_vue_type_style_index_0_id_826a330c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(254);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyNewsletter_vue_vue_type_style_index_0_id_826a330c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyNewsletter_vue_vue_type_style_index_0_id_826a330c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyNewsletter_vue_vue_type_style_index_0_id_826a330c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyNewsletter_vue_vue_type_style_index_0_id_826a330c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 291:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only[data-v-826a330c]{display:none!important}}@media (max-width:1023px){.desktop-only[data-v-826a330c]{display:none!important}}@media (max-width:1023px){.tab-orphan[data-v-826a330c]{--tabs-title-display:none;--tabs-content-padding:0;--tabs-conent-border-width:0}}.form__element[data-v-826a330c]{margin:0 0 var(--spacer-base) 0}.form__element[data-v-826a330c]:last-child{margin:0}.form__checkbox-group[data-v-826a330c]{margin:0 0 var(--spacer-xl) 0}.form__title[data-v-826a330c]{margin:0 0 var(--spacer-base) 0}.form__button[data-v-826a330c]{--button-width:100%}@media (min-width:1024px){.form__button[data-v-826a330c]{--button-width:17.5rem}}.message[data-v-826a330c]{margin:0 0 var(--spacer-xl) 0;color:var(--c-dark-variant)}.notice[data-v-826a330c]{margin:var(--spacer-base) 0 0 0;font-size:var(--font-size--xs)}.notice__link[data-v-826a330c]{color:var(--c-primary);text-decoration:none}.notice__link[data-v-826a330c]:hover{color:var(--c-text)}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderHistory_vue_vue_type_style_index_0_id_2e50212e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(255);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderHistory_vue_vue_type_style_index_0_id_2e50212e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderHistory_vue_vue_type_style_index_0_id_2e50212e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderHistory_vue_vue_type_style_index_0_id_2e50212e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_OrderHistory_vue_vue_type_style_index_0_id_2e50212e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 293:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only[data-v-2e50212e]{display:none!important}}@media (max-width:1023px){.desktop-only[data-v-2e50212e]{display:none!important}}.no-orders__title[data-v-2e50212e]{margin:0 0 var(--spacer-lg) 0;font:var(--font-weight--normal) var(--font-size--base)/1.6 var(--font-family--primary)}.no-orders__button[data-v-2e50212e]{--button-width:100%}@media (min-width:1024px){.no-orders__button[data-v-2e50212e]{--button-width:17,5rem}}@media (min-width:1024px){.orders__element--right[data-v-2e50212e]{--table-column-flex:0;text-align:right}}.all-orders[data-v-2e50212e]{--button-padding:var(--spacer-base) 0}.message[data-v-2e50212e]{margin:0 0 var(--spacer-xl) 0;font:var(--font-weight--light) var(--font-size--base)/1.6 var(--font-family--primary)}.message__link[data-v-2e50212e]{color:var(--c-primary);font-weight:var(--font-weight--medium);font-family:var(--font-family--primary);font-size:var(--font-size--base);text-decoration:none}.message__link[data-v-2e50212e]:hover{color:var(--c-text)}.product__properties[data-v-2e50212e]{margin:var(--spacer-xl) 0 0 0}.product__action[data-v-2e50212e],.product__property[data-v-2e50212e]{font-size:var(--font-size--sm)}.product__action[data-v-2e50212e]{color:var(--c-gray-variant);margin:0 0 var(--spacer-sm) 0}.product__action[data-v-2e50212e]:last-child{margin:0}.product__qty[data-v-2e50212e]{color:var(--c-text)}.products[data-v-2e50212e]{--table-column-flex:1}.products__name[data-v-2e50212e]{margin-right:var(--spacer-sm)}@media (min-width:1024px){.products__name[data-v-2e50212e]{--table-column-flex:2}}.highlighted[data-v-2e50212e]{box-sizing:border-box;width:100%;background-color:var(--c-light);padding:var(--spacer-sm);--property-value-font-size:var(--font-size--base);--property-name-font-size:var(--font-size--base)}.highlighted[data-v-2e50212e]:last-child{margin-bottom:0}.highlighted[data-v-2e50212e]  .sf-property__name{white-space:nowrap}.highlighted[data-v-2e50212e]  .sf-property__value{text-align:right}.highlighted--total[data-v-2e50212e]{margin-bottom:var(--spacer-sm)}@media (min-width:1024px){.highlighted[data-v-2e50212e]{padding:var(--spacer-xl);--property-name-font-size:var(--font-size--lg);--property-name-font-weight:var(--font-weight--medium);--property-value-font-size:var(--font-size--lg);--property-value-font-weight:var(--font-weight--semibold)}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyReviews_vue_vue_type_style_index_0_id_87f882b0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(256);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyReviews_vue_vue_type_style_index_0_id_87f882b0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyReviews_vue_vue_type_style_index_0_id_87f882b0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyReviews_vue_vue_type_style_index_0_id_87f882b0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyReviews_vue_vue_type_style_index_0_id_87f882b0_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only[data-v-87f882b0]{display:none!important}}@media (max-width:1023px){.desktop-only[data-v-87f882b0]{display:none!important}}@media (max-width:1023px){.tab-orphan[data-v-87f882b0]{--tabs-title-display:none;--tabs-content-padding:0;--tabs-conent-border-width:0}}.message[data-v-87f882b0]{margin:0 0 var(--spacer-2xl) 0;font:var(--font-weight--light) var(--font-size--base)/1.6 var(--font-family--primary)}.message__link[data-v-87f882b0]{color:var(--c-primary);--link-weight:var(--font-weight--medium);--link-font-family:var(--font-family--primary);--link-font-size:var(--font-size--base);text-decoration:none}.message__link[data-v-87f882b0]:hover{color:var(--c-text)}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(371);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("f6df15a6", content, true, context)
};

/***/ }),

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(373);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("5634c236", content, true, context)
};

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/SfTable.vue?vue&type=template&id=11b2df3a&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"sf-table"},[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/SfTable.vue?vue&type=template&id=11b2df3a&

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(3);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableRow.vue?vue&type=template&id=b40f34de&
var SfTableRowvue_type_template_id_b40f34de_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',{staticClass:"sf-table__row"},[_vm._t("default")],2)}
var SfTableRowvue_type_template_id_b40f34de_staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableRow.vue?vue&type=template&id=b40f34de&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableRow.vue?vue&type=script&lang=js&
//
//
//
//
//
/* harmony default export */ var SfTableRowvue_type_script_lang_js_ = ({
  name: "SfTableRow",
  inject: ["table"],

  mounted() {
    if (!this.$slots.default) return;
    this.table.updateColumnsCount(this.$slots.default.filter(node => node.tag).length);
  }

});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableRow.vue?vue&type=script&lang=js&
 /* harmony default export */ var _internal_SfTableRowvue_type_script_lang_js_ = (SfTableRowvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableRow.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  _internal_SfTableRowvue_type_script_lang_js_,
  SfTableRowvue_type_template_id_b40f34de_render,
  SfTableRowvue_type_template_id_b40f34de_staticRenderFns,
  false,
  null,
  null,
  "dd485e1a"
  
)

/* harmony default export */ var SfTableRow = (component.exports);
// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableData.vue?vue&type=template&id=3121b6c5&
var SfTableDatavue_type_template_id_3121b6c5_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('td',{staticClass:"sf-table__data"},[_vm._t("default")],2)}
var SfTableDatavue_type_template_id_3121b6c5_staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableData.vue?vue&type=template&id=3121b6c5&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableData.vue?vue&type=script&lang=js&
//
//
//
//
//
/* harmony default export */ var SfTableDatavue_type_script_lang_js_ = ({
  name: "SfTableData"
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableData.vue?vue&type=script&lang=js&
 /* harmony default export */ var _internal_SfTableDatavue_type_script_lang_js_ = (SfTableDatavue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableData.vue





/* normalize component */

var SfTableData_component = Object(componentNormalizer["a" /* default */])(
  _internal_SfTableDatavue_type_script_lang_js_,
  SfTableDatavue_type_template_id_3121b6c5_render,
  SfTableDatavue_type_template_id_3121b6c5_staticRenderFns,
  false,
  null,
  null,
  "04c60be1"
  
)

/* harmony default export */ var SfTableData = (SfTableData_component.exports);
// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableHeader.vue?vue&type=template&id=62c92d90&
var SfTableHeadervue_type_template_id_62c92d90_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('th',{staticClass:"sf-table__header"},[_vm._t("default")],2)}
var SfTableHeadervue_type_template_id_62c92d90_staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableHeader.vue?vue&type=template&id=62c92d90&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableHeader.vue?vue&type=script&lang=js&
//
//
//
//
//
/* harmony default export */ var SfTableHeadervue_type_script_lang_js_ = ({
  name: "SfTableHeader"
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableHeader.vue?vue&type=script&lang=js&
 /* harmony default export */ var _internal_SfTableHeadervue_type_script_lang_js_ = (SfTableHeadervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableHeader.vue





/* normalize component */

var SfTableHeader_component = Object(componentNormalizer["a" /* default */])(
  _internal_SfTableHeadervue_type_script_lang_js_,
  SfTableHeadervue_type_template_id_62c92d90_render,
  SfTableHeadervue_type_template_id_62c92d90_staticRenderFns,
  false,
  null,
  null,
  "5428a984"
  
)

/* harmony default export */ var SfTableHeader = (SfTableHeader_component.exports);
// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableHeading.vue?vue&type=template&id=eaeab72e&
var SfTableHeadingvue_type_template_id_eaeab72e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',{staticClass:"sf-table__heading"},[_vm._t("default")],2)}
var SfTableHeadingvue_type_template_id_eaeab72e_staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableHeading.vue?vue&type=template&id=eaeab72e&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableHeading.vue?vue&type=script&lang=js&
//
//
//
//
//
/* harmony default export */ var SfTableHeadingvue_type_script_lang_js_ = ({
  name: "SfTableHeading",
  inject: ["table"],

  mounted() {
    if (!this.$slots.default) return;
    this.table.updateColumnsCount(this.$slots.default.filter(node => node.tag).length);
  }

});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableHeading.vue?vue&type=script&lang=js&
 /* harmony default export */ var _internal_SfTableHeadingvue_type_script_lang_js_ = (SfTableHeadingvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/_internal/SfTableHeading.vue





/* normalize component */

var SfTableHeading_component = Object(componentNormalizer["a" /* default */])(
  _internal_SfTableHeadingvue_type_script_lang_js_,
  SfTableHeadingvue_type_template_id_eaeab72e_render,
  SfTableHeadingvue_type_template_id_eaeab72e_staticRenderFns,
  false,
  null,
  null,
  "00b4989b"
  
)

/* harmony default export */ var SfTableHeading = (SfTableHeading_component.exports);
// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/SfTable.vue?vue&type=script&lang=js&
//
//
//
//
//





external_vue_default.a.component("SfTableRow", SfTableRow);
external_vue_default.a.component("SfTableData", SfTableData);
external_vue_default.a.component("SfTableHeader", SfTableHeader);
external_vue_default.a.component("SfTableHeading", SfTableHeading);
/* harmony default export */ var SfTablevue_type_script_lang_js_ = ({
  name: "SfTable",

  provide() {
    const table = {};
    Object.defineProperty(table, "updateColumnsCount", {
      value: this.updateColumnsCount
    });
    return {
      table
    };
  },

  methods: {
    updateColumnsCount(columnsCount) {
      this.$el.style.setProperty("--_table-column-width", Math.ceil(columnsCount / 2));
    }

  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/SfTable.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfTable_SfTablevue_type_script_lang_js_ = (SfTablevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/SfTable.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(240)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var SfTable_component = Object(componentNormalizer["a" /* default */])(
  SfTable_SfTablevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "4e823aca"
  
)

/* harmony default export */ var SfTable = __webpack_exports__["a"] = (SfTable_component.exports);

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/MyAccount/MyProfile.vue?vue&type=template&id=00889392&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('SfTabs',{attrs:{"open-tab":1}},[_c('SfTab',{attrs:{"data-cy":"my-profile-tab_personal-data","title":"Personal data"}},[_c('p',{staticClass:"message"},[_vm._v("\n      "+_vm._s(_vm.$t('Feel free to edit'))+"\n    ")]),_vm._v(" "),_c('ProfileUpdateForm',{on:{"submit":_vm.updatePersonalData}}),_vm._v(" "),_c('p',{staticClass:"notice"},[_vm._v("\n      "+_vm._s(_vm.$t('Use your personal data'))+"\n      "),_c('a',{attrs:{"href":""}},[_vm._v(_vm._s(_vm.$t('Privacy Policy')))])])],1),_vm._v(" "),_c('SfTab',{attrs:{"data-cy":"my-profile-tab_password-change","title":"Password change"}},[_c('p',{staticClass:"message"},[_vm._v("\n      "+_vm._s(_vm.$t('Change password your account'))+":"),_c('br'),_vm._v("\n      "+_vm._s(_vm.$t('Your current email address is'))+"\n      "),_c('span',{staticClass:"message__label"},[_vm._v("example@email.com")])]),_vm._v(" "),_c('PasswordResetForm',{on:{"submit":_vm.updatePassword}})],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./_theme/pages/MyAccount/MyProfile.vue?vue&type=template&id=00889392&scoped=true&

// EXTERNAL MODULE: external "vee-validate"
var external_vee_validate_ = __webpack_require__(23);

// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vee-validate/dist/rules.js
var rules = __webpack_require__(35);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/MyAccount/ProfileUpdateForm.vue?vue&type=template&id=08a7f43c&
var ProfileUpdateFormvue_type_template_id_08a7f43c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b',[_vm._ssrNode("Please implement vendor specific ProfileUpdateForm component in 'components/MyAccount' directory")])}
var ProfileUpdateFormvue_type_template_id_08a7f43c_staticRenderFns = []


// CONCATENATED MODULE: ./_theme/components/MyAccount/ProfileUpdateForm.vue?vue&type=template&id=08a7f43c&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/MyAccount/ProfileUpdateForm.vue?vue&type=script&lang=js&
//
//
//
//
/* harmony default export */ var ProfileUpdateFormvue_type_script_lang_js_ = ({
  name: 'ProfileUpdateForm'
});
// CONCATENATED MODULE: ./_theme/components/MyAccount/ProfileUpdateForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var MyAccount_ProfileUpdateFormvue_type_script_lang_js_ = (ProfileUpdateFormvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./_theme/components/MyAccount/ProfileUpdateForm.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  MyAccount_ProfileUpdateFormvue_type_script_lang_js_,
  ProfileUpdateFormvue_type_template_id_08a7f43c_render,
  ProfileUpdateFormvue_type_template_id_08a7f43c_staticRenderFns,
  false,
  null,
  null,
  "5d5c7cdf"
  
)

/* harmony default export */ var ProfileUpdateForm = (component.exports);
// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/MyAccount/PasswordResetForm.vue?vue&type=template&id=d1ca1d80&
var PasswordResetFormvue_type_template_id_d1ca1d80_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b',[_vm._ssrNode("Please implement vendor specific PasswordResetForm component in 'components/MyAccount' directory")])}
var PasswordResetFormvue_type_template_id_d1ca1d80_staticRenderFns = []


// CONCATENATED MODULE: ./_theme/components/MyAccount/PasswordResetForm.vue?vue&type=template&id=d1ca1d80&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/MyAccount/PasswordResetForm.vue?vue&type=script&lang=js&
//
//
//
//
/* harmony default export */ var PasswordResetFormvue_type_script_lang_js_ = ({
  name: 'PasswordResetForm'
});
// CONCATENATED MODULE: ./_theme/components/MyAccount/PasswordResetForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var MyAccount_PasswordResetFormvue_type_script_lang_js_ = (PasswordResetFormvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./_theme/components/MyAccount/PasswordResetForm.vue





/* normalize component */

var PasswordResetForm_component = Object(componentNormalizer["a" /* default */])(
  MyAccount_PasswordResetFormvue_type_script_lang_js_,
  PasswordResetFormvue_type_template_id_d1ca1d80_render,
  PasswordResetFormvue_type_template_id_d1ca1d80_staticRenderFns,
  false,
  null,
  null,
  "181aeafe"
  
)

/* harmony default export */ var PasswordResetForm = (PasswordResetForm_component.exports);
// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/SfTabs.vue + 9 modules
var SfTabs = __webpack_require__(233);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfInput/SfInput.vue + 4 modules
var SfInput = __webpack_require__(97);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue + 4 modules
var SfButton = __webpack_require__(7);

// EXTERNAL MODULE: ../composables/lib/index.es.js
var index_es = __webpack_require__(8);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/MyAccount/MyProfile.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






Object(external_vee_validate_["extend"])('email', { ...rules["b" /* email */],
  message: 'Invalid email'
});
Object(external_vee_validate_["extend"])('required', { ...rules["d" /* required */],
  message: 'This field is required'
});
Object(external_vee_validate_["extend"])('min', { ...rules["c" /* min */],
  message: 'The field should have at least {length} characters'
});
Object(external_vee_validate_["extend"])('password', {
  validate: value => String(value).length >= 8 && String(value).match(/[A-Za-z]/gi) && String(value).match(/[0-9]/gi),
  message: 'Password must have at least 8 characters including one letter and a number'
});
Object(external_vee_validate_["extend"])('confirmed', { ...rules["a" /* confirmed */],
  message: 'Passwords don\'t match'
});
/* harmony default export */ var MyProfilevue_type_script_lang_js_ = ({
  name: 'PersonalDetails',
  components: {
    SfTabs: SfTabs["a" /* default */],
    SfInput: SfInput["a" /* default */],
    SfButton: SfButton["a" /* default */],
    ProfileUpdateForm: ProfileUpdateForm,
    PasswordResetForm: PasswordResetForm
  },

  setup() {
    const {
      updateUser,
      changePassword
    } = Object(index_es["n" /* useUser */])();

    const formHandler = async (fn, onComplete, onError) => {
      try {
        const data = await fn();
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };

    const updatePersonalData = ({
      form,
      onComplete,
      onError
    }) => formHandler(() => updateUser({
      user: form.value
    }), onComplete, onError);

    const updatePassword = ({
      form,
      onComplete,
      onError
    }) => formHandler(() => changePassword({
      current: form.value.currentPassword,
      new: form.value.newPassword
    }), onComplete, onError);

    return {
      updatePersonalData,
      updatePassword
    };
  }

});
// CONCATENATED MODULE: ./_theme/pages/MyAccount/MyProfile.vue?vue&type=script&lang=js&
 /* harmony default export */ var MyAccount_MyProfilevue_type_script_lang_js_ = (MyProfilevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./_theme/pages/MyAccount/MyProfile.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(282)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var MyProfile_component = Object(componentNormalizer["a" /* default */])(
  MyAccount_MyProfilevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "00889392",
  "1f7175c4"
  
)

/* harmony default export */ var MyProfile = __webpack_exports__["default"] = (MyProfile_component.exports);

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/MyAccount/ShippingDetails.vue?vue&type=template&id=30812432&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"fade"}},[(_vm.edittingAddress)?_c('SfTabs',{key:"edit-address",staticClass:"tab-orphan",attrs:{"open-tab":1}},[_c('SfTab',{attrs:{"data-cy":"shipping-details-tab_change","title":_vm.isNewAddress ? 'Add the address' : 'Update the address'}},[_c('p',{staticClass:"message"},[_vm._v("\n        "+_vm._s(_vm.$t('Contact details updated'))+"\n      ")]),_vm._v(" "),_c('ShippingAddressForm',{attrs:{"address":_vm.activeAddress,"isNew":_vm.isNewAddress},on:{"submit":_vm.saveAddress}})],1)],1):_c('SfTabs',{key:"address-list",staticClass:"tab-orphan",attrs:{"open-tab":1}},[_c('SfTab',{attrs:{"data-cy":"shipping-details-tab_details","title":"Shipping details"}},[_c('p',{staticClass:"message"},[_vm._v("\n        "+_vm._s(_vm.$t('Manage shipping addresses'))+"\n      ")]),_vm._v(" "),_c('transition-group',{staticClass:"shipping-list",attrs:{"tag":"div","name":"fade"}},_vm._l((_vm.addresses),function(address){return _c('div',{key:_vm.userShippingGetters.getId(address),staticClass:"shipping"},[_c('div',{staticClass:"shipping__content"},[_c('div',{staticClass:"shipping__address"},[_c('UserShippingAddress',{attrs:{"address":address}})],1)]),_vm._v(" "),_c('div',{staticClass:"shipping__actions"},[_c('SfIcon',{staticClass:"smartphone-only",attrs:{"data-cy":"shipping-details-icon_delete","icon":"cross","color":"gray","size":"14px","role":"button"},on:{"click":function($event){return _vm.removeAddress(address)}}}),_vm._v(" "),_c('SfButton',{attrs:{"data-cy":"shipping-details-btn_change"},on:{"click":function($event){return _vm.changeAddress(address)}}},[_vm._v("\n              "+_vm._s(_vm.$t('Change'))+"\n            ")]),_vm._v(" "),_c('SfButton',{staticClass:"color-light shipping__button-delete desktop-only",attrs:{"data-cy":"shipping-details-btn_delete"},on:{"click":function($event){return _vm.removeAddress(address)}}},[_vm._v("\n              "+_vm._s(_vm.$t('Delete'))+"\n            ")])],1)])}),0),_vm._v(" "),_c('SfButton',{staticClass:"action-button",attrs:{"data-cy":"shipping-details-btn_add"},on:{"click":function($event){return _vm.changeAddress()}}},[_vm._v("\n        "+_vm._s(_vm.$t('Add new address'))+"\n      ")])],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./_theme/pages/MyAccount/ShippingDetails.vue?vue&type=template&id=30812432&scoped=true&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/SfTabs.vue + 9 modules
var SfTabs = __webpack_require__(233);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue + 4 modules
var SfButton = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfIcon/SfIcon.vue + 6 modules
var SfIcon = __webpack_require__(6);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/UserShippingAddress.vue?vue&type=template&id=02938699&
var UserShippingAddressvue_type_template_id_02938699_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b',[_vm._ssrNode("Please implement vendor specific UserShippingAddress component in 'components' directory")])}
var UserShippingAddressvue_type_template_id_02938699_staticRenderFns = []


// CONCATENATED MODULE: ./_theme/components/UserShippingAddress.vue?vue&type=template&id=02938699&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/UserShippingAddress.vue?vue&type=script&lang=js&
//
//
//
//
/* harmony default export */ var UserShippingAddressvue_type_script_lang_js_ = ({
  name: 'UserShippingAddress'
});
// CONCATENATED MODULE: ./_theme/components/UserShippingAddress.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_UserShippingAddressvue_type_script_lang_js_ = (UserShippingAddressvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./_theme/components/UserShippingAddress.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_UserShippingAddressvue_type_script_lang_js_,
  UserShippingAddressvue_type_template_id_02938699_render,
  UserShippingAddressvue_type_template_id_02938699_staticRenderFns,
  false,
  null,
  null,
  "4734f192"
  
)

/* harmony default export */ var UserShippingAddress = (component.exports);
// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/MyAccount/ShippingAddressForm.vue?vue&type=template&id=ca1a4d64&
var ShippingAddressFormvue_type_template_id_ca1a4d64_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b',[_vm._ssrNode("Please implement vendor specific ShippingAddressForm component in 'components/MyAccount' directory")])}
var ShippingAddressFormvue_type_template_id_ca1a4d64_staticRenderFns = []


// CONCATENATED MODULE: ./_theme/components/MyAccount/ShippingAddressForm.vue?vue&type=template&id=ca1a4d64&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/MyAccount/ShippingAddressForm.vue?vue&type=script&lang=js&
//
//
//
//
/* harmony default export */ var ShippingAddressFormvue_type_script_lang_js_ = ({
  name: 'ShippingAddressForm'
});
// CONCATENATED MODULE: ./_theme/components/MyAccount/ShippingAddressForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var MyAccount_ShippingAddressFormvue_type_script_lang_js_ = (ShippingAddressFormvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./_theme/components/MyAccount/ShippingAddressForm.vue





/* normalize component */

var ShippingAddressForm_component = Object(componentNormalizer["a" /* default */])(
  MyAccount_ShippingAddressFormvue_type_script_lang_js_,
  ShippingAddressFormvue_type_template_id_ca1a4d64_render,
  ShippingAddressFormvue_type_template_id_ca1a4d64_staticRenderFns,
  false,
  null,
  null,
  "5bd1b333"
  
)

/* harmony default export */ var ShippingAddressForm = (ShippingAddressForm_component.exports);
// EXTERNAL MODULE: ../composables/lib/index.es.js
var index_es = __webpack_require__(8);

// EXTERNAL MODULE: external "@vue/composition-api"
var composition_api_ = __webpack_require__(2);

// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/packages/core/core/lib/index.es.js
var lib_index_es = __webpack_require__(9);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/MyAccount/ShippingDetails.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var ShippingDetailsvue_type_script_lang_js_ = ({
  name: 'ShippingDetails',
  components: {
    SfTabs: SfTabs["a" /* default */],
    SfButton: SfButton["a" /* default */],
    SfIcon: SfIcon["a" /* default */],
    UserShippingAddress: UserShippingAddress,
    ShippingAddressForm: ShippingAddressForm
  },

  setup() {
    const {
      shipping,
      load: loadUserShipping,
      addAddress,
      deleteAddress,
      updateAddress
    } = Object(index_es["useUserShipping"])();
    const addresses = Object(composition_api_["computed"])(() => index_es["userShippingGetters"].getAddresses(shipping.value));
    const edittingAddress = Object(composition_api_["ref"])(false);
    const activeAddress = Object(composition_api_["ref"])(undefined);
    const isNewAddress = Object(composition_api_["computed"])(() => !activeAddress.value);

    const changeAddress = (address = undefined) => {
      activeAddress.value = address;
      edittingAddress.value = true;
    };

    const removeAddress = address => deleteAddress({
      address
    });

    const saveAddress = async ({
      form,
      onComplete,
      onError
    }) => {
      try {
        const actionMethod = isNewAddress.value ? addAddress : updateAddress;
        const data = await actionMethod({
          address: form
        });
        edittingAddress.value = false;
        activeAddress.value = undefined;
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };

    Object(lib_index_es["onSSR"])(async () => {
      await loadUserShipping();
    });
    return {
      changeAddress,
      updateAddress,
      removeAddress,
      saveAddress,
      userShippingGetters: index_es["userShippingGetters"],
      addresses,
      edittingAddress,
      activeAddress,
      isNewAddress
    };
  }

});
// CONCATENATED MODULE: ./_theme/pages/MyAccount/ShippingDetails.vue?vue&type=script&lang=js&
 /* harmony default export */ var MyAccount_ShippingDetailsvue_type_script_lang_js_ = (ShippingDetailsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./_theme/pages/MyAccount/ShippingDetails.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(284)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var ShippingDetails_component = Object(componentNormalizer["a" /* default */])(
  MyAccount_ShippingDetailsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "30812432",
  "8c59254a"
  
)

/* harmony default export */ var ShippingDetails = __webpack_exports__["default"] = (ShippingDetails_component.exports);

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/MyAccount/BillingDetails.vue?vue&type=template&id=03c42ae5&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"fade"}},[(_vm.edittingAddress)?_c('SfTabs',{key:"edit-address",staticClass:"tab-orphan",attrs:{"open-tab":1}},[_c('SfTab',{attrs:{"data-cy":"billing-details-tab_change","title":_vm.isNewAddress ? 'Add the address' : 'Update the address'}},[_c('p',{staticClass:"message"},[_vm._v("\n        "+_vm._s(_vm.$t('Contact details updated'))+"\n      ")]),_vm._v(" "),_c('BillingAddressForm',{attrs:{"address":_vm.activeAddress,"isNew":_vm.isNewAddress},on:{"submit":_vm.saveAddress}})],1)],1):_c('SfTabs',{key:"address-list",staticClass:"tab-orphan",attrs:{"open-tab":1}},[_c('SfTab',{attrs:{"data-cy":"billing-details-tab_details","title":"Billing details"}},[_c('p',{staticClass:"message"},[_vm._v("\n        "+_vm._s(_vm.$t('Manage billing addresses'))+"\n      ")]),_vm._v(" "),_c('transition-group',{staticClass:"billing-list",attrs:{"tag":"div","name":"fade"}},_vm._l((_vm.addresses),function(address){return _c('div',{key:_vm.userBillingGetters.getId(address),staticClass:"billing"},[_c('div',{staticClass:"billing__content"},[_c('div',{staticClass:"billing__address"},[_c('UserBillingAddress',{attrs:{"address":address}})],1)]),_vm._v(" "),_c('div',{staticClass:"billing__actions"},[_c('SfIcon',{staticClass:"smartphone-only",attrs:{"data-cy":"billing-details-icon_delete","icon":"cross","color":"gray","size":"14px","role":"button"},on:{"click":function($event){return _vm.removeAddress(address)}}}),_vm._v(" "),_c('SfButton',{attrs:{"data-cy":"billing-details-btn_change"},on:{"click":function($event){return _vm.changeAddress(address)}}},[_vm._v("\n              "+_vm._s(_vm.$t('Change'))+"\n            ")]),_vm._v(" "),_c('SfButton',{staticClass:"color-light billing__button-delete desktop-only",attrs:{"data-cy":"billing-details-btn_delete"},on:{"click":function($event){return _vm.removeAddress(address)}}},[_vm._v("\n              "+_vm._s(_vm.$t('Delete'))+"\n            ")])],1)])}),0),_vm._v(" "),_c('SfButton',{staticClass:"action-button",attrs:{"data-cy":"billing-details-btn_add"},on:{"click":function($event){return _vm.changeAddress()}}},[_vm._v("\n        "+_vm._s(_vm.$t('Add new address'))+"\n      ")])],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./_theme/pages/MyAccount/BillingDetails.vue?vue&type=template&id=03c42ae5&scoped=true&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/SfTabs.vue + 9 modules
var SfTabs = __webpack_require__(233);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue + 4 modules
var SfButton = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfIcon/SfIcon.vue + 6 modules
var SfIcon = __webpack_require__(6);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/UserBillingAddress.vue?vue&type=template&id=cf5cc650&
var UserBillingAddressvue_type_template_id_cf5cc650_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b',[_vm._ssrNode("Please implement vendor specific UserBillingAddress component in 'components' directory")])}
var UserBillingAddressvue_type_template_id_cf5cc650_staticRenderFns = []


// CONCATENATED MODULE: ./_theme/components/UserBillingAddress.vue?vue&type=template&id=cf5cc650&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/UserBillingAddress.vue?vue&type=script&lang=js&
//
//
//
//
/* harmony default export */ var UserBillingAddressvue_type_script_lang_js_ = ({
  name: 'UserBillingAddress'
});
// CONCATENATED MODULE: ./_theme/components/UserBillingAddress.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_UserBillingAddressvue_type_script_lang_js_ = (UserBillingAddressvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./_theme/components/UserBillingAddress.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_UserBillingAddressvue_type_script_lang_js_,
  UserBillingAddressvue_type_template_id_cf5cc650_render,
  UserBillingAddressvue_type_template_id_cf5cc650_staticRenderFns,
  false,
  null,
  null,
  "016380fd"
  
)

/* harmony default export */ var UserBillingAddress = (component.exports);
// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/MyAccount/BillingAddressForm.vue?vue&type=template&id=db921166&
var BillingAddressFormvue_type_template_id_db921166_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b',[_vm._ssrNode("Please implement vendor specific BillingAddressForm component in 'components/MyAccount' directory")])}
var BillingAddressFormvue_type_template_id_db921166_staticRenderFns = []


// CONCATENATED MODULE: ./_theme/components/MyAccount/BillingAddressForm.vue?vue&type=template&id=db921166&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/MyAccount/BillingAddressForm.vue?vue&type=script&lang=js&
//
//
//
//
/* harmony default export */ var BillingAddressFormvue_type_script_lang_js_ = ({
  name: 'BillingAddressForm'
});
// CONCATENATED MODULE: ./_theme/components/MyAccount/BillingAddressForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var MyAccount_BillingAddressFormvue_type_script_lang_js_ = (BillingAddressFormvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./_theme/components/MyAccount/BillingAddressForm.vue





/* normalize component */

var BillingAddressForm_component = Object(componentNormalizer["a" /* default */])(
  MyAccount_BillingAddressFormvue_type_script_lang_js_,
  BillingAddressFormvue_type_template_id_db921166_render,
  BillingAddressFormvue_type_template_id_db921166_staticRenderFns,
  false,
  null,
  null,
  "65166a04"
  
)

/* harmony default export */ var BillingAddressForm = (BillingAddressForm_component.exports);
// EXTERNAL MODULE: ../composables/lib/index.es.js
var index_es = __webpack_require__(8);

// EXTERNAL MODULE: external "@vue/composition-api"
var composition_api_ = __webpack_require__(2);

// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/packages/core/core/lib/index.es.js
var lib_index_es = __webpack_require__(9);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/MyAccount/BillingDetails.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var BillingDetailsvue_type_script_lang_js_ = ({
  name: 'BillingDetails',
  components: {
    SfTabs: SfTabs["a" /* default */],
    SfButton: SfButton["a" /* default */],
    SfIcon: SfIcon["a" /* default */],
    UserBillingAddress: UserBillingAddress,
    BillingAddressForm: BillingAddressForm
  },

  setup() {
    const {
      billing,
      load: loadUserBilling,
      addAddress,
      deleteAddress,
      updateAddress
    } = Object(index_es["useUserBilling"])();
    const addresses = Object(composition_api_["computed"])(() => index_es["userBillingGetters"].getAddresses(billing.value));
    const edittingAddress = Object(composition_api_["ref"])(false);
    const activeAddress = Object(composition_api_["ref"])(undefined);
    const isNewAddress = Object(composition_api_["computed"])(() => !activeAddress.value);

    const changeAddress = (address = undefined) => {
      activeAddress.value = address;
      edittingAddress.value = true;
    };

    const removeAddress = address => deleteAddress({
      address
    });

    const saveAddress = async ({
      form,
      onComplete,
      onError
    }) => {
      try {
        const actionMethod = isNewAddress.value ? addAddress : updateAddress;
        const data = await actionMethod({
          address: form
        });
        edittingAddress.value = false;
        activeAddress.value = undefined;
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };

    Object(lib_index_es["onSSR"])(async () => {
      await loadUserBilling();
    });
    return {
      changeAddress,
      updateAddress,
      removeAddress,
      saveAddress,
      userBillingGetters: index_es["userBillingGetters"],
      addresses,
      edittingAddress,
      activeAddress,
      isNewAddress
    };
  }

});
// CONCATENATED MODULE: ./_theme/pages/MyAccount/BillingDetails.vue?vue&type=script&lang=js&
 /* harmony default export */ var MyAccount_BillingDetailsvue_type_script_lang_js_ = (BillingDetailsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./_theme/pages/MyAccount/BillingDetails.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(286)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var BillingDetails_component = Object(componentNormalizer["a" /* default */])(
  MyAccount_BillingDetailsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "03c42ae5",
  "5b290870"
  
)

/* harmony default export */ var BillingDetails = __webpack_exports__["default"] = (BillingDetails_component.exports);

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/MyAccount/LoyaltyCard.vue?vue&type=template&id=c33b6a5a&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('SfTabs',{staticClass:"tab-orphan",attrs:{"open-tab":1}},[_c('SfTab',{attrs:{"data-cy":"loyalty-card-tab","title":"Loyalty Card"}},[_c('p',{staticClass:"message"},[_vm._v("\n      This feature is not implemented yet! Please take a look at\n      "),_c('br'),_vm._v(" "),_c('SfLink',{staticClass:"message__link",attrs:{"href":"#"}},[_vm._v("https://github.com/DivanteLtd/vue-storefront/issues ")]),_vm._v("\n      for our Roadmap!\n    ")],1)])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./_theme/pages/MyAccount/LoyaltyCard.vue?vue&type=template&id=c33b6a5a&scoped=true&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/SfTabs.vue + 9 modules
var SfTabs = __webpack_require__(233);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfLink/SfLink.vue + 4 modules
var SfLink = __webpack_require__(14);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/MyAccount/LoyaltyCard.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var LoyaltyCardvue_type_script_lang_js_ = ({
  name: 'LoyalityCard',
  components: {
    SfTabs: SfTabs["a" /* default */],
    SfLink: SfLink["a" /* default */]
  }
});
// CONCATENATED MODULE: ./_theme/pages/MyAccount/LoyaltyCard.vue?vue&type=script&lang=js&
 /* harmony default export */ var MyAccount_LoyaltyCardvue_type_script_lang_js_ = (LoyaltyCardvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./_theme/pages/MyAccount/LoyaltyCard.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(288)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  MyAccount_LoyaltyCardvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "c33b6a5a",
  "6a75af9d"
  
)

/* harmony default export */ var LoyaltyCard = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/MyAccount/MyNewsletter.vue?vue&type=template&id=826a330c&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('SfTabs',{staticClass:"tab-orphan",attrs:{"open-tab":1}},[_c('SfTab',{attrs:{"data-cy":"my-newsletter-tab","title":"My newsletter"}},[_c('p',{staticClass:"message"},[_vm._v("\n      "+_vm._s(_vm.$t('Set up newsletter'))+"\n    ")]),_vm._v(" "),_c('div',{staticClass:"form"},[_c('p',{staticClass:"form__title"},[_vm._v(_vm._s(_vm.$t('Sections that interest you')))]),_vm._v(" "),_c('div',{staticClass:"form__checkbox-group"},[_c('SfCheckbox',{staticClass:"form__element",attrs:{"label":"Woman","value":"woman"},model:{value:(_vm.newsletter),callback:function ($$v) {_vm.newsletter=$$v},expression:"newsletter"}}),_vm._v(" "),_c('SfCheckbox',{staticClass:"form__element",attrs:{"label":"Man","value":"man"},model:{value:(_vm.newsletter),callback:function ($$v) {_vm.newsletter=$$v},expression:"newsletter"}}),_vm._v(" "),_c('SfCheckbox',{staticClass:"form__element",attrs:{"label":"Kids","value":"kids"},model:{value:(_vm.newsletter),callback:function ($$v) {_vm.newsletter=$$v},expression:"newsletter"}})],1),_vm._v(" "),_c('SfButton',{staticClass:"form__button",attrs:{"data-cy":"newsletter-btn_join"}},[_vm._v(_vm._s(_vm.$t('Save changes')))])],1),_vm._v(" "),_c('p',{staticClass:"notice"},[_vm._v("\n      "+_vm._s(_vm.$t('Read and understand'))+" "),_c('SfLink',{staticClass:"notice__link",attrs:{"href":"#"}},[_vm._v(_vm._s(_vm.$t('Privacy')))]),_vm._v(" and\n      "),_c('SfLink',{staticClass:"notice__link",attrs:{"href":"#"}},[_vm._v(_vm._s(_vm.$t('Cookies Policy')))]),_vm._v(" "+_vm._s(_vm.$t('Commercial information'))+"\n    ")],1)])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./_theme/pages/MyAccount/MyNewsletter.vue?vue&type=template&id=826a330c&scoped=true&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/SfTabs.vue + 9 modules
var SfTabs = __webpack_require__(233);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfCheckbox/SfCheckbox.vue + 4 modules
var SfCheckbox = __webpack_require__(214);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue + 4 modules
var SfButton = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfLink/SfLink.vue + 4 modules
var SfLink = __webpack_require__(14);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/MyAccount/MyNewsletter.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var MyNewslettervue_type_script_lang_js_ = ({
  name: 'MyNewsletter',
  components: {
    SfTabs: SfTabs["a" /* default */],
    SfCheckbox: SfCheckbox["a" /* default */],
    SfButton: SfButton["a" /* default */],
    SfLink: SfLink["a" /* default */]
  },

  data() {
    return {
      newsletter: []
    };
  }

});
// CONCATENATED MODULE: ./_theme/pages/MyAccount/MyNewsletter.vue?vue&type=script&lang=js&
 /* harmony default export */ var MyAccount_MyNewslettervue_type_script_lang_js_ = (MyNewslettervue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./_theme/pages/MyAccount/MyNewsletter.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(290)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  MyAccount_MyNewslettervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "826a330c",
  "401e19ee"
  
)

/* harmony default export */ var MyNewsletter = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/MyAccount/OrderHistory.vue?vue&type=template&id=2e50212e&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('SfTabs',{attrs:{"open-tab":1}},[_c('SfTab',{attrs:{"data-cy":"order-history-tab_my-orders","title":"My orders"}},[(_vm.currentOrder)?_c('div',[_c('SfButton',{staticClass:"sf-button--text all-orders",attrs:{"data-cy":"order-history-btn_orders"},on:{"click":function($event){_vm.currentOrder = null}}},[_vm._v("All Orders")]),_vm._v(" "),_c('div',{staticClass:"highlighted highlighted--total"},[_c('SfProperty',{staticClass:"sf-property--full-width property",attrs:{"name":"Order ID","value":_vm.orderGetters.getId(_vm.currentOrder)}}),_vm._v(" "),_c('SfProperty',{staticClass:"sf-property--full-width property",attrs:{"name":"Date","value":_vm.orderGetters.getDate(_vm.currentOrder)}}),_vm._v(" "),_c('SfProperty',{staticClass:"sf-property--full-width property",attrs:{"name":"Status","value":_vm.orderGetters.getStatus(_vm.currentOrder)}}),_vm._v(" "),_c('SfProperty',{staticClass:"sf-property--full-width property",attrs:{"name":"Total","value":_vm.$n(_vm.orderGetters.getPrice(_vm.currentOrder), 'currency')}})],1),_vm._v(" "),_c('SfTable',{staticClass:"products"},[_c('SfTableHeading',[_c('SfTableHeader',{staticClass:"products__name"},[_vm._v(_vm._s(_vm.$t('Product')))]),_vm._v(" "),_c('SfTableHeader',[_vm._v(_vm._s(_vm.$t('Quantity')))]),_vm._v(" "),_c('SfTableHeader',[_vm._v(_vm._s(_vm.$t('Price')))])],1),_vm._v(" "),_vm._l((_vm.orderGetters.getItems(_vm.currentOrder)),function(item,i){return _c('SfTableRow',{key:i},[_c('SfTableData',{staticClass:"products__name"},[_c('nuxt-link',{attrs:{"to":'/p/'+_vm.orderGetters.getItemSku(item)+'/'+_vm.orderGetters.getItemSku(item)}},[_vm._v("\n              "+_vm._s(_vm.orderGetters.getItemName(item))+"\n            ")])],1),_vm._v(" "),_c('SfTableData',[_vm._v(_vm._s(_vm.orderGetters.getItemQty(item)))]),_vm._v(" "),_c('SfTableData',[_vm._v(_vm._s(_vm.$n(_vm.orderGetters.getItemPrice(item), 'currency')))])],1)})],2)],1):_c('div',[_c('p',{staticClass:"message"},[_vm._v("\n        "+_vm._s(_vm.$t('Details and status orders'))+"\n      ")]),_vm._v(" "),(_vm.orders.length === 0)?_c('div',{staticClass:"no-orders"},[_c('p',{staticClass:"no-orders__title"},[_vm._v(_vm._s(_vm.$t('You currently have no orders')))]),_vm._v(" "),_c('SfButton',{staticClass:"no-orders__button",attrs:{"data-cy":"order-history-btn_start"}},[_vm._v(_vm._s(_vm.$t('Start shopping')))])],1):_c('SfTable',{staticClass:"orders"},[_c('SfTableHeading',[_vm._l((_vm.tableHeaders),function(tableHeader){return _c('SfTableHeader',{key:tableHeader},[_vm._v(_vm._s(tableHeader))])}),_vm._v(" "),_c('SfTableHeader',{staticClass:"orders__element--right"},[_c('span',{staticClass:"smartphone-only"},[_vm._v(_vm._s(_vm.$t('Download')))]),_vm._v(" "),_c('SfButton',{staticClass:"desktop-only sf-button--text orders__download-all",attrs:{"data-cy":"order-history-btn_download-all"},on:{"click":function($event){return _vm.downloadOrders()}}},[_vm._v("\n              "+_vm._s(_vm.$t('Download all'))+"\n            ")])],1)],2),_vm._v(" "),_vm._l((_vm.orders),function(order){return _c('SfTableRow',{key:_vm.orderGetters.getId(order)},[_c('SfTableData',[_vm._v(_vm._s(_vm.orderGetters.getId(order)))]),_vm._v(" "),_c('SfTableData',[_vm._v(_vm._s(_vm.orderGetters.getDate(order)))]),_vm._v(" "),_c('SfTableData',[_vm._v(_vm._s(_vm.$n(_vm.orderGetters.getPrice(order), 'currency')))]),_vm._v(" "),_c('SfTableData',[_c('span',{class:_vm.getStatusTextClass(order)},[_vm._v(_vm._s(_vm.orderGetters.getStatus(order)))])]),_vm._v(" "),_c('SfTableData',{staticClass:"orders__view orders__element--right"},[_c('SfButton',{staticClass:"sf-button--text smartphone-only",attrs:{"data-cy":"order-history-btn_download"},on:{"click":function($event){return _vm.downloadOrder(order)}}},[_vm._v("\n              "+_vm._s(_vm.$t('Download'))+"\n            ")]),_vm._v(" "),_c('SfButton',{staticClass:"sf-button--text desktop-only",attrs:{"data-cy":"order-history-btn_view"},on:{"click":function($event){_vm.currentOrder = order}}},[_vm._v("\n              "+_vm._s(_vm.$t('View details'))+"\n            ")])],1)],1)})],2)],1)]),_vm._v(" "),_c('SfTab',{attrs:{"data-cy":"order-history-tab_returns","title":"Returns"}},[_c('p',{staticClass:"message"},[_vm._v("\n      This feature is not implemented yet! Please take a look at\n      "),_c('br'),_vm._v(" "),_c('SfLink',{staticClass:"message__link",attrs:{"href":"#"}},[_vm._v("https://github.com/DivanteLtd/vue-storefront/issues")]),_vm._v("\n      for our Roadmap!\n    ")],1)])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./_theme/pages/MyAccount/OrderHistory.vue?vue&type=template&id=2e50212e&scoped=true&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/SfTabs.vue + 9 modules
var SfTabs = __webpack_require__(233);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTable/SfTable.vue + 24 modules
var SfTable = __webpack_require__(323);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue + 4 modules
var SfButton = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfProperty/SfProperty.vue + 4 modules
var SfProperty = __webpack_require__(222);

// EXTERNAL MODULE: external "@vue/composition-api"
var composition_api_ = __webpack_require__(2);

// EXTERNAL MODULE: ../composables/lib/index.es.js
var index_es = __webpack_require__(8);

// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/packages/core/core/lib/index.es.js
var lib_index_es = __webpack_require__(9);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/MyAccount/OrderHistory.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var OrderHistoryvue_type_script_lang_js_ = ({
  name: 'PersonalDetails',
  components: {
    SfTabs: SfTabs["a" /* default */],
    SfTable: SfTable["a" /* default */],
    SfButton: SfButton["a" /* default */],
    SfProperty: SfProperty["a" /* default */]
  },

  setup() {
    const {
      orders,
      search
    } = Object(index_es["p" /* useUserOrders */])();
    const currentOrder = Object(composition_api_["ref"])(null);
    Object(lib_index_es["onSSR"])(async () => {
      await search();
    });
    const tableHeaders = ['Order ID', 'Payment date', 'Amount', 'Status'];

    const getStatusTextClass = order => {
      const status = index_es["e" /* orderGetters */].getStatus(order);

      switch (status) {
        case lib_index_es["AgnosticOrderStatus"].Open:
          return 'text-warning';

        case lib_index_es["AgnosticOrderStatus"].Complete:
          return 'text-success';

        default:
          return '';
      }
    };

    const downloadFile = (file, name) => {
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      const url = window.URL.createObjectURL(file);
      a.href = url;
      a.download = name;
      a.click();
      window.URL.revokeObjectURL(url);
    };

    const downloadOrders = async () => {
      downloadFile(new Blob([JSON.stringify(orders.value)], {
        type: 'application/json'
      }), 'orders.json');
    };

    const downloadOrder = async order => {
      downloadFile(new Blob([JSON.stringify(order)], {
        type: 'application/json'
      }), 'order ' + index_es["e" /* orderGetters */].getId(order) + '.json');
    };

    return {
      tableHeaders,
      orders: Object(composition_api_["computed"])(() => orders ? orders.value : []),
      getStatusTextClass,
      orderGetters: index_es["e" /* orderGetters */],
      downloadOrder,
      downloadOrders,
      currentOrder
    };
  }

});
// CONCATENATED MODULE: ./_theme/pages/MyAccount/OrderHistory.vue?vue&type=script&lang=js&
 /* harmony default export */ var MyAccount_OrderHistoryvue_type_script_lang_js_ = (OrderHistoryvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./_theme/pages/MyAccount/OrderHistory.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(292)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  MyAccount_OrderHistoryvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "2e50212e",
  "1b633b4f"
  
)

/* harmony default export */ var OrderHistory = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/MyAccount/MyReviews.vue?vue&type=template&id=87f882b0&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('SfTabs',{staticClass:"tab-orphan",attrs:{"open-tab":1}},[_c('SfTab',{attrs:{"data-cy":"my-reviews-tab","title":"My reviews"}},[_c('p',{staticClass:"message"},[_vm._v("\n       This feature is not implemented yet! Please take a look at\n      "),_c('br'),_vm._v(" "),_c('SfLink',{staticClass:"message__link",attrs:{"href":"#"}},[_vm._v("https://github.com/DivanteLtd/vue-storefront/issues ")]),_vm._v("\n      for our Roadmap!\n    ")],1)])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./_theme/pages/MyAccount/MyReviews.vue?vue&type=template&id=87f882b0&scoped=true&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/SfTabs.vue + 9 modules
var SfTabs = __webpack_require__(233);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfLink/SfLink.vue + 4 modules
var SfLink = __webpack_require__(14);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/MyAccount/MyReviews.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var MyReviewsvue_type_script_lang_js_ = ({
  name: 'MyReviews',
  components: {
    SfTabs: SfTabs["a" /* default */],
    SfLink: SfLink["a" /* default */]
  }
});
// CONCATENATED MODULE: ./_theme/pages/MyAccount/MyReviews.vue?vue&type=script&lang=js&
 /* harmony default export */ var MyAccount_MyReviewsvue_type_script_lang_js_ = (MyReviewsvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./_theme/pages/MyAccount/MyReviews.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(294)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  MyAccount_MyReviewsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "87f882b0",
  "66f45736"
  
)

/* harmony default export */ var MyReviews = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/atoms/SfBreadcrumbs/SfBreadcrumbs.vue?vue&type=template&id=9118f690&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"sf-breadcrumbs",attrs:{"aria-label":"breadcrumb"}},[_vm._ssrNode("<ol class=\"sf-breadcrumbs__list\">","</ol>",_vm._l((_vm.breadcrumbs),function(breadcrumb,i){return _vm._ssrNode("<li"+(_vm._ssrAttr("aria-current",_vm.last === i && 'page'))+" class=\"sf-breadcrumbs__list-item\">","</li>",[(_vm.last !== i)?[_vm._t("link",[_c('SfLink',{staticClass:"sf-breadcrumbs__breadcrumb",attrs:{"link":breadcrumb.link}},[_vm._v(_vm._s(breadcrumb.text)+"\n          ")])],null,{ breadcrumb: breadcrumb })]:[_vm._t("current",[_c('SfLink',{staticClass:"sf-breadcrumbs__breadcrumb sf-breadcrumbs__breadcrumb--current",attrs:{"link":breadcrumb.link}},[_vm._v(_vm._s(breadcrumb.text))])],null,{ breadcrumb: breadcrumb })]],2)}),0)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfBreadcrumbs/SfBreadcrumbs.vue?vue&type=template&id=9118f690&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfLink/SfLink.vue + 4 modules
var SfLink = __webpack_require__(14);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/atoms/SfBreadcrumbs/SfBreadcrumbs.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SfBreadcrumbsvue_type_script_lang_js_ = ({
  name: "SfBreadcrumbs",
  components: {
    SfLink: SfLink["a" /* default */]
  },
  props: {
    /**
     * List of breadcrumbs (array of nested objects: `[ { text, route } ]`)
     */
    breadcrumbs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    last() {
      return this.breadcrumbs.length - 1;
    }

  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfBreadcrumbs/SfBreadcrumbs.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfBreadcrumbs_SfBreadcrumbsvue_type_script_lang_js_ = (SfBreadcrumbsvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfBreadcrumbs/SfBreadcrumbs.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(238)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  SfBreadcrumbs_SfBreadcrumbsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "068b122f"
  
)

/* harmony default export */ var SfBreadcrumbs = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfContentPages_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(316);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfContentPages_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfContentPages_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfContentPages_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfContentPages_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 371:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}.sf-content-page{font:var(--font-light) var(--font-base)/1.6 var(--font-family-primary);font:var(--content-pages-content-page-font,var(--content-pages-content-page-font-weight,var(--font-light)) var(--content-pages-content-page-font-size,var(--font-base))/var(--content-pages-content-page-font-line-height,1.6) var(--content-pages-content-page-font-family,var(--font-family-primary)))}.sf-content-pages{display:flex;flex-direction:column;height:100vh;height:var(--content-pages-height,100vh);overflow:hidden}.sf-content-pages__section{display:flex;flex:1;margin:var(--content-pages-section-margin,var(--spacer-base) 0);transition:transform .15s ease-in-out;transition:var(--content-pages-transition,transform .15s ease-in-out)}.sf-content-pages__section--is-active{transform:translate3d(-100%,0,0);transform:var(--content-pages-section-active-transform,translate3d(-100%,0,0))}.sf-content-pages__content,.sf-content-pages__sidebar{box-sizing:border-box;overflow-y:auto;height:calc(100vh - 5rem)}.sf-content-pages__sidebar{flex:0 0 100%;flex:var(--content-pages-sidebar-flex,0 0 100%);padding:var(--content-pages-sidebar-padding);background:var(--content-pages-sidebar-background)}.sf-content-pages__content{flex:0 0 100%;flex:var(--content-pages-content-flex,0 0 100%);padding:var(--content-pages-content-padding)}.sf-content-pages__title{margin:var(--content-pages-sidebar-title-margin,0 0 var(--spacer-xl) 0);font:var(--font-medium) var(--h3-font-size)/1.4 var(--font-family-secondary);font:var(--content-pages-sidebar-title-font,var(--content-pages-sidebar-title-font-weight,var(--font-medium)) var(--content-pages-sidebar-title-font-size,var(--h3-font-size))/var(--content-pages-sidebar-title-font-line-height,1.4) var(--content-pages-sidebar-title-font-family,var(--font-family-secondary)))}.sf-content-pages__category-title{margin:var(--content-pages-sidebar-category-title-margin,var(--spacer-sm) 0);font:var(--font-bold) var(--font-lg)/1.2 var(--font-family-secondary);font:var(--content-pages-sidebar-category-title-font,var(--content-pages-sidebar-category-title-font-weight,var(--font-bold)) var(--content-pages-sidebar-category-title-font-size,var(--font-lg))/var(--content-pages-sidebar-category-title-font-line-height,1.2) var(--content-pages-sidebar-category-title-font-family,var(--font-family-secondary)))}.sf-content-pages__list-item{--list-item-padding:var(--spacer-sm) var(--spacer-sm) var(--spacer-sm);--list-item-border-width:0 0 1px 0}@media (min-width:1024px){.sf-content-pages{--content-pages-section-active-transform:translateZ(0);--content-pages-sidebar-flex:0 0 26.875rem;--content-pages-sidebar-background:var(--c-light);--content-pages-content-flex:1;--content-pages-section-margin:0;--content-pages-sidebar-padding:var(--spacer-lg);--content-pages-content-padding:var(--spacer-lg)}.sf-content-pages__list-item{--list-item-padding:0;--list-item-margin:var(--spacer-base) 0;--list-item-border:0}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyAccount_vue_vue_type_style_index_0_id_2bfe29ff_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(317);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyAccount_vue_vue_type_style_index_0_id_2bfe29ff_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyAccount_vue_vue_type_style_index_0_id_2bfe29ff_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyAccount_vue_vue_type_style_index_0_id_2bfe29ff_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_MyAccount_vue_vue_type_style_index_0_id_2bfe29ff_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 373:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only[data-v-2bfe29ff]{display:none!important}}@media (max-width:1023px){.desktop-only[data-v-2bfe29ff]{display:none!important}}#my-account[data-v-2bfe29ff]{box-sizing:border-box}@media (min-width:1024px){#my-account[data-v-2bfe29ff]{max-width:1240px;margin:0 auto}}@media (max-width:1023px){.my-account[data-v-2bfe29ff]{--content-pages-sidebar-category-title-font-weight:var(--font-weight--normal);--content-pages-sidebar-category-title-margin:var(--spacer-sm) var(--spacer-sm) var(--spacer-sm) var(--spacer-base)}}@media (min-width:1024px){.my-account[data-v-2bfe29ff]{--content-pages-sidebar-category-title-margin:var(--spacer-xl) 0 0 0}}.breadcrumbs[data-v-2bfe29ff]{margin:var(--spacer-base) 0 var(--spacer-lg)}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/MyAccount.vue?vue&type=template&id=2bfe29ff&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"my-account"}},[_c('SfBreadcrumbs',{staticClass:"breadcrumbs desktop-only",attrs:{"breadcrumbs":_vm.breadcrumbs}}),_vm._ssrNode(" "),_c('SfContentPages',{staticClass:"my-account",attrs:{"data-cy":"my-account_content-pages","title":"My Account","active":_vm.activePage},on:{"click:change":_vm.changeActivePage}},[_c('SfContentCategory',{attrs:{"title":"Personal Details"}},[_c('SfContentPage',{attrs:{"data-cy":"my-account-page_my-profile","title":"My profile"}},[_c('MyProfile')],1),_vm._v(" "),_c('SfContentPage',{attrs:{"data-cy":"my-account-page_shipping-details","title":"Shipping details"}},[_c('ShippingDetails')],1),_vm._v(" "),_c('SfContentPage',{attrs:{"data-cy":"my-account-page_billing-details","title":"Billing details"}},[_c('BillingDetails')],1),_vm._v(" "),_c('SfContentPage',{attrs:{"data-cy":"my-account-page_loyalty-card","title":"Loyalty card"}},[_c('LoyaltyCard')],1),_vm._v(" "),_c('SfContentPage',{attrs:{"data-cy":"my-account-page_my-newsletter","title":"My newsletter"}},[_c('MyNewsletter')],1)],1),_vm._v(" "),_c('SfContentCategory',{attrs:{"title":"Order details"}},[_c('SfContentPage',{attrs:{"data-cy":"my-account-page_order-history","title":"Order history"}},[_c('OrderHistory')],1),_vm._v(" "),_c('SfContentPage',{attrs:{"data-cy":"my-account-page_my-reviews","title":"My reviews"}},[_c('MyReviews')],1)],1),_vm._v(" "),_c('SfContentPage',{attrs:{"data-cy":"my-account-page_log-out","title":"Log out"}})],1)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./_theme/pages/MyAccount.vue?vue&type=template&id=2bfe29ff&scoped=true&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfBreadcrumbs/SfBreadcrumbs.vue + 4 modules
var SfBreadcrumbs = __webpack_require__(333);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfContentPages/SfContentPages.vue?vue&type=template&id=2ec103a2&
var SfContentPagesvue_type_template_id_2ec103a2_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sf-content-pages"},[_c('SfBar',{staticClass:"mobile-only",attrs:{"back":_vm.isActive,"title":_vm.active ? _vm.active : _vm.title},on:{"click:back":function($event){return _vm.updatePage()}}}),_vm._ssrNode(" "),_vm._ssrNode("<section"+(_vm._ssrClass("sf-content-pages__section",{ 'sf-content-pages__section--is-active': _vm.isActive }))+">","</section>",[_vm._ssrNode("<div class=\"sf-content-pages__sidebar\">","</div>",[_vm._ssrNode("<h1 class=\"sf-content-pages__title desktop-only\">"+_vm._ssrEscape(_vm._s(_vm.title))+"</h1> "),_vm._l((_vm.categories),function(category,key){return _vm._ssrNode("<div>","</div>",[_vm._ssrNode(((category.title)?("<h2 class=\"sf-content-pages__category-title\">"+_vm._ssrEscape("\n          "+_vm._s(category.title)+"\n        ")+"</h2>"):"<!---->")+" "),_c('SfList',{staticClass:"sf-content-pages__list"},_vm._l((category.items),function(page,itemKey){return _c('SfListItem',{key:((page.title) + "-" + itemKey),staticClass:"sf-content-pages__list-item"},[_vm._t("menu-item",[_c('SfMenuItem',{staticClass:"sf-content-pages__menu",class:{ 'sf-menu-item--is-active': page.title === _vm.active },attrs:{"label":page.title},on:{"click":function($event){return _vm.updatePage(page.title)}},scopedSlots:_vm._u([{key:"icon",fn:function(){return [(page.icon)?_c('SfIcon',{staticClass:"sf-menu-item__icon",attrs:{"icon":page.icon,"color":"#686d7d","size":"xxs"}}):_vm._e()]},proxy:true}],null,true)})],null,{ updatePage: _vm.updatePage, page: page, active: _vm.active })],2)}),1)],2)})],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"sf-content-pages__content\">","</div>",[_vm._t("default")],2)],2)],2)}
var SfContentPagesvue_type_template_id_2ec103a2_staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfContentPages/SfContentPages.vue?vue&type=template&id=2ec103a2&

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(3);
var external_vue_default = /*#__PURE__*/__webpack_require__.n(external_vue_);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfContentPages/_internal/SfContentPage.vue?vue&type=template&id=2da34dfd&
var SfContentPagevue_type_template_id_2da34dfd_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isActive)?_c('div',{staticClass:"sf-content-page"},[_vm._t("default")],2):_vm._e()}
var SfContentPagevue_type_template_id_2da34dfd_staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfContentPages/_internal/SfContentPage.vue?vue&type=template&id=2da34dfd&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfContentPages/_internal/SfContentPage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
/* harmony default export */ var SfContentPagevue_type_script_lang_js_ = ({
  name: "SfContentPage",
  props: {
    /**
     * Page title
     */
    title: {
      type: String,
      default: ""
    },

    /**
     * Page nav title
     */
    icon: {
      type: [String, Array],
      default: ""
    }
  },
  inject: ["provided"],
  computed: {
    isActive() {
      return this.provided.active === this.title;
    }

  },

  mounted() {
    const item = {
      title: this.title,
      icon: this.icon
    };
    this.$parent.items.push(item);
  }

});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfContentPages/_internal/SfContentPage.vue?vue&type=script&lang=js&
 /* harmony default export */ var _internal_SfContentPagevue_type_script_lang_js_ = (SfContentPagevue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfContentPages/_internal/SfContentPage.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  _internal_SfContentPagevue_type_script_lang_js_,
  SfContentPagevue_type_template_id_2da34dfd_render,
  SfContentPagevue_type_template_id_2da34dfd_staticRenderFns,
  false,
  null,
  null,
  "0068597e"
  
)

/* harmony default export */ var SfContentPage = (component.exports);
// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfContentPages/_internal/SfContentCategory.vue?vue&type=template&id=66a812ac&
var SfContentCategoryvue_type_template_id_66a812ac_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sf-content-category"},[_vm._t("default")],2)}
var SfContentCategoryvue_type_template_id_66a812ac_staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfContentPages/_internal/SfContentCategory.vue?vue&type=template&id=66a812ac&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfContentPages/_internal/SfContentCategory.vue?vue&type=script&lang=js&
//
//
//
//
//
/* harmony default export */ var SfContentCategoryvue_type_script_lang_js_ = ({
  name: "SfContentCategory",
  props: {
    /**
     * Category title
     */
    title: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      items: []
    };
  },

  mounted() {
    const item = {
      title: this.title,
      items: this.items
    };
    this.$parent.items.push(item);
  },

  methods: {}
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfContentPages/_internal/SfContentCategory.vue?vue&type=script&lang=js&
 /* harmony default export */ var _internal_SfContentCategoryvue_type_script_lang_js_ = (SfContentCategoryvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfContentPages/_internal/SfContentCategory.vue





/* normalize component */

var SfContentCategory_component = Object(componentNormalizer["a" /* default */])(
  _internal_SfContentCategoryvue_type_script_lang_js_,
  SfContentCategoryvue_type_template_id_66a812ac_render,
  SfContentCategoryvue_type_template_id_66a812ac_staticRenderFns,
  false,
  null,
  null,
  "282220ed"
  
)

/* harmony default export */ var SfContentCategory = (SfContentCategory_component.exports);
// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfList/SfList.vue + 9 modules
var SfList = __webpack_require__(213);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfMenuItem/SfMenuItem.vue + 4 modules
var SfMenuItem = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfIcon/SfIcon.vue + 6 modules
var SfIcon = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfBar/SfBar.vue + 4 modules
var SfBar = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/utilities/mobile-observer.js
var mobile_observer = __webpack_require__(17);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/organisms/SfContentPages/SfContentPages.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



external_vue_default.a.component("SfContentPage", SfContentPage);
external_vue_default.a.component("SfContentCategory", SfContentCategory);





/* harmony default export */ var SfContentPagesvue_type_script_lang_js_ = ({
  name: "SfContentPages",
  components: {
    SfList: SfList["a" /* default */],
    SfMenuItem: SfMenuItem["a" /* default */],
    SfIcon: SfIcon["a" /* default */],
    SfBar: SfBar["a" /* default */]
  },
  props: {
    /**
     * Pages title
     */
    title: {
      type: String,
      default: ""
    },

    /**
     * Active page
     */
    active: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      items: []
    };
  },

  computed: { ...Object(mobile_observer["a" /* mapMobileObserver */])(),

    categories() {
      const items = [];
      const orphans = {
        items: []
      };

      const reduceOrphans = () => {
        if (orphans.items.length > 0) {
          const category = { ...orphans
          };
          items.push(category);
          orphans.items = [];
        }
      };

      this.items.forEach(item => {
        if (item.items) {
          reduceOrphans();
          const category = { ...item
          };
          items.push(category);
          return;
        }

        orphans.items.push(item);
      });
      reduceOrphans();
      return items;
    },

    isActive() {
      return this.active.length > 0;
    }

  },

  provide() {
    const provided = {};
    Object.defineProperty(provided, "active", {
      get: () => this.active
    });
    return {
      provided
    };
  },

  watch: {
    isMobile(mobile) {
      if (mobile) {
        this.$emit("click:change", "");
        return;
      }

      this.$emit("click:change", this.categories[0].items[0].title);
    }

  },

  beforeDestroy() {
    Object(mobile_observer["b" /* unMapMobileObserver */])();
  },

  methods: {
    updatePage(title) {
      /**
       * Active page updated event
       *
       * @event click:change
       * @type String
       */
      this.$emit("click:change", title);
    }

  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfContentPages/SfContentPages.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfContentPages_SfContentPagesvue_type_script_lang_js_ = (SfContentPagesvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfContentPages/SfContentPages.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(370)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var SfContentPages_component = Object(componentNormalizer["a" /* default */])(
  SfContentPages_SfContentPagesvue_type_script_lang_js_,
  SfContentPagesvue_type_template_id_2ec103a2_render,
  SfContentPagesvue_type_template_id_2ec103a2_staticRenderFns,
  false,
  injectStyles,
  null,
  "a61e84dc"
  
)

/* harmony default export */ var SfContentPages = (SfContentPages_component.exports);
// EXTERNAL MODULE: external "@vue/composition-api"
var composition_api_ = __webpack_require__(2);

// EXTERNAL MODULE: ../composables/lib/index.es.js
var index_es = __webpack_require__(8);

// EXTERNAL MODULE: ./_theme/pages/MyAccount/MyProfile.vue + 14 modules
var MyProfile = __webpack_require__(324);

// EXTERNAL MODULE: ./_theme/pages/MyAccount/ShippingDetails.vue + 14 modules
var ShippingDetails = __webpack_require__(325);

// EXTERNAL MODULE: ./_theme/pages/MyAccount/BillingDetails.vue + 14 modules
var BillingDetails = __webpack_require__(326);

// EXTERNAL MODULE: ./_theme/pages/MyAccount/LoyaltyCard.vue + 4 modules
var LoyaltyCard = __webpack_require__(327);

// EXTERNAL MODULE: ./_theme/pages/MyAccount/MyNewsletter.vue + 4 modules
var MyNewsletter = __webpack_require__(328);

// EXTERNAL MODULE: ./_theme/pages/MyAccount/OrderHistory.vue + 4 modules
var OrderHistory = __webpack_require__(329);

// EXTERNAL MODULE: ./_theme/pages/MyAccount/MyReviews.vue + 4 modules
var MyReviews = __webpack_require__(330);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/MyAccount.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










/* harmony default export */ var MyAccountvue_type_script_lang_js_ = ({
  name: 'MyAccount',
  components: {
    SfBreadcrumbs: SfBreadcrumbs["a" /* default */],
    SfContentPages: SfContentPages,
    MyProfile: MyProfile["default"],
    ShippingDetails: ShippingDetails["default"],
    BillingDetails: BillingDetails["default"],
    LoyaltyCard: LoyaltyCard["default"],
    MyNewsletter: MyNewsletter["default"],
    OrderHistory: OrderHistory["default"],
    MyReviews: MyReviews["default"]
  },

  setup(props, context) {
    const {
      $router,
      $route
    } = context.root;
    const {
      logout
    } = Object(index_es["n" /* useUser */])();
    const activePage = Object(composition_api_["computed"])(() => {
      const {
        pageName
      } = $route.params;

      if (pageName) {
        return (pageName.charAt(0).toUpperCase() + pageName.slice(1)).replace('-', ' ');
      }

      return 'My profile';
    });

    const changeActivePage = async title => {
      if (title === 'Log out') {
        await logout();
        $router.push('/');
        return;
      }

      $router.push(`/my-account/${(title || '').toLowerCase().replace(' ', '-')}`);
    };

    return {
      changeActivePage,
      activePage
    };
  },

  data() {
    return {
      breadcrumbs: [{
        text: 'Home',
        route: {
          link: '#'
        }
      }, {
        text: 'My Account',
        route: {
          link: '#'
        }
      }]
    };
  }

});
// CONCATENATED MODULE: ./_theme/pages/MyAccount.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_MyAccountvue_type_script_lang_js_ = (MyAccountvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./_theme/pages/MyAccount.vue



function MyAccount_injectStyles (context) {
  
  var style0 = __webpack_require__(372)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var MyAccount_component = Object(componentNormalizer["a" /* default */])(
  pages_MyAccountvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  MyAccount_injectStyles,
  "2bfe29ff",
  "36991954"
  
)

/* harmony default export */ var MyAccount = __webpack_exports__["default"] = (MyAccount_component.exports);

/***/ })

};;
//# sourceMappingURL=MyAccount.js.map