/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var o=function(){return(o=Object.assign||function(o){for(var r,t=1,n=arguments.length;t<n;t++)for(var i in r=arguments[t])Object.prototype.hasOwnProperty.call(r,i)&&(o[i]=r[i]);return o}).apply(this,arguments)};var r={},t={getProductApi:function(){},getCategoryApi:function(){},addToCartApi:function(){},removeFromCartApi:function(){},clearCartApi:function(){},placeOrderApi:function(){},getUserApi:function(){},addCouponApi:function(){},removeCouponApi:function(){}};function n(r){t=o(o({},t),r)}function i(t){r=o(o({},r),t)}var e=t.getProductApi,p=t.getCategoryApi,a=t.addToCartApi,c=t.removeFromCartApi,u=t.clearCartApi,A=t.placeOrderApi,f=t.getUserApi,d=t.addCouponApi,C=t.removeCouponApi;export{d as addCoupon,a as addToCart,u as clearCart,p as getCategory,e as getProduct,f as getUser,n as override,A as placeOrder,C as removeCoupon,c as removeFromCart,i as setup};
