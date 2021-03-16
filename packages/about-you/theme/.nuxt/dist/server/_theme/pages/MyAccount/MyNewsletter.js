exports.ids = [7];
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

/***/ })

};;
//# sourceMappingURL=MyNewsletter.js.map