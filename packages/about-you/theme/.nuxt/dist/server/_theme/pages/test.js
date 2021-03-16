exports.ids = [13];
exports.modules = {

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/test.vue?vue&type=template&id=e7694704&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._ssrNode("<div><ul>"+(_vm._ssrList((_vm.cartProducts),function(product,i){return ("<li> \n          ...\n          <label><input type=\"number\"> <button>\n              Add more\n            </button></label> <button>\n            Remove from cart\n          </button></li>")}))+"</ul> <span>"+_vm._ssrEscape("\n        "+_vm._s(_vm.cartTotals.total)+"\n    ")+"</span> <span>"+_vm._ssrEscape("\n        "+_vm._s(_vm.cartTotalItems)+"\n    ")+"</span> <button>\n        Clear cart\n    </button></div> <div><ul>\n        ...\n        "+(_vm._ssrList((_vm.wishlistProducts),function(product,i){return ("<li><button>\n              Remove from wishlist\n          </button></li>")}))+"</ul> <span>"+_vm._ssrEscape("\n          "+_vm._s(_vm.wishlistTotals.total)+"\n      ")+"</span> <span>"+_vm._ssrEscape("\n          "+_vm._s(_vm.wishlistTotalItems)+"\n      ")+"</span> <button>\n          Clear wishlist\n      </button></div>")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./_theme/pages/test.vue?vue&type=template&id=e7694704&

// EXTERNAL MODULE: external "@vue/composition-api"
var composition_api_ = __webpack_require__(2);

// EXTERNAL MODULE: external "@vue-storefront/boilerplate"
var boilerplate_ = __webpack_require__(212);

// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/packages/core/core/lib/index.es.js
var index_es = __webpack_require__(9);

// CONCATENATED MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/babel-loader/lib??ref--2-0!/home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib??vue-loader-options!./_theme/pages/test.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var testvue_type_script_lang_js_ = ({
  setup() {
    const {
      wishlist,
      removeItem: removeFromWishlist,
      clear: clearWishlist,
      load: loadWishlist
    } = Object(boilerplate_["useWishlist"])();
    const {
      cart,
      clear: clearCart,
      removeItem: removeFromCart,
      updateItemQty,
      loading
    } = Object(boilerplate_["useCart"])();
    const cartProducts = Object(composition_api_["computed"])(() => boilerplate_["cartGetters"].getItems(cart.value));
    const cartTotals = Object(composition_api_["computed"])(() => boilerplate_["cartGetters"].getTotals(cart.value));
    const cartTotalItems = Object(composition_api_["computed"])(() => boilerplate_["cartGetters"].getTotalItems(cart.value));
    const wishlistProducts = Object(composition_api_["computed"])(() => boilerplate_["wishlistGetters"].getItems(wishlist.value));
    const wishlistTotals = Object(composition_api_["computed"])(() => boilerplate_["wishlistGetters"].getTotals(wishlist.value));
    const wishlistTotalItems = Object(composition_api_["computed"])(() => boilerplate_["wishlistGetters"].getTotalItems(wishlist.value));
    Object(index_es["onSSR"])(async () => {
      await loadWishlist();
    });
    return {
      cartProducts,
      cartTotals,
      cartTotalItems,
      removeFromCart,
      cart,
      updateItemQty,
      clearCart,
      wishlistProducts,
      wishlistTotals,
      wishlistTotalItems,
      wishlist,
      removeFromWishlist,
      clearWishlist
    };
  }

});
// CONCATENATED MODULE: ./_theme/pages/test.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_testvue_type_script_lang_js_ = (testvue_type_script_lang_js_); 
// EXTERNAL MODULE: /home/apawlicki/Projects/vsf-next/vue-storefront/node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./_theme/pages/test.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_testvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "020f94e6"
  
)

/* harmony default export */ var test = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=test.js.map