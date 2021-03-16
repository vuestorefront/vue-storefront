exports.ids = [12];
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

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(259);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("3ae5aba8", content, true, context)
};

/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(261);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("d4f8b33c", content, true, context)
};

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

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfColor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(234);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfColor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfColor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfColor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfColor_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}.sf-color{box-sizing:border-box;position:relative;width:2.5rem;width:var(--color-width,var(--color-size,2.5rem));height:2.5rem;height:var(--color-height,var(--color-size,2.5rem));background:var(--color-background);border-radius:var(--color-border-radius);--color-box-shadow-opacity:0;--color-box-shadow-transition-duration:150ms;transition:transform .15s linear}.sf-color:before{content:\"\";position:absolute;z-index:-1;top:0;left:0;width:100%;height:100%;border-radius:inherit;transition:opacity .2s ease-in-out,box-shadow .2s ease-in-out;transition:var(--color-box-shadow-transition,opacity var(--color-box-shadow-transition-opacity-duration,.2s) var(--color-box-shadow-transition-opacity-timing-function,ease-in-out),box-shadow var(--color-box-shadow-transition-box-shadow-duration,.2s) var(--color-box-shadow-transition-box-shadow-timing-function,ease-in-out));opacity:var(--color-box-shadow-opacity);box-shadow:0 4px 4px 0 var(--c-black);box-shadow:var(--color-box-shadow,var(--color-box-shadow-h-offset,0) var(--color-box-shadow-v-offset,4px) var(--color-box-shadow-blur,4px) var(--color-box-shadow-spread,0) var(--color-box-shadow-color,var(--c-black)));will-change:opacity,box-shadow}.sf-color__badge{--badge-padding:var(--spacer-xs);--badge-border-radius:100%;position:absolute;top:-25%;right:-25%}@media (min-width:1024px){.sf-color{--color-size:0.75rem}.sf-color--active,.sf-color:hover{transform:scale(1.667)}.sf-color:hover{--color-box-shadow-opacity:0.25}.sf-color:active{--color-box-shadow:none}}.sf-color--rounded{--color-border-radius:100%}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfAddToCart_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(235);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfAddToCart_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfAddToCart_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfAddToCart_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfAddToCart_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}.sf-add-to-cart{display:flex}.sf-add-to-cart__button{--button-font-weight:var(--font-semibold);--button-width:100%;align-items:center}.sf-add-to-cart__button:disabled{color:var(--c-text-disabled)}.sf-add-to-cart__select-quantity{--add-to-cart-select-quantity-margin:0 var(--spacer-sm) 0 0;flex:none;margin:var(--add-to-cart-select-quantity-margin,0 0 0 var(--spacer-xs))}@media (min-width:1024px){.sf-add-to-cart{--add-to-cart-select-quantity-display:flex}}", ""]);
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

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(375);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("bbfd859e", content, true, context)
};

/***/ }),

/***/ 319:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(377);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("6234faa4", content, true, context)
};

/***/ }),

/***/ 320:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(379);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("5c63f1d2", content, true, context)
};

/***/ }),

/***/ 321:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(381);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("65ffe834", content, true, context)
};

/***/ }),

/***/ 322:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(383);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("11f205c4", content, true, context)
};

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/atoms/SfColor/SfColor.vue?vue&type=template&id=7d0fbce1&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('SfButton',_vm._g({staticClass:"sf-button--pure sf-color",class:{ 'sf-color--active': _vm.selected },style:(_vm.style),attrs:{"aria-pressed":_vm.selected.toString()}},_vm.$listeners),[_c('transition',{attrs:{"name":"sf-bounce"}},[_vm._t("badge",[(_vm.selected && _vm.hasBadge)?_c('SfBadge',{staticClass:"sf-color__badge mobile-only"},[_c('SfIcon',{attrs:{"aria-hidden":"true","icon":"check","size":"8px","color":"white"}})],1):_vm._e()],null,{ selected: _vm.selected, hasBadge: _vm.hasBadge })],2)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfColor/SfColor.vue?vue&type=template&id=7d0fbce1&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfBadge/SfBadge.vue + 4 modules
var SfBadge = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfIcon/SfIcon.vue + 6 modules
var SfIcon = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue + 4 modules
var SfButton = __webpack_require__(7);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/atoms/SfColor/SfColor.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var SfColorvue_type_script_lang_js_ = ({
  name: "SfColor",
  components: {
    SfBadge: SfBadge["a" /* default */],
    SfIcon: SfIcon["a" /* default */],
    SfButton: SfButton["a" /* default */]
  },
  props: {
    color: {
      type: String,
      default: ""
    },
    selected: {
      type: Boolean,
      default: false
    },
    hasBadge: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    style() {
      return {
        "--color-background": this.color
      };
    }

  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfColor/SfColor.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfColor_SfColorvue_type_script_lang_js_ = (SfColorvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfColor/SfColor.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(258)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  SfColor_SfColorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "09fdcd56"
  
)

/* harmony default export */ var SfColor = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/molecules/SfAddToCart/SfAddToCart.vue?vue&type=template&id=1e13d9b3&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sf-add-to-cart"},[_vm._t("quantity-select-input",[_c('SfQuantitySelector',{staticClass:"sf-add-to-cart__select-quantity",attrs:{"qty":_vm.qty,"aria-label":"Quantity","disabled":_vm.disabled},on:{"input":function($event){return _vm.$emit('input', $event)}}})],null,{ qty: _vm.qty }),_vm._ssrNode(" "),_vm._t("add-to-cart-btn",[_c('SfButton',_vm._g({staticClass:"sf-add-to-cart__button",attrs:{"disabled":_vm.disabled}},_vm.$listeners),[_vm._v("\n      Add to cart\n    ")])])],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfAddToCart/SfAddToCart.vue?vue&type=template&id=1e13d9b3&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue + 4 modules
var SfButton = __webpack_require__(7);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfQuantitySelector/SfQuantitySelector.vue + 4 modules
var SfQuantitySelector = __webpack_require__(41);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/molecules/SfAddToCart/SfAddToCart.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var SfAddToCartvue_type_script_lang_js_ = ({
  name: "SfAddToCart",
  components: {
    SfButton: SfButton["a" /* default */],
    SfQuantitySelector: SfQuantitySelector["a" /* default */]
  },
  model: {
    prop: "qty"
  },
  props: {
    /**
     * Boolean to indicate whether product
     * can be added to cart
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * Selected quantity
     */
    qty: {
      type: [Number, String],
      default: 1
    }
  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfAddToCart/SfAddToCart.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfAddToCart_SfAddToCartvue_type_script_lang_js_ = (SfAddToCartvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfAddToCart/SfAddToCart.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(260)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  SfAddToCart_SfAddToCartvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "e0ae151c"
  
)

/* harmony default export */ var SfAddToCart = __webpack_exports__["a"] = (component.exports);

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

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_RelatedProducts_vue_vue_type_style_index_0_id_0ccd858e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(318);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_RelatedProducts_vue_vue_type_style_index_0_id_0ccd858e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_RelatedProducts_vue_vue_type_style_index_0_id_0ccd858e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_RelatedProducts_vue_vue_type_style_index_0_id_0ccd858e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_RelatedProducts_vue_vue_type_style_index_0_id_0ccd858e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 375:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only[data-v-0ccd858e]{display:none!important}}@media (max-width:1023px){.desktop-only[data-v-0ccd858e]{display:none!important}}.section[data-v-0ccd858e]{margin-top:var(--spacer-base)}.carousel[data-v-0ccd858e]{margin:0 calc(var(--spacer-sm)*-1) 0 0}@media (min-width:1024px){.carousel[data-v-0ccd858e]{margin:0}}.carousel__item[data-v-0ccd858e]{margin:1.9375rem 0 2.4375rem}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfGallery_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(319);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfGallery_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfGallery_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfGallery_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfGallery_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 377:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}.sf-gallery{display:flex;flex-direction:column;flex-direction:var(--gallery-flex-direction,column)}.sf-gallery__thumbs{display:flex;display:var(--gallery-thumbs-display,flex);flex:var(--gallery-thumbs-flex);flex-direction:var(--gallery-thumbs-flex-direction);margin:var(--gallery-thumbs-margin,var(--spacer-xs) 0 0 0);order:var(--gallery-thumbs-order);overflow:auto}.sf-gallery__thumbs::-webkit-scrollbar{width:0}.sf-gallery__item{display:flex;flex:0 0 10rem;flex:0 0 var(--gallery-thumb-width,10rem);margin:var(--gallery-item-margin,0 var(--spacer-xs) 0 0);opacity:.5;opacity:var(--gallery-item-opacity,.5);transition:opacity .15s ease-in-out;transition:var(--gallery-item-transition,opacity .15s ease-in-out);cursor:pointer;cursor:var(--gallery-item-cursor,pointer)}.sf-gallery__item:last-child{--gallery-item-margin:0}.sf-gallery__item--selected{--gallery-item-opacity:1;--gallery-item-cursor:default}.sf-gallery__thumb{width:calc(10rem*1px);width:var(--gallery-thumb-width,calc(var(--_image-width, 10rem)*1px));height:calc(10rem*1px);height:var(--gallery-thumb-height,calc(var(--_image-height, 10rem)*1px))}.sf-gallery__stage{flex:1;max-width:26.375rem;max-width:var(--gallery-stage-width,26.375rem)}.sf-gallery .glide__slide{flex:1;display:flex}.sf-gallery .glide__slides{margin:0}@media (min-width:1024px){.sf-gallery{--gallery-flex-direction:row;--gallery-thumbs-flex:0 0 var(--gallery-thumb-width,10rem);--gallery-thumbs-flex-direction:column;--gallery-thumbs-order:-1;--gallery-thumbs-margin:0 var(--spacer-xs) 0 0;--gallery-item-margin:0 0 var(--spacer-xs) 0}.sf-gallery__item:last-child{--gallery-item-margin:0}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfSticky_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(320);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfSticky_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfSticky_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfSticky_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfSticky_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 379:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}@media (min-width:1024px){.sf-sticky{position:-webkit-sticky;position:sticky;position:var(--sticky-position,sticky);top:0;top:var(--sticky-top,0);bottom:auto;bottom:var(--sticky-bottom,auto)}.sf-sticky--sticky{--sticky-position:fixed;--sticky-top:0}.sf-sticky--bound{--sticky-position:absolute;--sticky-top:auto;--sticky-bottom:0}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfReview_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(321);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfReview_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfReview_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfReview_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_SfReview_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 381:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only{display:none!important}}@media (max-width:1023px){.desktop-only{display:none!important}}.sf-review{position:relative;display:block;display:var(--review-display,block)}.sf-review__icon{--icon-size:0.85rem;--icon-color:var(--c-primary);margin:var(--review-icon-margin,0 var(--spacer-xs) 0 0)}.sf-review__author{display:flex;align-items:center;color:var(--c-text);color:var(--review-author-color,var(--c-text));font:var(--font-medium) var(--font-sm)/1.6 var(--font-family-primary);font:var(--review-author-font,var(--review-author-font-weight,var(--font-medium)) var(--review-author-font-size,var(--font-sm))/var(--review-author-font-line-height,1.6) var(--review-author-font-family,var(--font-family-primary)));text-transform:capitalize;text-transform:var(--review-author-text-transform,capitalize)}.sf-review__rating{display:inline-block;display:var(--review-rating-display,inline-block)}.sf-review__info{margin:var(--review-info-margin,var(--spacer-2xs) 0 0 0)}.sf-review__date{display:inline;margin:var(--review-date-margin,0 0 0 var(--spacer-xs));text-transform:capitalize;text-transform:var(--review-date-text-transform,capitalize);color:var(--c-text);color:var(--review-date-color,var(--c-text));font:var(--font-normal) var(--font-sm)/1.6 var(--font-family-secondary);font:var(--review-date-font,var(--review-date-font-weight,var(--font-normal)) var(--review-date-font-size,var(--font-sm))/var(--review-date-font-line-height,1.6) var(--review-date-font-family,var(--font-family-secondary)))}.sf-review__message{display:inline;display:var(--review-message-display,inline);margin:var(--review-message-margin,var(--spacer-sm) 0);color:var(--c-text);color:var(--review-message-color,var(--c-text));vertical-align:middle;font:var(--font-light) var(--font-base)/1.6 var(--font-family-primary);font:var(--review-message-font,var(--review-message-font-weight,var(--font-light)) var(--review-message-font-size,var(--font-base))/var(--review-message-font-line-height,1.6) var(--review-message-font-family,var(--font-family-primary)))}.sf-review__read-more{margin:0 0 0 8px;vertical-align:middle}@media (min-width:1024px){.sf-review{--review-message-display:inline-block;--review-read-more-margin:0 0 0 var(--spacer-xs)}}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Product_vue_vue_type_style_index_0_id_8aa923e6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(322);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Product_vue_vue_type_style_index_0_id_8aa923e6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Product_vue_vue_type_style_index_0_id_8aa923e6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Product_vue_vue_type_style_index_0_id_8aa923e6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_vue_loader_lib_index_js_vue_loader_options_Product_vue_vue_type_style_index_0_id_8aa923e6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "@media (min-width:1024px){.mobile-only[data-v-8aa923e6]{display:none!important}}@media (max-width:1023px){.desktop-only[data-v-8aa923e6]{display:none!important}}#product[data-v-8aa923e6]{box-sizing:border-box}@media (min-width:1024px){#product[data-v-8aa923e6]{max-width:1272px;margin:0 auto}}@media (min-width:1024px){.product[data-v-8aa923e6]{display:flex}}.product__info[data-v-8aa923e6]{margin:var(--spacer-sm) auto}@media (min-width:1024px){.product__info[data-v-8aa923e6]{max-width:32.625rem;margin:0 0 0 7.5rem}}.product__header[data-v-8aa923e6]{--heading-title-color:var(--c-link);--heading-title-font-weight:var(--font-weight--bold);--heading-padding:0;margin:0 var(--spacer-sm);display:flex;justify-content:space-between}@media (min-width:1024px){.product__header[data-v-8aa923e6]{--heading-title-font-weight:var(--font-weight--semibold);margin:0 auto}}.product__drag-icon[data-v-8aa923e6]{-webkit-animation:moveicon-data-v-8aa923e6 1s ease-in-out infinite;animation:moveicon-data-v-8aa923e6 1s ease-in-out infinite}.product__price-and-rating[data-v-8aa923e6]{margin:0 var(--spacer-sm) var(--spacer-base);align-items:center}@media (min-width:1024px){.product__price-and-rating[data-v-8aa923e6]{display:flex;justify-content:space-between;margin:var(--spacer-sm) 0 var(--spacer-lg) 0}}.product__rating[data-v-8aa923e6]{display:flex;align-items:center;justify-content:flex-end;margin:var(--spacer-xs) 0 var(--spacer-xs)}.product__count[data-v-8aa923e6]{font:var(--font-weight--normal) var(--font-size--sm)/1.4 var(--font-family--secondary);font:var(--count-font,var(--count-font-weight,var(--font-weight--normal)) var(--count-font-size,var(--font-size--sm))/var(--count-font-line-height,1.4) var(--count-font-family,var(--font-family--secondary)));color:var(--c-text);text-decoration:none;margin:0 0 0 var(--spacer-xs)}.product__description[data-v-8aa923e6]{font:var(--font-weight--light) var(--font-size--base)/1.6 var(--font-family--primary);font:var(--product-description-font,var(--product-description-font-weight,var(--font-weight--light)) var(--product-description-font-size,var(--font-size--base))/var(--product-description-font-line-height,1.6) var(--product-description-font-family,var(--font-family--primary)))}.product__select-size[data-v-8aa923e6]{margin:0 var(--spacer-sm)}@media (min-width:1024px){.product__select-size[data-v-8aa923e6]{margin:0}}.product__colors[data-v-8aa923e6]{font:var(--font-weight--normal) var(--font-size--lg)/1.6 var(--font-family--secondary);font:var(--product-color-font,var(--product-color-font-weight,var(--font-weight--normal)) var(--product-color-font-size,var(--font-size--lg))/var(--product-color-font-line-height,1.6) var(--product-color-font-family,var(--font-family--secondary)));display:flex;align-items:center;margin-top:var(--spacer-xl)}.product__color-label[data-v-8aa923e6]{margin:0 var(--spacer-lg) 0 0}.product__color[data-v-8aa923e6]{margin:0 var(--spacer-2xs)}.product__add-to-cart[data-v-8aa923e6]{margin:var(--spacer-base) var(--spacer-sm) 0}@media (min-width:1024px){.product__add-to-cart[data-v-8aa923e6]{margin-top:var(--spacer-2xl)}}.product__compare[data-v-8aa923e6],.product__guide[data-v-8aa923e6],.product__save[data-v-8aa923e6]{display:block;margin:var(--spacer-xl) 0 var(--spacer-base) auto}.product__compare[data-v-8aa923e6]{margin-top:0}.product__tabs[data-v-8aa923e6]{margin:var(--spacer-lg) auto var(--spacer-2xl);--tabs-title-font-size:var(--font-size--lg)}@media (min-width:1024px){.product__tabs[data-v-8aa923e6]{margin-top:var(--spacer-2xl)}}.product__property[data-v-8aa923e6]{margin:var(--spacer-base) 0}.product__property__button[data-v-8aa923e6]{--button-font-size:var(--font-size--base)}.product__review[data-v-8aa923e6]{padding-bottom:24px;border-bottom:1px solid var(--c-light);margin-bottom:var(--spacer-base)}.product__additional-info[data-v-8aa923e6]{color:var(--c-link);font:var(--font-weight--light) var(--font-size--sm)/1.6 var(--font-family--primary);font:var(--additional-info-font,var(--additional-info-font-weight,var(--font-weight--light)) var(--additional-info-font-size,var(--font-size--sm))/var(--additional-info-font-line-height,1.6) var(--additional-info-font-family,var(--font-family--primary)))}.product__additional-info__title[data-v-8aa923e6]{font-weight:var(--font-weight--normal);font-size:var(--font-size--base);margin:0 0 var(--spacer-sm)}.product__additional-info__title[data-v-8aa923e6]:not(:first-child){margin-top:3.5rem}.product__additional-info__paragraph[data-v-8aa923e6]{margin:0}.product__gallery[data-v-8aa923e6]{flex:1}.breadcrumbs[data-v-8aa923e6]{margin:var(--spacer-base) auto var(--spacer-lg)}@-webkit-keyframes moveicon-data-v-8aa923e6{0%{transform:translateZ(0)}50%{transform:translate3d(0,30%,0)}to{transform:translateZ(0)}}@keyframes moveicon-data-v-8aa923e6{0%{transform:translateZ(0)}50%{transform:translate3d(0,30%,0)}to{transform:translateZ(0)}}", ""]);
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

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/Product.vue?vue&type=template&id=8aa923e6&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"product"}},[_c('SfBreadcrumbs',{staticClass:"breadcrumbs desktop-only",attrs:{"breadcrumbs":_vm.breadcrumbs}}),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"product\" data-v-8aa923e6>","</div>",[_c('LazyHydrate',{attrs:{"when-idle":""}},[_c('SfGallery',{staticClass:"product__gallery",attrs:{"images":_vm.productGallery}})],1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"product__info\" data-v-8aa923e6>","</div>",[_vm._ssrNode("<div class=\"product__header\" data-v-8aa923e6>","</div>",[_c('SfHeading',{staticClass:"sf-heading--no-underline sf-heading--left",attrs:{"title":_vm.productGetters.getName(_vm.product),"level":3}}),_vm._ssrNode(" "),_c('SfIcon',{staticClass:"product__drag-icon smartphone-only",attrs:{"icon":"drag","size":"xxl","color":"var(--c-text-disabled)"}})],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"product__price-and-rating\" data-v-8aa923e6>","</div>",[_c('SfPrice',{attrs:{"regular":_vm.$n(_vm.productGetters.getPrice(_vm.product).regular, 'currency'),"special":_vm.productGetters.getPrice(_vm.product).special && _vm.$n(_vm.productGetters.getPrice(_vm.product).special, 'currency')}}),_vm._ssrNode(" "),_vm._ssrNode("<div data-v-8aa923e6>","</div>",[_vm._ssrNode("<div class=\"product__rating\" data-v-8aa923e6>","</div>",[_c('SfRating',{attrs:{"score":_vm.averageRating,"max":5}}),_vm._ssrNode(" "+((!!_vm.totalReviews)?("<a href=\"#\" class=\"product__count\" data-v-8aa923e6>"+_vm._ssrEscape("\n              ("+_vm._s(_vm.totalReviews)+")\n            ")+"</a>"):"<!---->"))],2),_vm._ssrNode(" "),_c('SfButton',{staticClass:"sf-button--text",attrs:{"data-cy":"product-btn_read-all"}},[_vm._v(_vm._s(_vm.$t('Read all reviews')))])],2)],2),_vm._ssrNode(" "),_vm._ssrNode("<div data-v-8aa923e6>","</div>",[_vm._ssrNode("<p class=\"product__description desktop-only\" data-v-8aa923e6>"+_vm._ssrEscape("\n          "+_vm._s(_vm.description)+"\n        ")+"</p> "),_c('SfButton',{staticClass:"sf-button--text desktop-only product__guide",attrs:{"data-cy":"product-btn_size-guide"}},[_vm._v("\n          "+_vm._s(_vm.$t('Size guide'))+"\n        ")]),_vm._ssrNode(" "),(_vm.options.size)?_c('SfSelect',{staticClass:"sf-select--underlined product__select-size",attrs:{"data-cy":"product-select_size","value":_vm.configuration.size,"label":"Size","required":true},on:{"input":function (size) { return _vm.updateFilter({ size: size }); }}},_vm._l((_vm.options.size),function(size){return _c('SfSelectOption',{key:size.value,attrs:{"value":size.value}},[_vm._v("\n            "+_vm._s(size.label)+"\n          ")])}),1):_vm._e(),_vm._ssrNode(" "),(_vm.options.color && _vm.options.color.length > 1)?_vm._ssrNode("<div class=\"product__colors desktop-only\" data-v-8aa923e6>","</div>",[_vm._ssrNode("<p class=\"product__color-label\" data-v-8aa923e6>"+_vm._ssrEscape(_vm._s(_vm.$t('Color'))+":")+"</p> "),_vm._l((_vm.options.color),function(color,i){return _c('SfColor',{key:i,staticClass:"product__color",attrs:{"data-cy":"product-color_update","color":color.value},on:{"click":function($event){return _vm.updateFilter({color: color})}}})})],2):_vm._e(),_vm._ssrNode(" "),_c('SfAddToCart',{staticClass:"product__add-to-cart",attrs:{"data-cy":"product-cart_add","stock":_vm.stock,"disabled":_vm.loading,"canAddToCart":_vm.stock > 0},on:{"click":function($event){_vm.addItem({ product: _vm.product, quantity: parseInt(_vm.qty) })}},model:{value:(_vm.qty),callback:function ($$v) {_vm.qty=$$v},expression:"qty"}})],2),_vm._ssrNode(" "),_c('LazyHydrate',{attrs:{"when-idle":""}},[_c('SfTabs',{staticClass:"product__tabs",attrs:{"open-tab":1}},[_c('SfTab',{attrs:{"data-cy":"product-tab_description","title":"Description"}},[_c('div',{staticClass:"product__description"},[_vm._v("\n                "+_vm._s(_vm.$t('Product description'))+"\n            ")]),_vm._v(" "),_vm._l((_vm.properties),function(property,i){return _c('SfProperty',{key:i,staticClass:"product__property",attrs:{"name":property.name,"value":property.value},scopedSlots:_vm._u([(property.name === 'Category')?{key:"value",fn:function(){return [_c('SfButton',{staticClass:"product__property__button sf-button--text"},[_vm._v("\n                  "+_vm._s(property.value)+"\n                ")])]},proxy:true}:null],null,true)})})],2),_vm._v(" "),_c('SfTab',{attrs:{"title":"Read reviews","data-cy":"product-tab_reviews"}},_vm._l((_vm.reviews),function(review){return _c('SfReview',{key:_vm.reviewGetters.getReviewId(review),staticClass:"product__review",attrs:{"author":_vm.reviewGetters.getReviewAuthor(review),"date":_vm.reviewGetters.getReviewDate(review),"message":_vm.reviewGetters.getReviewMessage(review),"max-rating":5,"rating":_vm.reviewGetters.getReviewRating(review),"char-limit":250,"read-more-text":"Read more","hide-full-text":"Read less"}})}),1),_vm._v(" "),_c('SfTab',{staticClass:"product__additional-info",attrs:{"title":"Additional Information","data-cy":"product-tab_additional"}},[_c('div',{staticClass:"product__additional-info"},[_c('p',{staticClass:"product__additional-info__title"},[_vm._v(_vm._s(_vm.$t('Brand')))]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.brand))]),_vm._v(" "),_c('p',{staticClass:"product__additional-info__title"},[_vm._v(_vm._s(_vm.$t('Instruction1')))]),_vm._v(" "),_c('p',{staticClass:"product__additional-info__paragraph"},[_vm._v("\n              "+_vm._s(_vm.$t('Instruction2'))+"\n            ")]),_vm._v(" "),_c('p',{staticClass:"product__additional-info__paragraph"},[_vm._v("\n              "+_vm._s(_vm.$t('Instruction3'))+"\n            ")]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.careInstructions))])])])],1)],1)],2)],2),_vm._ssrNode(" "),_c('LazyHydrate',{attrs:{"when-visible":""}},[_c('RelatedProducts',{attrs:{"products":_vm.relatedProducts,"loading":_vm.relatedLoading,"title":"Match it with"}})],1),_vm._ssrNode(" "),_c('LazyHydrate',{attrs:{"when-visible":""}},[_c('InstagramFeed')],1),_vm._ssrNode(" "),_c('LazyHydrate',{attrs:{"when-visible":""}},[_c('MobileStoreBanner')],1)],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./_theme/pages/Product.vue?vue&type=template&id=8aa923e6&scoped=true&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfAlert/SfAlert.vue + 4 modules
var SfAlert = __webpack_require__(226);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfColor/SfColor.vue + 4 modules
var SfColor = __webpack_require__(331);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfProperty/SfProperty.vue + 4 modules
var SfProperty = __webpack_require__(222);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfHeading/SfHeading.vue + 4 modules
var SfHeading = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfPrice/SfPrice.vue + 4 modules
var SfPrice = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfRating/SfRating.vue + 4 modules
var SfRating = __webpack_require__(40);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfSelect/SfSelect.vue + 9 modules
var SfSelect = __webpack_require__(218);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfAddToCart/SfAddToCart.vue + 4 modules
var SfAddToCart = __webpack_require__(332);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfTabs/SfTabs.vue + 9 modules
var SfTabs = __webpack_require__(233);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/molecules/SfGallery/SfGallery.vue?vue&type=template&id=32dc9377&
var SfGalleryvue_type_template_id_32dc9377_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sf-gallery"},[_vm._ssrNode("<div class=\"sf-gallery__stage\">","</div>",[_vm._ssrNode("<div class=\"glide\">","</div>",[_vm._ssrNode("<div data-glide-el=\"track\" class=\"glide__track\">","</div>",[_vm._ssrNode("<ul class=\"glide__slides\">","</ul>",_vm._l((_vm.images),function(picture,index){return _vm._ssrNode("<li class=\"glide__slide\">","</li>",[_c('SfImage',{ref:"sfGalleryBigImage",refInFor:true,staticClass:"sf-gallery__big-image",class:{ 'sf-gallery__big-image--has-zoom': _vm.enableZoom },attrs:{"src":picture.desktop.url,"alt":picture.alt,"width":_vm.imageWidth,"height":_vm.imageHeight},on:{"click":function($event){return _vm.$emit('click:stage', { picture: picture, index: index })}}})],1)}),0)])]),_vm._ssrNode(" "),_c('transition',{attrs:{"name":"sf-fade"}},[(_vm.outsideZoom && _vm.pictureSelected)?_c('div',{ref:"outSide",staticClass:"sf-gallery__zoom",style:({ width: (_vm.imageWidth + "px"), height: (_vm.imageHeight + "px") })},[_c('SfImage',{ref:"imgZoom",attrs:{"src":_vm.pictureSelected,"width":_vm.imageWidth,"height":_vm.imageHeight,"lazy":false}})],1):_vm._e()])],2),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"sf-gallery__thumbs\">","</div>",[_vm._t("thumbs",_vm._l((_vm.images),function(image,index){return _c('SfButton',{key:'img-' + index,staticClass:"sf-button--pure sf-gallery__item",class:{ 'sf-gallery__item--selected': index === _vm.activeIndex },on:{"click":function($event){return _vm.go(index)}}},[_c('SfImage',{staticClass:"sf-gallery__thumb",attrs:{"src":image.mobile.url,"alt":image.alt,"width":_vm.thumbWidth,"height":_vm.thumbHeight}})],1)}),null,{ images: _vm.images, active: _vm.activeIndex, go: _vm.go })],2)],2)}
var SfGalleryvue_type_template_id_32dc9377_staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfGallery/SfGallery.vue?vue&type=template&id=32dc9377&

// EXTERNAL MODULE: external "@glidejs/glide"
var glide_ = __webpack_require__(211);
var glide_default = /*#__PURE__*/__webpack_require__.n(glide_);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfImage/SfImage.vue + 4 modules
var SfImage = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfButton/SfButton.vue + 4 modules
var SfButton = __webpack_require__(7);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/molecules/SfGallery/SfGallery.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var SfGalleryvue_type_script_lang_js_ = ({
  name: "SfGallery",
  components: {
    SfImage: SfImage["a" /* default */],
    SfButton: SfButton["a" /* default */]
  },
  props: {
    /**
     * Images list
     */
    images: {
      type: Array,
      default: () => []
    },

    /**
     * Images width, without unit
     */
    imageWidth: {
      type: [Number, String],
      default: 422
    },

    /**
     * Images height, without unit
     */
    imageHeight: {
      type: [Number, String],
      default: 664
    },

    /**
     * Thumb width, without unit
     */
    thumbWidth: {
      type: [Number, String],
      default: 160
    },

    /**
     * Thumb height, without unit
     */
    thumbHeight: {
      type: [Number, String],
      default: 160
    },

    /**
     * Initial image number (starting from 1)
     */
    current: {
      type: Number,
      default: 1
    },

    /**
     * Glide slider options (https://glidejs.com/docs/options/)
     */
    sliderOptions: {
      type: Object,

      default() {
        return {
          type: "slider",
          autoplay: false,
          rewind: false,
          gap: 0
        };
      }

    },

    /**
     * Image zoom inside or overlap the stage
     */
    outsideZoom: {
      type: Boolean,
      default: false
    },

    /**
     * Toogle for image zoom or overlap the stage
     */
    enableZoom: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      positionStatic: {},
      eventHover: {},
      pictureSelected: "",
      glide: null,
      activeIndex: this.current - 1,
      style: ""
    };
  },

  computed: {
    mapPictures() {
      // map images to handle picture tags with SfImage
      return this.images.map(({
        desktop,
        big
      }) => ({
        mobile: desktop,
        desktop: big
      }));
    },

    updatedSliderOptions() {
      return { ...this.sliderOptions,
        startAt: this.activeIndex
      };
    }

  },

  mounted() {
    this.$nextTick(() => {
      // handle slider with swipe and transitions with Glide.js
      // https://glidejs.com/docs/
      if (this.images.length < 1) return;
      const glide = new glide_default.a(this.$refs.glide, this.updatedSliderOptions);
      glide.on("run", () => {
        this.go(glide.index);
      });
      glide.mount();
      this.glide = glide;
    });
  },

  beforeDestroy() {
    if (this.glide) {
      this.glide.destroy();
    }
  },

  methods: {
    positionObject(index) {
      if (this.$refs.sfGalleryBigImage) {
        if (this.outsideZoom) {
          return this.$refs.glide.getBoundingClientRect();
        } else {
          return this.$refs.sfGalleryBigImage[index].$el.getBoundingClientRect();
        }
      }

      return "";
    },

    go(index) {
      if (!this.glide) return;
      this.activeIndex = index;
      /**
       * Event for current image change (`v-model`)
       * @type {Event}
       */

      this.$emit("click", index + 1);

      if (this.glide) {
        this.glide.go(`=${index}`);
      }
    },

    startZoom(picture) {
      if (this.enableZoom) {
        const {
          zoom,
          big,
          desktop
        } = picture;
        this.pictureSelected = (zoom || big || desktop).url;
      }
    },

    moveZoom($event, index) {
      if (this.enableZoom) {
        this.eventHover = $event;

        if (this.outsideZoom) {
          this.positionStatic = this.positionObject(index);
          this.$refs.imgZoom.$refs.image.style.transformOrigin = `${$event.clientX - this.positionStatic.x}px ${$event.clientY - this.positionStatic.y}px`;
        } else {
          this.positionStatic = this.positionObject(index);
          this.$refs.sfGalleryBigImage[index].$refs.image.style.top = "0";
          this.$refs.sfGalleryBigImage[index].$refs.image.style.transform = "scale(2)";
          this.$refs.sfGalleryBigImage[index].$refs.image.style.transformOrigin = `${$event.clientX - this.positionStatic.x}px ${$event.clientY - this.positionStatic.y}px`;
        }
      }
    },

    removeZoom(index) {
      if (this.enableZoom) {
        this.pictureSelected = "";
        this.$refs.sfGalleryBigImage[index].$refs.image.style.transform = "translate3d(0, -50%, 0)";
        this.$refs.sfGalleryBigImage[index].$refs.image.style.top = "50%";
      }
    }

  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfGallery/SfGallery.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfGallery_SfGalleryvue_type_script_lang_js_ = (SfGalleryvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfGallery/SfGallery.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(376)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  SfGallery_SfGalleryvue_type_script_lang_js_,
  SfGalleryvue_type_template_id_32dc9377_render,
  SfGalleryvue_type_template_id_32dc9377_staticRenderFns,
  false,
  injectStyles,
  null,
  "2627f29e"
  
)

/* harmony default export */ var SfGallery = (component.exports);
// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfIcon/SfIcon.vue + 6 modules
var SfIcon = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfBanner/SfBanner.vue + 4 modules
var SfBanner = __webpack_require__(389);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/molecules/SfSticky/SfSticky.vue?vue&type=template&id=5fc2e093&
var SfStickyvue_type_template_id_5fc2e093_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sf-sticky",class:{
    'sf-sticky--sticky': _vm.isSticky,
    'sf-sticky--bound': _vm.isBound,
  }},[_vm._t("default")],2)}
var SfStickyvue_type_template_id_5fc2e093_staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfSticky/SfSticky.vue?vue&type=template&id=5fc2e093&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/molecules/SfSticky/SfSticky.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var SfStickyvue_type_script_lang_js_ = ({
  name: "SfSticky",

  data() {
    return {
      top: 0,
      height: 0,
      width: 0,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      parentTop: 0,
      parentHeight: 0,
      scrollY: 0,
      isSticky: false,
      isBound: false
    };
  },

  computed: {
    isIE() {
      if (typeof window === "undefined") return;
      const ua = window.navigator.userAgent;
      return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/ ") > -1;
    },

    maxWidth() {
      return this.width - (this.padding.right + this.padding.left);
    },

    scrollBegin() {
      return this.parentTop + this.top;
    },

    scrollEnd() {
      return this.parentHeight + this.parentTop - this.height - this.padding.bottom;
    }

  },
  watch: {
    scrollY() {
      this.toggleSticky();
      this.toggleBound();
    },

    parentTop() {
      this.$el.style.bottom = "";
      this.$el.parentElement.style.paddingTop = "";
      this.isSticky = false;
      this.isBound = false;
      this.computedPadding();
      this.parentHeight = this.$el.parentElement.offsetHeight;
    },

    width(value) {
      this.$el.style.maxWidth = `${value}px`;
    },

    isSticky(state) {
      if (state) {
        if (this.$el.nextSibling) {
          this.$el.parentElement.style.paddingTop = `${this.height + this.padding.top}px`;
        }
      } else {
        if (this.$el.nextSibling && this.scrollY <= this.parentTop + this.top) {
          this.$el.parentElement.style.paddingTop = "";
        }
      }
    },

    isBound(state) {
      if (state) {
        this.$el.style.bottom = `${this.padding.bottom}px`; //if parent have padding
      } else {
        this.$el.style.bottom = "";
      }
    }

  },
  mounted: function () {
    if (!this.isIE) return;
    this.$el.parentElement.style.position = "relative";
    this.padding = this.computedPadding();
    this.parentTop = this.$el.parentElement.offsetTop;
    this.top = this.$el.offsetTop;
    this.parentHeight = this.$el.parentElement.offsetHeight;
    this.height = this.$el.offsetHeight;
    this.width = this.$el.parentElement.offsetWidth;
    window.addEventListener("scroll", this.scrollHandler, {
      passive: true
    });
    window.addEventListener("resize", this.resizeHandler, {
      passive: true
    });
  },
  beforeDestroy: function () {
    window.removeEventListener("scroll", this.scrollHandler);
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    scrollHandler() {
      this.scrollY = Math.ceil(window.pageYOffset);
    },

    resizeHandler() {
      this.width = this.$el.parentElement.offsetWidth;
      this.parentTop = this.$el.parentElement.offsetTop;
    },

    toggleSticky() {
      if (this.scrollY >= this.parentTop + this.top && this.scrollY < this.scrollEnd) {
        this.isSticky = true;
      } else {
        this.isSticky = false;
      }
    },

    toggleBound() {
      if (this.scrollY >= this.scrollEnd && this.scrollBegin < this.scrollEnd) {
        this.isBound = true;
      } else {
        this.isBound = false;
      }
    },

    computedPadding() {
      const computed = window.getComputedStyle(this.$el.parentElement);
      return {
        top: parseInt(computed["padding-top"], 10),
        right: parseInt(computed["padding-right"], 10),
        bottom: parseInt(computed["padding-bottom"], 10),
        left: parseInt(computed["padding-left"], 10)
      };
    }

  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfSticky/SfSticky.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfSticky_SfStickyvue_type_script_lang_js_ = (SfStickyvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfSticky/SfSticky.vue



function SfSticky_injectStyles (context) {
  
  var style0 = __webpack_require__(378)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var SfSticky_component = Object(componentNormalizer["a" /* default */])(
  SfSticky_SfStickyvue_type_script_lang_js_,
  SfStickyvue_type_template_id_5fc2e093_render,
  SfStickyvue_type_template_id_5fc2e093_staticRenderFns,
  false,
  SfSticky_injectStyles,
  null,
  "31d6a744"
  
)

/* harmony default export */ var SfSticky = (SfSticky_component.exports);
// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/molecules/SfReview/SfReview.vue?vue&type=template&id=6de7d512&
var SfReviewvue_type_template_id_6de7d512_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"sf-review"},[_vm._t("author",[_c('div',{staticClass:"sf-review__author"},[_vm._t("icon",[_c('SfIcon',{staticClass:"sf-review__icon"},[_c('svg',{attrs:{"viewbox":"0 0 14 14","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd","d":"M7.303.429l.863.985 1.29-.548a.386.386 0 01.516.241l.394 1.27 1.4.025a.385.385 0 01.374.43l-.155 1.32 1.268.592c.192.09.275.319.185.51-.173.359-.486.82-.698 1.176l.919 1.059a.387.387 0 01-.07.566l-1.085.767.409 1.34a.384.384 0 01-.294.487l-1.302.26-.17 1.389a.386.386 0 01-.496.322l-1.269-.288-.721 1.2a.385.385 0 01-.56.11l-1.067-.796-1.146.803a.384.384 0 01-.556-.128l-.649-1.16-1.376.268a.385.385 0 01-.457-.366l-.119-1.3-1.363-.315a.386.386 0 01-.28-.499l.428-1.259-1.118-.843a.385.385 0 01-.029-.59l.882-.953-.68-1.225a.385.385 0 01.187-.541l1.219-.524-.121-1.395a.387.387 0 01.422-.417l1.295.017.456-1.324a.386.386 0 01.545-.216l1.188.548.955-1.023a.385.385 0 01.584.025h.002zM3.848 7.146c-.511-.51.265-1.287.776-.777l1.72 1.72L9.356 4.75c.482-.535 1.297.199.815.734L6.79 9.232a.55.55 0 01-.814.042l-2.13-2.129.002.001z"}})])])]),_vm._v("\n      "+_vm._s(_vm.author)+"\n    ")],2)],null,{ author: _vm.author }),_vm._ssrNode(" "),_vm._t("info",[_c('div',{staticClass:"sf-review__info"},[_c('div',{class:{ 'sf-review__rating': _vm.rating > 0 && _vm.maxRating > 0 }},[(_vm.rating)?_c('SfRating',{attrs:{"max":_vm.maxRating,"score":_vm.rating}}):_vm._e()],1),_vm._v(" "),_c('div',{staticClass:"sf-review__date"},[_vm._v("\n        "+_vm._s(_vm.date)+"\n      ")])])],null,{ rating: _vm.rating, maxRating: _vm.maxRating, date: _vm.date }),_vm._ssrNode(" "),_vm._t("message",[(_vm.message)?_c('div',[_c('p',{staticClass:"sf-review__message"},[_vm._v(_vm._s(_vm.finalMessage))]),_vm._v(" "),(_vm.showButton)?_c('SfButton',{staticClass:"sf-button--text sf-review__read-more",on:{"click":_vm.toggleMessage}},[_vm._v("\n        "+_vm._s(_vm.buttonText)+"\n      ")]):_vm._e()],1):_vm._e()],null,{ finalMessage: _vm.finalMessage, buttonText: _vm.buttonText })],2)}
var SfReviewvue_type_template_id_6de7d512_staticRenderFns = []


// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfReview/SfReview.vue?vue&type=template&id=6de7d512&

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./node_modules/@storefront-ui/vue/src/components/molecules/SfReview/SfReview.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var SfReviewvue_type_script_lang_js_ = ({
  name: "SfReview",
  components: {
    SfRating: SfRating["a" /* default */],
    SfIcon: SfIcon["a" /* default */],
    SfButton: SfButton["a" /* default */]
  },
  props: {
    /**
     * Author of the review
     */
    author: {
      type: String,
      default: ""
    },

    /**
     * Date of the review
     */
    date: {
      type: String,
      default: ""
    },

    /**
     * Message from the reviewer
     */
    message: {
      type: String,
      default: ""
    },

    /**
     * Rating from the reviewer
     */
    rating: {
      type: [Number, String, Boolean],
      default: false
    },

    /**
     * Max rating for the review
     */
    maxRating: {
      type: [Number, String],
      default: 5
    },

    /**
     * Char limit for the review
     */
    charLimit: {
      type: [Number, String],
      default: 250
    },

    /**
     * Read more text for the review
     */
    readMoreText: {
      type: String,
      default: "Read more"
    },

    /**
     * Hide full text message for the review
     */
    hideFullText: {
      type: String,
      default: "Read less"
    }
  },

  data() {
    return {
      isOpen: false
    };
  },

  computed: {
    showButton() {
      return this.message.length > this.charLimit;
    },

    buttonText() {
      let buttonText = this.readMoreText;

      if (this.isOpen) {
        buttonText = this.hideFullText;
      }

      return buttonText;
    },

    finalMessage() {
      return this.message.length > this.charLimit && !this.isOpen ? this.message.slice(0, this.charLimit) + "..." : this.message;
    }

  },
  methods: {
    toggleMessage() {
      this.isOpen = !this.isOpen;
    }

  }
});
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfReview/SfReview.vue?vue&type=script&lang=js&
 /* harmony default export */ var SfReview_SfReviewvue_type_script_lang_js_ = (SfReviewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfReview/SfReview.vue



function SfReview_injectStyles (context) {
  
  var style0 = __webpack_require__(380)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var SfReview_component = Object(componentNormalizer["a" /* default */])(
  SfReview_SfReviewvue_type_script_lang_js_,
  SfReviewvue_type_template_id_6de7d512_render,
  SfReviewvue_type_template_id_6de7d512_staticRenderFns,
  false,
  SfReview_injectStyles,
  null,
  "258e2d84"
  
)

/* harmony default export */ var SfReview = (SfReview_component.exports);
// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfBreadcrumbs/SfBreadcrumbs.vue + 4 modules
var SfBreadcrumbs = __webpack_require__(333);

// EXTERNAL MODULE: ./_theme/components/InstagramFeed.vue + 4 modules
var InstagramFeed = __webpack_require__(296);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/RelatedProducts.vue?vue&type=template&id=0ccd858e&scoped=true&
var RelatedProductsvue_type_template_id_0ccd858e_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('SfSection',{staticClass:"section",attrs:{"title-heading":_vm.title}},[_c('SfLoader',{class:{ loading: _vm.loading },attrs:{"loading":_vm.loading}},[_c('SfCarousel',{staticClass:"carousel",attrs:{"data-cy":"related-products-carousel","settings":{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }}},_vm._l((_vm.products),function(product,i){return _c('SfCarouselItem',{key:i,staticClass:"carousel__item"},[_c('SfProductCard',{attrs:{"title":_vm.productGetters.getName(product),"image":_vm.productGetters.getCoverImage(product),"regular-price":_vm.$n(_vm.productGetters.getPrice(product).regular, 'currency'),"special-price":_vm.productGetters.getPrice(product).special && _vm.$n(_vm.productGetters.getPrice(product).special, 'currency'),"link":_vm.localePath(("/p/" + (_vm.productGetters.getId(product)) + "/" + (_vm.productGetters.getSlug(product))))}})],1)}),1)],1)],1)}
var RelatedProductsvue_type_template_id_0ccd858e_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./_theme/components/RelatedProducts.vue?vue&type=template&id=0ccd858e&scoped=true&

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfCarousel/SfCarousel.vue + 9 modules
var SfCarousel = __webpack_require__(385);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/organisms/SfProductCard/SfProductCard.vue + 4 modules
var SfProductCard = __webpack_require__(220);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/molecules/SfSection/SfSection.vue + 4 modules
var SfSection = __webpack_require__(388);

// EXTERNAL MODULE: ./node_modules/@storefront-ui/vue/src/components/atoms/SfLoader/SfLoader.vue + 4 modules
var SfLoader = __webpack_require__(225);

// EXTERNAL MODULE: ../composables/lib/index.es.js
var index_es = __webpack_require__(8);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--12-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/ts-loader??ref--12-1!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/components/RelatedProducts.vue?vue&type=script&lang=ts&


/* harmony default export */ var RelatedProductsvue_type_script_lang_ts_ = ({
  name: 'RelatedProducts',

  setup() {
    return {
      productGetters: index_es["f" /* productGetters */]
    };
  },

  components: {
    SfCarousel: SfCarousel["a" /* default */],
    SfProductCard: SfProductCard["a" /* default */],
    SfSection: SfSection["a" /* default */],
    SfLoader: SfLoader["a" /* default */]
  },
  props: {
    title: String,
    products: Array,
    loading: Boolean
  }
});
// CONCATENATED MODULE: ./_theme/components/RelatedProducts.vue?vue&type=script&lang=ts&
 /* harmony default export */ var components_RelatedProductsvue_type_script_lang_ts_ = (RelatedProductsvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./_theme/components/RelatedProducts.vue



function RelatedProducts_injectStyles (context) {
  
  var style0 = __webpack_require__(374)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var RelatedProducts_component = Object(componentNormalizer["a" /* default */])(
  components_RelatedProductsvue_type_script_lang_ts_,
  RelatedProductsvue_type_template_id_0ccd858e_scoped_true_render,
  RelatedProductsvue_type_template_id_0ccd858e_scoped_true_staticRenderFns,
  false,
  RelatedProducts_injectStyles,
  "0ccd858e",
  "745c72a6"
  
)

/* harmony default export */ var RelatedProducts = (RelatedProducts_component.exports);
// EXTERNAL MODULE: external "@vue/composition-api"
var composition_api_ = __webpack_require__(2);

// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/packages/core/core/lib/index.es.js
var lib_index_es = __webpack_require__(9);

// EXTERNAL MODULE: ./_theme/components/MobileStoreBanner.vue + 4 modules
var MobileStoreBanner = __webpack_require__(297);

// EXTERNAL MODULE: external "vue-lazy-hydration"
var external_vue_lazy_hydration_ = __webpack_require__(39);
var external_vue_lazy_hydration_default = /*#__PURE__*/__webpack_require__.n(external_vue_lazy_hydration_);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/Product.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var Productvue_type_script_lang_js_ = ({
  name: 'Product',
  transition: 'fade',

  setup(props, context) {
    const qty = Object(composition_api_["ref"])(1);
    const {
      id
    } = context.root.$route.params;
    const {
      products,
      search
    } = Object(index_es["k" /* useProduct */])('products');
    const {
      products: relatedProducts,
      search: searchRelatedProducts,
      loading: relatedLoading
    } = Object(index_es["k" /* useProduct */])('relatedProducts');
    const {
      addItem,
      loading
    } = Object(index_es["h" /* useCart */])();
    const {
      reviews: productReviews,
      search: searchReviews
    } = Object(index_es["useReview"])('productReviews');
    const product = Object(composition_api_["computed"])(() => index_es["f" /* productGetters */].getFiltered(products.value, {
      master: true,
      attributes: context.root.$route.query
    })[0]);
    const options = Object(composition_api_["computed"])(() => index_es["f" /* productGetters */].getAttributes(products.value, ['color', 'size']));
    const configuration = Object(composition_api_["computed"])(() => index_es["f" /* productGetters */].getAttributes(product.value, ['color', 'size']));
    const categories = Object(composition_api_["computed"])(() => index_es["f" /* productGetters */].getCategoryIds(product.value));
    const reviews = Object(composition_api_["computed"])(() => index_es["reviewGetters"].getItems(productReviews.value)); // TODO: Breadcrumbs are temporary disabled because productGetters return undefined. We have a mocks in data
    // const breadcrumbs = computed(() => productGetters.getBreadcrumbs ? productGetters.getBreadcrumbs(product.value) : props.fallbackBreadcrumbs);

    const productGallery = Object(composition_api_["computed"])(() => index_es["f" /* productGetters */].getGallery(product.value).map(img => ({
      mobile: {
        url: img.small
      },
      desktop: {
        url: img.normal
      },
      big: {
        url: img.big
      },
      alt: product.value._name || product.value.name
    })));
    Object(lib_index_es["onSSR"])(async () => {
      await search({
        id
      });
      await searchRelatedProducts({
        catId: [categories.value[0]],
        limit: 8
      });
      await searchReviews({
        productId: id
      });
    });

    const updateFilter = filter => {
      context.root.$router.push({
        path: context.root.$route.path,
        query: { ...configuration.value,
          ...filter
        }
      });
    };

    return {
      updateFilter,
      configuration,
      product,
      reviews,
      reviewGetters: index_es["reviewGetters"],
      averageRating: Object(composition_api_["computed"])(() => index_es["f" /* productGetters */].getAverageRating(product.value)),
      totalReviews: Object(composition_api_["computed"])(() => index_es["f" /* productGetters */].getTotalReviews(product.value)),
      relatedProducts: Object(composition_api_["computed"])(() => index_es["f" /* productGetters */].getFiltered(relatedProducts.value, {
        master: true
      })),
      relatedLoading,
      options,
      qty,
      addItem,
      loading,
      productGetters: index_es["f" /* productGetters */],
      productGallery
    };
  },

  components: {
    SfAlert: SfAlert["a" /* default */],
    SfColor: SfColor["a" /* default */],
    SfProperty: SfProperty["a" /* default */],
    SfHeading: SfHeading["a" /* default */],
    SfPrice: SfPrice["a" /* default */],
    SfRating: SfRating["a" /* default */],
    SfSelect: SfSelect["a" /* default */],
    SfAddToCart: SfAddToCart["a" /* default */],
    SfTabs: SfTabs["a" /* default */],
    SfGallery: SfGallery,
    SfIcon: SfIcon["a" /* default */],
    SfImage: SfImage["a" /* default */],
    SfBanner: SfBanner["a" /* default */],
    SfSticky: SfSticky,
    SfReview: SfReview,
    SfBreadcrumbs: SfBreadcrumbs["a" /* default */],
    SfButton: SfButton["a" /* default */],
    InstagramFeed: InstagramFeed["a" /* default */],
    RelatedProducts: RelatedProducts,
    MobileStoreBanner: MobileStoreBanner["a" /* default */],
    LazyHydrate: external_vue_lazy_hydration_default.a
  },

  data() {
    return {
      stock: 5,
      properties: [{
        name: 'Product Code',
        value: '578902-00'
      }, {
        name: 'Category',
        value: 'Pants'
      }, {
        name: 'Material',
        value: 'Cotton'
      }, {
        name: 'Country',
        value: 'Germany'
      }],
      description: 'Find stunning women cocktail and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.',
      detailsIsActive: false,
      brand: 'Brand name is the perfect pairing of quality and design. This label creates major everyday vibes with its collection of modern brooches, silver and gold jewellery, or clips it back with hair accessories in geo styles.',
      careInstructions: 'Do not wash!',
      breadcrumbs: [{
        text: 'Home',
        route: {
          link: '#'
        }
      }, {
        text: 'Category',
        route: {
          link: '#'
        }
      }, {
        text: 'Pants',
        route: {
          link: '#'
        }
      }]
    };
  }

});
// CONCATENATED MODULE: ./_theme/pages/Product.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Productvue_type_script_lang_js_ = (Productvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./_theme/pages/Product.vue



function Product_injectStyles (context) {
  
  var style0 = __webpack_require__(382)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var Product_component = Object(componentNormalizer["a" /* default */])(
  pages_Productvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  Product_injectStyles,
  "8aa923e6",
  "4a15e1a4"
  
)

/* harmony default export */ var Product = __webpack_exports__["default"] = (Product_component.exports);

/***/ })

};;
//# sourceMappingURL=Product.js.map