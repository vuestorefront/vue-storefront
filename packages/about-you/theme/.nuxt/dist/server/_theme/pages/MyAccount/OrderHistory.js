exports.ids = [10];
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

/***/ })

};;
//# sourceMappingURL=OrderHistory.js.map