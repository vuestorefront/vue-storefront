"use strict";Object.defineProperty(exports,"__esModule",{value:!0});
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
var r=function(){return(r=Object.assign||function(r){for(var e,o=1,t=arguments.length;o<t;o++)for(var p in e=arguments[o])Object.prototype.hasOwnProperty.call(e,p)&&(r[p]=e[p]);return r}).apply(this,arguments)};var e={},o={getProductApi:function(){},getCategoryApi:function(){},addToCartApi:function(){},removeFromCartApi:function(){},clearCartApi:function(){},placeOrderApi:function(){},getUserApi:function(){},addCouponApi:function(){},removeCouponApi:function(){}};var t=o.getProductApi,p=o.getCategoryApi,n=o.addToCartApi,i=o.removeFromCartApi,a=o.clearCartApi,u=o.placeOrderApi,c=o.getUserApi,s=o.addCouponApi,d=o.removeCouponApi;exports.addCoupon=s,exports.addToCart=n,exports.clearCart=a,exports.getCategory=p,exports.getProduct=t,exports.getUser=c,exports.override=function(e){o=r(r({},o),e)},exports.placeOrder=u,exports.removeCoupon=d,exports.removeFromCart=i,exports.setup=function(o){e=r(r({},e),o)};
