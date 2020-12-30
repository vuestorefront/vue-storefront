'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ApolloClient = _interopDefault(require('apollo-client'));
var apolloCacheInmemory = require('apollo-cache-inmemory');
var gql = _interopDefault(require('graphql-tag'));
var core = require('@vue-storefront/core');
var apolloLinkHttp = require('apollo-link-http');
var apolloLinkContext = require('apollo-link-context');
var apolloLink = require('apollo-link');
var apolloLinkRetry = require('apollo-link-retry');
var fetch = _interopDefault(require('isomorphic-fetch'));
var SdkAuth = require('@commercetools/sdk-auth');
var SdkAuth__default = _interopDefault(SdkAuth);
var utilities = require('@apollo/client/utilities');
var apolloLinkError = require('apollo-link-error');

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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var ProductPriceFragment = "\n  fragment DefaultProductPrice on ProductPrice {\n    discounted {\n      value {\n        type\n        currencyCode\n        centAmount\n        fractionDigits\n      }\n      discount {\n        validFrom\n        validUntil\n        isActive\n        name(acceptLanguage: $acceptLanguage)\n      }\n    }\n    value {\n      type\n      currencyCode\n      centAmount\n      fractionDigits\n    }\n  }\n";
var AddressFragment = "\n  fragment DefaultAddress on Address {\n    id\n    title\n    firstName\n    lastName\n    streetName\n    streetNumber\n    postalCode\n    city\n    country\n    state\n    region\n    company\n    apartment\n    phone\n    mobile\n  }\n";
// TODO: Remove all address information and update PRO packages to use customQueries when this is implemented: https://github.com/DivanteLtd/vue-storefront/issues/5049
var CustomerFragment = "\n  " + AddressFragment + "\n\n  fragment DefaultCustomer on Customer {\n    version\n    firstName\n    lastName\n    email\n    addresses {\n      id\n    }\n    shippingAddresses {\n      ...DefaultAddress\n    }\n    billingAddresses {\n      ...DefaultAddress\n    }\n    defaultBillingAddressId\n    defaultShippingAddressId\n  }\n";
var LineItemFragment = "\n  " + ProductPriceFragment + "\n\n  fragment DefaultLineItem on LineItem {\n    id\n    productId\n    name(acceptLanguage: $acceptLanguage)\n    productSlug(acceptLanguage: $acceptLanguage)\n    quantity\n    discountedPricePerQuantity {\n      quantity\n      discountedPrice {\n        value {\n          centAmount\n        }\n        includedDiscounts {\n          discount {\n            name(acceptLanguage: $acceptLanguage)\n            isActive\n          }\n        }\n      }\n    }\n    variant {\n      id\n      sku\n      price(currency: \"USD\") {\n        tiers {\n          value {\n            centAmount\n          }\n        }\n        value {\n          centAmount\n        }\n        discounted {\n          value {\n            centAmount\n          }\n          discount {\n            isActive\n            name(acceptLanguage: $acceptLanguage)\n          }\n        }\n      }\n      images {\n        url\n        label\n      }\n      attributeList {\n        name\n        ... on BooleanAttribute {\n          booleanValue: value\n        }\n        ... on DateAttribute {\n          dateValue: value\n        }\n        ... on DateTimeAttribute {\n          dateTimeValue: value\n        }\n        ... on StringAttribute {\n          stringValue: value\n        }\n        ... on TimeAttribute {\n          timeValue: value\n        }\n        ... on NumberAttribute {\n          numberValue: value\n        }\n        ... on EnumAttribute {\n          key\n          label\n        }\n        ... on LocalizedEnumAttribute {\n          key\n          localizedLabel: label(locale: $locale)\n        }\n        ... on LocalizedStringAttribute {\n          localizedString: value(locale: $locale)\n        }\n        ... on MoneyAttribute {\n          centAmount\n          currencyCode\n        }\n        ... on ReferenceAttribute {\n          typeId\n          id\n        }\n      }\n    }\n    price {\n      ...DefaultProductPrice\n    }\n  }\n";
var ShippingMethodFragment = "\n  fragment DefaultShippingMethod on ShippingMethod {\n    id\n    version\n    name\n    description\n    isDefault\n    localizedDescription(acceptLanguage: $acceptLanguage)\n    zoneRates {\n      zone {\n        id\n        name\n      }\n      shippingRates {\n        freeAbove {\n          type\n          centAmount\n        }\n        isMatching\n        price {\n          centAmount\n        }\n      }\n    }\n  }\n";
var CartFragment = "\n  " + AddressFragment + "\n  " + CustomerFragment + "\n  " + LineItemFragment + "\n  " + ShippingMethodFragment + "\n\n  fragment DefaultCart on Cart {\n    id\n    customerId\n    customerEmail\n    lineItems {\n      ...DefaultLineItem\n    }\n    totalPrice {\n      centAmount\n    }\n    shippingAddress {\n      ...DefaultAddress\n    }\n    billingAddress {\n      ...DefaultAddress\n    }\n    customer {\n      ...DefaultCustomer\n    }\n    totalPrice {\n      centAmount\n    }\n    taxedPrice {\n      totalNet {\n        centAmount\n      }\n      totalGross {\n        centAmount\n      }\n    }\n    paymentInfo {\n      payments {\n        id\n      }\n    }\n    shippingInfo {\n      price {\n        centAmount\n      }\n      shippingMethod {\n        ...DefaultShippingMethod\n      }\n    }\n    discountCodes {\n      discountCode {\n        id\n        code\n        isActive\n        validFrom\n        validUntil\n        name(acceptLanguage: $acceptLanguage)\n      }\n    }\n    refusedGifts {\n      isActive\n      validFrom\n      validUntil\n      name(acceptLanguage: $acceptLanguage)\n    }\n    custom {\n      customFieldsRaw {\n        name\n        value\n      }\n    }\n    cartState\n    version\n  }\n";
var OrderFragment = "\n  " + AddressFragment + "\n  " + LineItemFragment + "\n\n  fragment DefaultOrder on Order {\n    lineItems {\n      ...DefaultLineItem\n    }\n    totalPrice {\n      centAmount\n    }\n    orderState\n    id\n    orderNumber\n    version\n    createdAt\n    customerEmail\n    shipmentState\n    paymentState\n    shippingAddress {\n      ...DefaultAddress\n    }\n    billingAddress {\n      ...DefaultAddress\n    }\n    cart {\n      id\n      version\n    }\n  }\n";

var defaultQuery = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n\n  mutation updateCart($id: String!, $version: Long!, $actions: [MyCartUpdateAction!]!, $locale: Locale!, $acceptLanguage: [Locale!]) {\n    cart: updateMyCart(id: $id, version: $version, actions: $actions) {\n      ...DefaultCart\n    }\n  }\n"], ["\n  ", "\n\n  mutation updateCart($id: String!, $version: Long!, $actions: [MyCartUpdateAction!]!, $locale: Locale!, $acceptLanguage: [Locale!]) {\n    cart: updateMyCart(id: $id, version: $version, actions: $actions) {\n      ...DefaultCart\n    }\n  }\n"])), CartFragment);
var templateObject_1;

var getCustomQuery = function (customQueryFn, params) {
    var defaultQuery = params.defaultQuery, defaultVariables = params.defaultVariables;
    if (customQueryFn) {
        var _a = customQueryFn(defaultQuery, defaultVariables), query = _a.query, variables = _a.variables;
        return {
            query: query || defaultQuery,
            variables: variables || defaultVariables
        };
    }
    return { query: defaultQuery, variables: defaultVariables };
};

var VERSION_MISSMATCH_CODE = 'ConcurrentModification';
var updateCart = function (context, params, customQueryFn) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, locale, acceptLanguage, defaultVariables, _b, query, variables, request, error_1, canRetry, causedByMissmatch;
    var _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _a = context.config, locale = _a.locale, acceptLanguage = _a.acceptLanguage;
                defaultVariables = params
                    ? __assign({ locale: locale,
                        acceptLanguage: acceptLanguage }, params) : { acceptLanguage: acceptLanguage };
                _b = getCustomQuery(customQueryFn, { defaultQuery: defaultQuery, defaultVariables: defaultVariables }), query = _b.query, variables = _b.variables;
                _g.label = 1;
            case 1:
                _g.trys.push([1, 3, , 4]);
                return [4 /*yield*/, context.client.mutate({
                        mutation: gql(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["", ""], ["", ""])), query),
                        variables: variables,
                        fetchPolicy: 'no-cache'
                    })];
            case 2:
                request = _g.sent();
                return [2 /*return*/, request];
            case 3:
                error_1 = _g.sent();
                canRetry = (_c = params.versionFallback) !== null && _c !== void 0 ? _c : true;
                causedByMissmatch = (_f = (_e = (_d = error_1.graphQLErrors) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.code) === null || _f === void 0 ? void 0 : _f.includes(VERSION_MISSMATCH_CODE);
                if (!causedByMissmatch || !canRetry) {
                    throw error_1;
                }
                core.Logger.debug('Cart version missmatch. Retrying with current version.');
                return [2 /*return*/, updateCart(context, __assign(__assign({}, params), { version: error_1.graphQLErrors[0].currentVersion }))];
            case 4: return [2 /*return*/];
        }
    });
}); };
var templateObject_1$1;

var hasContactInfo = function (details) { return Object.keys(details.contactInfo || {}).some(function (c) { return ['phone', 'email', 'mobile', 'fax'].includes(c); }); };
var createAddLineItemAction = function (variant, quantity) { return ({
    addLineItem: {
        variantId: variant.id,
        quantity: quantity,
        sku: variant.sku
    }
}); };
var createRemoveLineItemAction = function (product) { return ({
    removeLineItem: {
        lineItemId: product.id,
        quantity: product.quantity
    }
}); };
var createChangeLineItemQuantityAction = function (product) { return ({
    changeLineItemQuantity: {
        lineItemId: product.id,
        quantity: product.quantity
    }
}); };
var setShippingAddressAction = function (shippingDetails) {
    var _a, _b, _c, _d;
    if (hasContactInfo(shippingDetails)) {
        core.Logger.warn('Using `contactInfo` on Address is being deprecated in the CT API, use `email` `phone` `mobile` and `fax` fields directly.');
    }
    return {
        setShippingAddress: {
            address: {
                title: shippingDetails.title,
                salutation: shippingDetails.salutation,
                firstName: shippingDetails.firstName,
                lastName: shippingDetails.lastName,
                streetName: shippingDetails.streetName,
                streetNumber: shippingDetails.streetNumber,
                additionalStreetInfo: shippingDetails.additionalStreetInfo,
                postalCode: shippingDetails.postalCode,
                city: shippingDetails.city,
                region: shippingDetails.region,
                state: shippingDetails.state,
                country: shippingDetails.country,
                company: shippingDetails.company,
                department: shippingDetails.department,
                building: shippingDetails.building,
                apartment: shippingDetails.apartment,
                pOBox: shippingDetails.pOBox,
                phone: shippingDetails.phone || ((_a = shippingDetails.contactInfo) === null || _a === void 0 ? void 0 : _a.phone),
                mobile: shippingDetails.mobile || ((_b = shippingDetails.contactInfo) === null || _b === void 0 ? void 0 : _b.mobile),
                email: shippingDetails.email || ((_c = shippingDetails.contactInfo) === null || _c === void 0 ? void 0 : _c.email),
                fax: shippingDetails.fax || ((_d = shippingDetails.contactInfo) === null || _d === void 0 ? void 0 : _d.fax),
                additionalAddressInfo: shippingDetails.additionalAddressInfo
            }
        }
    };
};
var addDiscountCodeAction = function (code) { return ({
    addDiscountCode: { code: code }
}); };
var removeDiscountCodeAction = function (discountCode) { return ({
    removeDiscountCode: { discountCode: discountCode }
}); };

var addToCart = function (settings, _a, product, quantity, customQuery) {
    var id = _a.id, version = _a.version;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, updateCart(settings, {
                        id: id,
                        version: version,
                        actions: [createAddLineItemAction(product, quantity)]
                    }, customQuery)];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};

var applyCartCoupon = function (settings, cart, discountCode, customQuery) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, updateCart(settings, {
                    id: cart.id,
                    version: cart.version,
                    actions: [addDiscountCodeAction(discountCode)]
                }, customQuery)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };

var defaultQuery$1 = gql(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n  ", "\n\n  mutation createCart($draft: MyCartDraft!, $locale: Locale!, $acceptLanguage: [Locale!], $storeKey: KeyReferenceInput) {\n    cart: createMyCart(draft: $draft, storeKey: $storeKey) {\n      ...DefaultCart\n    }\n  }\n"], ["\n  ", "\n\n  mutation createCart($draft: MyCartDraft!, $locale: Locale!, $acceptLanguage: [Locale!], $storeKey: KeyReferenceInput) {\n    cart: createMyCart(draft: $draft, storeKey: $storeKey) {\n      ...DefaultCart\n    }\n  }\n"])), CartFragment);
var templateObject_1$2;

var createCart = function (_a, cartDraft, customQueryFn) {
    var config = _a.config, client = _a.client;
    if (cartDraft === void 0) { cartDraft = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var locale, acceptLanguage, currency, defaultVariables, _b, query, variables, request;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    locale = config.locale, acceptLanguage = config.acceptLanguage, currency = config.currency;
                    defaultVariables = {
                        acceptLanguage: acceptLanguage,
                        locale: locale,
                        draft: __assign({ currency: currency }, cartDraft)
                    };
                    _b = getCustomQuery(customQueryFn, { defaultQuery: defaultQuery$1, defaultVariables: defaultVariables }), query = _b.query, variables = _b.variables;
                    return [4 /*yield*/, client.mutate({
                            mutation: gql(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject(["", ""], ["", ""])), query),
                            variables: variables,
                            fetchPolicy: 'no-cache'
                        })];
                case 1:
                    request = _c.sent();
                    return [2 /*return*/, request];
            }
        });
    });
};
var templateObject_1$3;

var AttributeType;
(function (AttributeType) {
    AttributeType["STRING"] = "StringAttribute";
    AttributeType["DATE"] = "DateAttribute";
    AttributeType["DATETIME"] = "DateTimeAttribute";
    AttributeType["TIME"] = "TimeAttribute";
    AttributeType["NUMBER"] = "NumberAttribute";
    AttributeType["ENUM"] = "EnumAttribute";
    AttributeType["LOCALIZED_ENUM"] = "LocalizedEnumAttribute";
    AttributeType["LOCALIZED_STRING"] = "LocalizedStringAttribute";
    AttributeType["MONEY"] = "MoneyAttribute";
    AttributeType["BOOLEAN"] = "BooleanAttribute";
})(AttributeType || (AttributeType = {}));

/* istanbul ignore file */
var AnonymousCartSignInMode;
(function (AnonymousCartSignInMode) {
    /** The anonymous cart is used as new active customer cart. No `LineItem`s get merged. */
    AnonymousCartSignInMode["UseAsNewActiveCustomerCart"] = "UseAsNewActiveCustomerCart";
    /** `LineItem`s of the anonymous cart will be copied to the customer’s active cart that has been modified most recently.
     *
     * The `CartState` of the anonymous cart gets changed to `Merged` while the
     * `CartState` of the customer’s cart remains `Active`.
     *
     * `CustomLineItems` and `CustomFields` of the anonymous cart will not be copied to the customers cart.
     *
     * If a `LineItem` in the anonymous cart matches an existing line item in the
     * customer’s cart (same product ID and variant ID), the maximum quantity of both
     * LineItems is used as the new quantity. In that case `CustomFields` on the
     * `LineItem` of the anonymous cart will not be in the resulting `LineItem`.
     */
    AnonymousCartSignInMode["MergeWithExistingCustomerCart"] = "MergeWithExistingCustomerCart";
})(AnonymousCartSignInMode || (AnonymousCartSignInMode = {}));
var AttributeConstraint;
(function (AttributeConstraint) {
    /** No constraints are applied to the attribute */
    AttributeConstraint["None"] = "None";
    /** Attribute value should be different in each variant */
    AttributeConstraint["Unique"] = "Unique";
    /** A set of attributes, that have this constraint, should have different combinations in each variant */
    AttributeConstraint["CombinationUnique"] = "CombinationUnique";
    /** Attribute value should be the same in all variants */
    AttributeConstraint["SameForAll"] = "SameForAll";
})(AttributeConstraint || (AttributeConstraint = {}));
var CartOrigin;
(function (CartOrigin) {
    /** The cart was created by the merchant on behalf of the customer */
    CartOrigin["Merchant"] = "Merchant";
    /** The cart was created by the customer. This is the default value */
    CartOrigin["Customer"] = "Customer";
})(CartOrigin || (CartOrigin = {}));
var CartState;
(function (CartState) {
    /** The cart was ordered. No further operations on the cart are allowed. */
    CartState["Ordered"] = "Ordered";
    /** Anonymous cart whose content was merged into a customers cart on signin. No further operations on the cart are allowed. */
    CartState["Merged"] = "Merged";
    /** The cart can be updated and ordered. It is the default state. */
    CartState["Active"] = "Active";
})(CartState || (CartState = {}));
var ChannelRole;
(function (ChannelRole) {
    /** Role tells that this channel can be used to track inventory entries.Channels with this role can be treated as warehouses */
    ChannelRole["InventorySupply"] = "InventorySupply";
    /** Role tells that this channel can be used to expose products to a specific
     * distribution channel. It can be used by the cart to select a product price.
     */
    ChannelRole["ProductDistribution"] = "ProductDistribution";
    /** Role tells that this channel can be used to track order export activities. */
    ChannelRole["OrderExport"] = "OrderExport";
    /** Role tells that this channel can be used to track order import activities. */
    ChannelRole["OrderImport"] = "OrderImport";
    /** This role can be combined with some other roles (e.g. with `InventorySupply`)
     * to represent the fact that this particular channel is the primary/master
     * channel among the channels of the same type.
     */
    ChannelRole["Primary"] = "Primary";
})(ChannelRole || (ChannelRole = {}));
var DiscountCodeState;
(function (DiscountCodeState) {
    /** The discount code is active and none of the discounts were applied because the
     * discount application was stopped by one discount that has the StackingMode of
     * StopAfterThisDiscount defined
     */
    DiscountCodeState["ApplicationStoppedByPreviousDiscount"] = "ApplicationStoppedByPreviousDiscount";
    /** The discount code is not valid or it does not contain any valid cart
     * discounts. Validity is determined based on the validFrom and validUntil dates
     */
    DiscountCodeState["NotValid"] = "NotValid";
    /** maxApplications or maxApplicationsPerCustomer for discountCode has been reached. */
    DiscountCodeState["MaxApplicationReached"] = "MaxApplicationReached";
    /** The discount code is active and it contains at least one active and valid
     * CartDiscount. The discount code cartPredicate matches the cart and at least
     * one of the contained active discount’s cart predicates matches the cart.
     */
    DiscountCodeState["MatchesCart"] = "MatchesCart";
    /** The discount code is active and it contains at least one active and valid
     * CartDiscount. But its cart predicate does not match the cart or none of the
     * contained active discount’s cart predicates match the cart
     */
    DiscountCodeState["DoesNotMatchCart"] = "DoesNotMatchCart";
    /** The discount code is not active or it does not contain any active cart discounts. */
    DiscountCodeState["NotActive"] = "NotActive";
})(DiscountCodeState || (DiscountCodeState = {}));
var InventoryMode;
(function (InventoryMode) {
    /** Adding items to cart and ordering is independent of inventory. No inventory checks or modifications.
     * This is the default mode for a new cart.
     */
    InventoryMode["None"] = "None";
    /** Creating an order will fail with an OutOfStock error if an unavailable line item exists. Line items in the cart
     * are only reserved for the duration of the ordering transaction.
     */
    InventoryMode["ReserveOnOrder"] = "ReserveOnOrder";
    /** Orders are tracked on inventory. That means, ordering a LineItem will decrement the available quantity on the
     * respective InventoryEntry. Creating an order will succeed even if the line item’s available quantity is zero or
     * negative. But creating an order will fail with an OutOfStock error if no matching inventory entry exists for a
     * line item.
     */
    InventoryMode["TrackOnly"] = "TrackOnly";
})(InventoryMode || (InventoryMode = {}));
var LineItemMode;
(function (LineItemMode) {
    /** The line item was added automatically, because a discount has added a free gift to the cart.
     * The quantity can not be increased, and it won’t be merged when the same product variant is added.
     * If the gift is removed, an entry is added to the "refusedGifts" array and the discount won’t be applied again
     * to the cart. The price can not be changed externally.
     * All other updates, such as the ones related to custom fields, can be used.
     */
    LineItemMode["GiftLineItem"] = "GiftLineItem";
    /** The line item was added during cart creation or with the update action addLineItem. Its quantity can be
     * changed without restrictions.
     */
    LineItemMode["Standard"] = "Standard";
})(LineItemMode || (LineItemMode = {}));
var LineItemPriceMode;
(function (LineItemPriceMode) {
    /** The price is selected form the product variant. This is the default mode. */
    LineItemPriceMode["Platform"] = "Platform";
    /** The line item price was set externally. Cart discounts can apply to line items
     * with this price mode. All update actions that change the quantity of a line
     * item with this price mode require the externalPrice field to be given.
     */
    LineItemPriceMode["ExternalPrice"] = "ExternalPrice";
    /** The line item price with the total was set externally. */
    LineItemPriceMode["ExternalTotal"] = "ExternalTotal";
})(LineItemPriceMode || (LineItemPriceMode = {}));
var OrderState;
(function (OrderState) {
    OrderState["Confirmed"] = "Confirmed";
    OrderState["Cancelled"] = "Cancelled";
    OrderState["Complete"] = "Complete";
    OrderState["Open"] = "Open";
})(OrderState || (OrderState = {}));
var PaymentState;
(function (PaymentState) {
    PaymentState["Paid"] = "Paid";
    PaymentState["CreditOwed"] = "CreditOwed";
    PaymentState["Pending"] = "Pending";
    PaymentState["Failed"] = "Failed";
    PaymentState["BalanceDue"] = "BalanceDue";
})(PaymentState || (PaymentState = {}));
var PublishScope;
(function (PublishScope) {
    /** Publishes the complete staged projection */
    PublishScope["All"] = "All";
    /** Publishes only prices on the staged projection */
    PublishScope["Prices"] = "Prices";
})(PublishScope || (PublishScope = {}));
var ReturnPaymentState;
(function (ReturnPaymentState) {
    ReturnPaymentState["NotRefunded"] = "NotRefunded";
    ReturnPaymentState["Refunded"] = "Refunded";
    ReturnPaymentState["Initial"] = "Initial";
    ReturnPaymentState["NonRefundable"] = "NonRefundable";
})(ReturnPaymentState || (ReturnPaymentState = {}));
var ReturnShipmentState;
(function (ReturnShipmentState) {
    ReturnShipmentState["Unusable"] = "Unusable";
    ReturnShipmentState["BackInStock"] = "BackInStock";
    ReturnShipmentState["Returned"] = "Returned";
    ReturnShipmentState["Advised"] = "Advised";
})(ReturnShipmentState || (ReturnShipmentState = {}));
var RoundingMode;
(function (RoundingMode) {
    /** [Round half down](https://en.wikipedia.org/wiki/Rounding#Round_half_down).
     * Rounding mode used by, e.g., [Avalara Sales TaxII](https://help.avalara.com/kb/001/How_does_Rounding_with_SalesTaxII_work%3F)
     */
    RoundingMode["HalfDown"] = "HalfDown";
    /** [Round half up](https://en.wikipedia.org/wiki/Rounding#Round_half_up) */
    RoundingMode["HalfUp"] = "HalfUp";
    /** [Round half to even](https://en.wikipedia.org/wiki/Rounding#Round_half_to_even).
     * Default rounding mode as used in IEEE 754 computing functions and operators.
     */
    RoundingMode["HalfEven"] = "HalfEven";
})(RoundingMode || (RoundingMode = {}));
/** In order to decide which of the matching items will actually be discounted */
var SelectionMode;
(function (SelectionMode) {
    SelectionMode["MostExpensive"] = "MostExpensive";
    SelectionMode["Cheapest"] = "Cheapest";
})(SelectionMode || (SelectionMode = {}));
var ShipmentState;
(function (ShipmentState) {
    ShipmentState["Delayed"] = "Delayed";
    ShipmentState["Backorder"] = "Backorder";
    ShipmentState["Partial"] = "Partial";
    ShipmentState["Pending"] = "Pending";
    ShipmentState["Ready"] = "Ready";
    ShipmentState["Shipped"] = "Shipped";
})(ShipmentState || (ShipmentState = {}));
var ShippingMethodState;
(function (ShippingMethodState) {
    /** Either there is no predicate defined for the ShippingMethod or the given predicate matches the cart */
    ShippingMethodState["MatchesCart"] = "MatchesCart";
    /** The ShippingMethod predicate does not match the cart. Ordering this cart will
     * fail with error ShippingMethodDoesNotMatchCart
     */
    ShippingMethodState["DoesNotMatchCart"] = "DoesNotMatchCart";
})(ShippingMethodState || (ShippingMethodState = {}));
/** Describes how this discount interacts with other discounts */
var StackingMode;
(function (StackingMode) {
    /** Don’t apply any more matching discounts after this one. */
    StackingMode["StopAfterThisDiscount"] = "StopAfterThisDiscount";
    /** Default. Continue applying other matching discounts after applying this one. */
    StackingMode["Stacking"] = "Stacking";
})(StackingMode || (StackingMode = {}));
var StateRole;
(function (StateRole) {
    StateRole["Return"] = "Return";
    StateRole["ReviewIncludedInStatistics"] = "ReviewIncludedInStatistics";
})(StateRole || (StateRole = {}));
var StateType;
(function (StateType) {
    StateType["OrderState"] = "OrderState";
    StateType["ProductState"] = "ProductState";
    StateType["ReviewState"] = "ReviewState";
    StateType["PaymentState"] = "PaymentState";
    StateType["LineItemState"] = "LineItemState";
})(StateType || (StateType = {}));
var TaxCalculationMode;
(function (TaxCalculationMode) {
    /** This calculation mode calculates the taxes on the unit price before multiplying with the quantity.
     * E.g. `($1.08 * 1.19 = $1.2852 -> $1.29 rounded) * 3 = $3.87`
     */
    TaxCalculationMode["UnitPriceLevel"] = "UnitPriceLevel";
    /** Default. This calculation mode calculates the taxes after the unit price is multiplied with the quantity.
     * E.g. `($1.08 * 3 = $3.24) * 1.19 = $3.8556 -> $3.86 rounded`
     */
    TaxCalculationMode["LineItemLevel"] = "LineItemLevel";
})(TaxCalculationMode || (TaxCalculationMode = {}));
var TaxMode;
(function (TaxMode) {
    /** No taxes are added to the cart. */
    TaxMode["Disabled"] = "Disabled";
    /** The tax amounts and the tax rates as well as the tax portions are set externally per ExternalTaxAmountDraft.
     * A cart with this tax mode can only be ordered if the cart itself and all line items, all custom line items and
     * the shipping method have an external tax amount and rate set
     */
    TaxMode["ExternalAmount"] = "ExternalAmount";
    /** The tax rates are set externally per ExternalTaxRateDraft. A cart with this tax mode can only be ordered if all
     * line items, all custom line items and the shipping method have an external tax rate set. The totalNet and
     * totalGross as well as the taxPortions fields are calculated by the platform according to the taxRoundingMode.
     */
    TaxMode["External"] = "External";
    /** The tax rates are selected by the platform from the TaxCategories based on the cart shipping address.
     * The totalNet and totalGross as well as the taxPortions fields are calculated by the platform according to the
     * taxRoundingMode.
     */
    TaxMode["Platform"] = "Platform";
})(TaxMode || (TaxMode = {}));
/** UI hint telling what kind of edit control should be displayed for a text attribute. */
var TextInputHint;
(function (TextInputHint) {
    TextInputHint["MultiLine"] = "MultiLine";
    TextInputHint["SingleLine"] = "SingleLine";
})(TextInputHint || (TextInputHint = {}));
var TransactionState;
(function (TransactionState) {
    TransactionState["Failure"] = "Failure";
    TransactionState["Success"] = "Success";
    TransactionState["Pending"] = "Pending";
    TransactionState["Initial"] = "Initial";
})(TransactionState || (TransactionState = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["Chargeback"] = "Chargeback";
    TransactionType["Refund"] = "Refund";
    TransactionType["Charge"] = "Charge";
    TransactionType["CancelAuthorization"] = "CancelAuthorization";
    TransactionType["Authorization"] = "Authorization";
})(TransactionType || (TransactionType = {}));

var CreateMyOrderFromCartMutation = gql(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject(["\n  ", "\n\n  mutation createMyOrderFromCart($draft: OrderMyCartCommand!, $locale: Locale!, $acceptLanguage: [Locale!], $storeKey: KeyReferenceInput) {\n    order: createMyOrderFromCart(draft: $draft, storeKey: $storeKey) {\n      ...DefaultOrder\n    }\n  }\n"], ["\n  ", "\n\n  mutation createMyOrderFromCart($draft: OrderMyCartCommand!, $locale: Locale!, $acceptLanguage: [Locale!], $storeKey: KeyReferenceInput) {\n    order: createMyOrderFromCart(draft: $draft, storeKey: $storeKey) {\n      ...DefaultOrder\n    }\n  }\n"])), OrderFragment);
var templateObject_1$4;

var createMyOrderFromCart = function (_a, draft, customQueryFn) {
    var config = _a.config, client = _a.client;
    return __awaiter(void 0, void 0, void 0, function () {
        var locale, acceptLanguage, defaultVariables, _b, query, variables;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    locale = config.locale, acceptLanguage = config.acceptLanguage;
                    defaultVariables = { locale: locale,
                        acceptLanguage: acceptLanguage,
                        draft: draft
                    };
                    _b = getCustomQuery(customQueryFn, { defaultQuery: CreateMyOrderFromCartMutation, defaultVariables: defaultVariables }), query = _b.query, variables = _b.variables;
                    return [4 /*yield*/, client.mutate({
                            mutation: gql(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject(["", ""], ["", ""])), query),
                            variables: variables,
                            fetchPolicy: 'no-cache'
                        })];
                case 1: return [2 /*return*/, _c.sent()];
            }
        });
    });
};
var templateObject_1$5;

var CustomerChangeMyPassword = gql(templateObject_1$6 || (templateObject_1$6 = __makeTemplateObject(["\n  ", "\n\n  mutation customerChangeMyPassword($version: Long!, $currentPassword: String!, $newPassword: String!, $storeKey: KeyReferenceInput) {\n    user: customerChangeMyPassword(version: $version, currentPassword: $currentPassword, newPassword: $newPassword, storeKey: $storeKey) {\n      ...DefaultCustomer\n    }\n  }\n"], ["\n  ", "\n\n  mutation customerChangeMyPassword($version: Long!, $currentPassword: String!, $newPassword: String!, $storeKey: KeyReferenceInput) {\n    user: customerChangeMyPassword(version: $version, currentPassword: $currentPassword, newPassword: $newPassword, storeKey: $storeKey) {\n      ...DefaultCustomer\n    }\n  }\n"])), CustomerFragment);
var templateObject_1$6;

var customerChangeMyPassword = function (_a, version, currentPassword, newPassword) {
    var client = _a.client;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, client.mutate({
                        mutation: CustomerChangeMyPassword,
                        variables: {
                            version: version,
                            currentPassword: currentPassword,
                            newPassword: newPassword
                        },
                        fetchPolicy: 'no-cache'
                    })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};

var CustomerSignMeInMutation = gql(templateObject_1$7 || (templateObject_1$7 = __makeTemplateObject(["\n  ", "\n  ", "\n\n  mutation customerSignMeIn($draft: CustomerSignMeInDraft!, $locale: Locale!, $acceptLanguage: [Locale!], $storeKey: KeyReferenceInput) {\n    user: customerSignMeIn(draft: $draft, storeKey: $storeKey) {\n      customer {\n        ...DefaultCustomer\n      }\n      cart {\n        ...DefaultCart\n      }\n    }\n  }\n"], ["\n  ", "\n  ", "\n\n  mutation customerSignMeIn($draft: CustomerSignMeInDraft!, $locale: Locale!, $acceptLanguage: [Locale!], $storeKey: KeyReferenceInput) {\n    user: customerSignMeIn(draft: $draft, storeKey: $storeKey) {\n      customer {\n        ...DefaultCustomer\n      }\n      cart {\n        ...DefaultCart\n      }\n    }\n  }\n"])), CustomerFragment, CartFragment);
var templateObject_1$7;

var customerSignMeIn = function (context, draft) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, locale, acceptLanguage, loginResponse;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = context.config, locale = _a.locale, acceptLanguage = _a.acceptLanguage;
                return [4 /*yield*/, context.client.mutate({
                        mutation: CustomerSignMeInMutation,
                        variables: { draft: draft, locale: locale, acceptLanguage: acceptLanguage },
                        fetchPolicy: 'no-cache'
                    })];
            case 1:
                loginResponse = _b.sent();
                return [2 /*return*/, loginResponse];
        }
    });
}); };

var CustomerSignMeUpMutation = gql(templateObject_1$8 || (templateObject_1$8 = __makeTemplateObject(["\n  ", "\n  ", "\n\n  mutation customerSignMeUp($draft: CustomerSignMeUpDraft!, $locale: Locale!, $acceptLanguage: [Locale!], $storeKey: KeyReferenceInput) {\n    user: customerSignMeUp(draft: $draft, storeKey: $storeKey) {\n      customer {\n        ...DefaultCustomer\n      }\n      cart {\n        ...DefaultCart\n      }\n    }\n  }\n"], ["\n  ", "\n  ", "\n\n  mutation customerSignMeUp($draft: CustomerSignMeUpDraft!, $locale: Locale!, $acceptLanguage: [Locale!], $storeKey: KeyReferenceInput) {\n    user: customerSignMeUp(draft: $draft, storeKey: $storeKey) {\n      customer {\n        ...DefaultCustomer\n      }\n      cart {\n        ...DefaultCart\n      }\n    }\n  }\n"])), CustomerFragment, CartFragment);
var templateObject_1$8;

var customerSignMeUp = function (context, draft) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, locale, acceptLanguage, registerResponse;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = context.config, locale = _a.locale, acceptLanguage = _a.acceptLanguage;
                return [4 /*yield*/, context.client.mutate({
                        mutation: CustomerSignMeUpMutation,
                        variables: { draft: draft, locale: locale, acceptLanguage: acceptLanguage },
                        fetchPolicy: 'no-cache'
                    })];
            case 1:
                registerResponse = _b.sent();
                return [2 /*return*/, registerResponse];
        }
    });
}); };

var customerSignOut = function (_a) {
    var config = _a.config, client = _a.client;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            if (config.auth.onTokenRemove) {
                config.auth.onTokenRemove();
            }
            if (client.tokenProvider) {
                client.tokenProvider.invalidateTokenInfo();
            }
            return [2 /*return*/];
        });
    });
};

var changeCustomerEmailAction = function (email) { return ({
    changeEmail: { email: email }
}); };
var setCustomerFirstNameAction = function (firstName) { return ({
    setFirstName: { firstName: firstName }
}); };
var setCustomerLastNameAction = function (lastName) { return ({
    setLastName: { lastName: lastName }
}); };

var CustomerUpdateMeMutation = gql(templateObject_1$9 || (templateObject_1$9 = __makeTemplateObject(["\n  ", "\n\n  mutation customerUpdateMe($version: Long!, $actions: [MyCustomerUpdateAction!]!, $storeKey: KeyReferenceInput) {\n    user: updateMyCustomer(version: $version, actions: $actions, storeKey: $storeKey) {\n      ...DefaultCustomer\n    }\n  }\n"], ["\n  ", "\n\n  mutation customerUpdateMe($version: Long!, $actions: [MyCustomerUpdateAction!]!, $storeKey: KeyReferenceInput) {\n    user: updateMyCustomer(version: $version, actions: $actions, storeKey: $storeKey) {\n      ...DefaultCustomer\n    }\n  }\n"])), CustomerFragment);
var templateObject_1$9;

var customerUpdateMe = function (_a, currentUser, updatedUserData) {
    var client = _a.client;
    return __awaiter(void 0, void 0, void 0, function () {
        var updateResponse;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, client.mutate({
                        mutation: CustomerUpdateMeMutation,
                        variables: {
                            version: currentUser.version,
                            actions: [
                                changeCustomerEmailAction(updatedUserData.email),
                                setCustomerFirstNameAction(updatedUserData.firstName),
                                setCustomerLastNameAction(updatedUserData.lastName)
                            ]
                        },
                        fetchPolicy: 'no-cache'
                    })];
                case 1:
                    updateResponse = _b.sent();
                    return [2 /*return*/, updateResponse.data];
            }
        });
    });
};

var defaultQuery$2 = gql(templateObject_1$a || (templateObject_1$a = __makeTemplateObject(["\n  ", "\n\n  query getCart($cartId: String!, $locale: Locale!, $acceptLanguage: [Locale!]) {\n    cart(id: $cartId) {\n      ...DefaultCart\n    }\n  }\n"], ["\n  ", "\n\n  query getCart($cartId: String!, $locale: Locale!, $acceptLanguage: [Locale!]) {\n    cart(id: $cartId) {\n      ...DefaultCart\n    }\n  }\n"])), CartFragment);
var templateObject_1$a;

var getCart = function (_a, cartId) {
    var config = _a.config, client = _a.client;
    return __awaiter(void 0, void 0, void 0, function () {
        var locale, acceptLanguage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    locale = config.locale, acceptLanguage = config.acceptLanguage;
                    return [4 /*yield*/, client.query({
                            query: defaultQuery$2,
                            variables: { cartId: cartId,
                                locale: locale,
                                acceptLanguage: acceptLanguage },
                            fetchPolicy: 'no-cache'
                        })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
};

var defaultQuery$3 = gql(templateObject_1$b || (templateObject_1$b = __makeTemplateObject(["\n  fragment Children on Category {\n    id\n    slug(acceptLanguage: $acceptLanguage)\n    name(acceptLanguage: $acceptLanguage)\n    childCount\n  }\n\n  fragment DefaultCategory on Category {\n    id\n    slug(acceptLanguage: $acceptLanguage)\n    name(acceptLanguage: $acceptLanguage)\n    childCount\n    children {\n      ...Children\n      children {\n        ...Children\n        children {\n          ...Children\n        }\n      }\n    }\n  }\n\n  query categories($where: String, $sort: [String!], $limit: Int, $offset: Int, $acceptLanguage: [Locale!]) {\n    categories(where: $where, sort: $sort, limit: $limit, offset: $offset) {\n      offset\n      count\n      total\n      results {\n        id\n        slug(acceptLanguage: $acceptLanguage)\n        name(acceptLanguage: $acceptLanguage)\n        description(acceptLanguage: $acceptLanguage)\n        childCount\n        parent {\n          ...DefaultCategory\n          parent {\n            ...DefaultCategory\n            parent {\n              ...DefaultCategory\n            }\n          }\n        }\n        children {\n          ...DefaultCategory\n        }\n      }\n    }\n  }\n"], ["\n  fragment Children on Category {\n    id\n    slug(acceptLanguage: $acceptLanguage)\n    name(acceptLanguage: $acceptLanguage)\n    childCount\n  }\n\n  fragment DefaultCategory on Category {\n    id\n    slug(acceptLanguage: $acceptLanguage)\n    name(acceptLanguage: $acceptLanguage)\n    childCount\n    children {\n      ...Children\n      children {\n        ...Children\n        children {\n          ...Children\n        }\n      }\n    }\n  }\n\n  query categories($where: String, $sort: [String!], $limit: Int, $offset: Int, $acceptLanguage: [Locale!]) {\n    categories(where: $where, sort: $sort, limit: $limit, offset: $offset) {\n      offset\n      count\n      total\n      results {\n        id\n        slug(acceptLanguage: $acceptLanguage)\n        name(acceptLanguage: $acceptLanguage)\n        description(acceptLanguage: $acceptLanguage)\n        childCount\n        parent {\n          ...DefaultCategory\n          parent {\n            ...DefaultCategory\n            parent {\n              ...DefaultCategory\n            }\n          }\n        }\n        children {\n          ...DefaultCategory\n        }\n      }\n    }\n  }\n"])));
var templateObject_1$b;

var mapFilterToPredicate = function (settings, filter) {
    var locale = settings.locale, currency = settings.currency;
    var valuePredicate;
    switch (filter.type) {
        case AttributeType.STRING:
            valuePredicate = "value = \"" + filter.value + "\"";
            break;
        case AttributeType.DATE:
        case AttributeType.DATETIME:
        case AttributeType.TIME:
            valuePredicate = Array.isArray(filter.value) ? "value >= \"" + filter.value[0] + "\" and value <= \"" + filter.value[1] + "\"" : "value = \"" + filter.value + "\"";
            break;
        case AttributeType.NUMBER:
            valuePredicate = Array.isArray(filter.value) ? "value >= " + filter.value[0] + " and value <= " + filter.value[1] : "value = " + filter.value;
            break;
        case AttributeType.ENUM:
        case AttributeType.LOCALIZED_ENUM:
            valuePredicate = "value(key = \"" + filter.value + "\")";
            break;
        case AttributeType.LOCALIZED_STRING:
            valuePredicate = "value(" + locale.toLowerCase() + " = \"" + filter.value + "\")";
            break;
        case AttributeType.MONEY:
            valuePredicate = Array.isArray(filter.value)
                ? "value(centAmount >= " + filter.value[0] * 100 + " and centAmount <= " + filter.value[1] * 100 + " and currencyCode = \"" + currency + "\")"
                : "value(centAmount = " + filter.value + " and currencyCode = \"" + currency + "\")";
            break;
        case AttributeType.BOOLEAN:
            valuePredicate = "value = " + filter.value;
            break;
    }
    return "masterData(current(masterVariant(attributes(name = \"" + filter.name + "\" and " + valuePredicate + "))))";
};
var buildProductWhere = function (settings, search) {
    var acceptLanguage = settings.acceptLanguage;
    var predicates = [];
    if (search === null || search === void 0 ? void 0 : search.catId) {
        var catIds = (Array.isArray(search.catId) ? search.catId : [search.catId]).join('","');
        predicates.push("masterData(current(categories(id in (\"" + catIds + "\"))))");
    }
    if (search === null || search === void 0 ? void 0 : search.slug) {
        var predicate = acceptLanguage.map(function (locale) { return locale + "=\"" + search.slug + "\""; }).join(' or ');
        predicates.push("masterData(current(slug(" + predicate + ")))");
    }
    if (search === null || search === void 0 ? void 0 : search.id) {
        predicates.push("id=\"" + search.id + "\"");
    }
    if (search === null || search === void 0 ? void 0 : search.filters) {
        var filterPredicates = search.filters.map(function (f) { return mapFilterToPredicate(settings, f); }).join(' or ');
        if (filterPredicates) {
            predicates.push(filterPredicates);
        }
    }
    return predicates.join(' and ');
};
var buildCategoryWhere = function (settings, search) {
    var acceptLanguage = settings.acceptLanguage;
    if (search === null || search === void 0 ? void 0 : search.catId) {
        return "id=\"" + search.catId + "\"";
    }
    if (search === null || search === void 0 ? void 0 : search.slug) {
        var predicate = acceptLanguage.map(function (locale) { return locale + "=\"" + search.slug + "\""; }).join(' or ');
        return "slug(" + predicate + ")";
    }
    return undefined;
};
var buildOrderWhere = function (search) {
    if (search === null || search === void 0 ? void 0 : search.id) {
        return "id=\"" + search.id + "\"";
    }
    return null;
};

var getCategory = function (context, params, customQueryFn) { return __awaiter(void 0, void 0, void 0, function () {
    var acceptLanguage, defaultVariables, _a, query, variables, request;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                acceptLanguage = context.config.acceptLanguage;
                defaultVariables = params ? {
                    where: buildCategoryWhere(context.config, params),
                    limit: params.limit,
                    offset: params.offset,
                    acceptLanguage: acceptLanguage
                } : { acceptLanguage: acceptLanguage };
                _a = getCustomQuery(customQueryFn, { defaultQuery: defaultQuery$3, defaultVariables: defaultVariables }), query = _a.query, variables = _a.variables;
                return [4 /*yield*/, context.client.query({
                        query: gql(templateObject_1$c || (templateObject_1$c = __makeTemplateObject(["", ""], ["", ""])), query),
                        variables: variables,
                        fetchPolicy: 'no-cache'
                    })];
            case 1:
                request = _b.sent();
                return [2 /*return*/, request];
        }
    });
}); };
var templateObject_1$c;

var basicProfile = gql(templateObject_1$d || (templateObject_1$d = __makeTemplateObject(["\n  ", "\n\n  query getMe($locale: Locale!, $acceptLanguage: [Locale!]) {\n    me {\n      activeCart {\n        ...DefaultCart\n      }\n    }\n  }\n"], ["\n  ", "\n\n  query getMe($locale: Locale!, $acceptLanguage: [Locale!]) {\n    me {\n      activeCart {\n        ...DefaultCart\n      }\n    }\n  }\n"])), CartFragment);
var fullProfile = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  ", "\n  ", "\n\n  query getMe($locale: Locale!, $acceptLanguage: [Locale!]) {\n    me {\n      activeCart {\n        ...DefaultCart\n      }\n      customer {\n        ...DefaultCustomer\n      }\n    }\n  }\n"], ["\n  ", "\n  ", "\n\n  query getMe($locale: Locale!, $acceptLanguage: [Locale!]) {\n    me {\n      activeCart {\n        ...DefaultCart\n      }\n      customer {\n        ...DefaultCustomer\n      }\n    }\n  }\n"])), CartFragment, CustomerFragment);
var templateObject_1$d, templateObject_2;

var getMe = function (_a, params, customQueryFn) {
    var config = _a.config, client = _a.client;
    if (params === void 0) { params = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var locale, acceptLanguage, customer, defaultQuery, defaultVariables, _b, query, variables, request;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    locale = config.locale, acceptLanguage = config.acceptLanguage;
                    customer = params.customer;
                    defaultQuery = customer ? fullProfile : basicProfile;
                    defaultVariables = {
                        locale: locale,
                        acceptLanguage: acceptLanguage
                    };
                    _b = getCustomQuery(customQueryFn, { defaultQuery: defaultQuery, defaultVariables: defaultVariables }), query = _b.query, variables = _b.variables;
                    return [4 /*yield*/, client.query({
                            query: gql(templateObject_1$e || (templateObject_1$e = __makeTemplateObject(["", ""], ["", ""])), query),
                            variables: variables,
                            fetchPolicy: 'no-cache'
                        })];
                case 1:
                    request = _c.sent();
                    return [2 /*return*/, request];
            }
        });
    });
};
var templateObject_1$e;

var defaultQuery$4 = gql(templateObject_1$f || (templateObject_1$f = __makeTemplateObject(["\n  ", "\n\n  query getMe($where: String, $sort: [String!], $limit: Int, $offset: Int, $locale: Locale!, $acceptLanguage: [Locale!]) {\n    me {\n      orders(where: $where, sort: $sort, limit: $limit, offset: $offset) {\n        results {\n          ...DefaultOrder\n        }\n      }\n    }\n  }\n"], ["\n  ", "\n\n  query getMe($where: String, $sort: [String!], $limit: Int, $offset: Int, $locale: Locale!, $acceptLanguage: [Locale!]) {\n    me {\n      orders(where: $where, sort: $sort, limit: $limit, offset: $offset) {\n        results {\n          ...DefaultOrder\n        }\n      }\n    }\n  }\n"])), OrderFragment);
var templateObject_1$f;

var getOrders = function (_a, params, customQueryFn) {
    var config = _a.config, client = _a.client;
    return __awaiter(void 0, void 0, void 0, function () {
        var locale, acceptLanguage, defaultVariables, _b, query, variables, request;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    locale = config.locale, acceptLanguage = config.acceptLanguage;
                    defaultVariables = {
                        where: buildOrderWhere(params),
                        sort: params.sort,
                        limit: params.limit,
                        offset: params.offset,
                        acceptLanguage: acceptLanguage,
                        locale: locale
                    };
                    _b = getCustomQuery(customQueryFn, { defaultQuery: defaultQuery$4, defaultVariables: defaultVariables }), query = _b.query, variables = _b.variables;
                    return [4 /*yield*/, client.query({
                            query: gql(templateObject_1$g || (templateObject_1$g = __makeTemplateObject(["", ""], ["", ""])), query),
                            variables: variables,
                            fetchPolicy: 'no-cache'
                        })];
                case 1:
                    request = _c.sent();
                    return [2 /*return*/, request];
            }
        });
    });
};
var templateObject_1$g;

var defaultQuery$5 = gql(templateObject_1$h || (templateObject_1$h = __makeTemplateObject(["\n  ", "\n\n  fragment Images on ProductVariant {\n    images {\n      url\n      label\n    }\n  }\n\n  fragment Price on ProductVariant {\n    price(currency: $currency, country: $country) {\n      ...DefaultProductPrice\n    }\n  }\n\n  fragment Attributes on ProductVariant {\n    attributeList {\n      name\n      ... on BooleanAttribute {\n        booleanValue: value\n      }\n      ... on DateAttribute {\n        dateValue: value\n      }\n      ... on DateTimeAttribute {\n        dateTimeValue: value\n      }\n      ... on StringAttribute {\n        stringValue: value\n      }\n      ... on TimeAttribute {\n        timeValue: value\n      }\n      ... on NumberAttribute {\n        numberValue: value\n      }\n      ... on EnumAttribute {\n        key\n        label\n      }\n      ... on LocalizedEnumAttribute {\n        key\n        localizedLabel: label(locale: $locale)\n      }\n      ... on LocalizedStringAttribute {\n        localizedString: value(locale: $locale)\n      }\n      ... on MoneyAttribute {\n        centAmount\n        currencyCode\n      }\n      ... on ReferenceAttribute {\n        typeId\n        id\n      }\n    }\n  }\n\n  fragment DefaultVariant on ProductVariant {\n    id\n    sku\n    ...Images\n    ...Price\n    ...Attributes\n  }\n\n  query products(\n    $where: String\n    $sort: [String!]\n    $limit: Int\n    $offset: Int\n    $skus: [String!]\n    $locale: Locale!\n    $acceptLanguage: [Locale!]\n    $currency: Currency!\n    $country: Country!\n  ) {\n    products(\n      where: $where\n      sort: $sort\n      limit: $limit\n      offset: $offset\n      skus: $skus\n    ) {\n      offset\n      count\n      total\n      results {\n        id\n        reviewRatingStatistics {\t\n          averageRating,\n          ratingsDistribution,\n          count\n        }\n        masterData {\n          current {\n            slug(acceptLanguage: $acceptLanguage)\n            name(acceptLanguage: $acceptLanguage)\n            metaTitle(acceptLanguage: $acceptLanguage)\n            metaKeywords(acceptLanguage: $acceptLanguage)\n            metaDescription(acceptLanguage: $acceptLanguage)\n            description(acceptLanguage: $acceptLanguage)\n            categoriesRef {\n              id\n            }\n            allVariants {\n              ...DefaultVariant\n            }\n            masterVariant {\n              ...DefaultVariant\n            }\n          }\n        }\n      }\n    }\n  }\n"], ["\n  ", "\n\n  fragment Images on ProductVariant {\n    images {\n      url\n      label\n    }\n  }\n\n  fragment Price on ProductVariant {\n    price(currency: $currency, country: $country) {\n      ...DefaultProductPrice\n    }\n  }\n\n  fragment Attributes on ProductVariant {\n    attributeList {\n      name\n      ... on BooleanAttribute {\n        booleanValue: value\n      }\n      ... on DateAttribute {\n        dateValue: value\n      }\n      ... on DateTimeAttribute {\n        dateTimeValue: value\n      }\n      ... on StringAttribute {\n        stringValue: value\n      }\n      ... on TimeAttribute {\n        timeValue: value\n      }\n      ... on NumberAttribute {\n        numberValue: value\n      }\n      ... on EnumAttribute {\n        key\n        label\n      }\n      ... on LocalizedEnumAttribute {\n        key\n        localizedLabel: label(locale: $locale)\n      }\n      ... on LocalizedStringAttribute {\n        localizedString: value(locale: $locale)\n      }\n      ... on MoneyAttribute {\n        centAmount\n        currencyCode\n      }\n      ... on ReferenceAttribute {\n        typeId\n        id\n      }\n    }\n  }\n\n  fragment DefaultVariant on ProductVariant {\n    id\n    sku\n    ...Images\n    ...Price\n    ...Attributes\n  }\n\n  query products(\n    $where: String\n    $sort: [String!]\n    $limit: Int\n    $offset: Int\n    $skus: [String!]\n    $locale: Locale!\n    $acceptLanguage: [Locale!]\n    $currency: Currency!\n    $country: Country!\n  ) {\n    products(\n      where: $where\n      sort: $sort\n      limit: $limit\n      offset: $offset\n      skus: $skus\n    ) {\n      offset\n      count\n      total\n      results {\n        id\n        reviewRatingStatistics {\t\n          averageRating,\n          ratingsDistribution,\n          count\n        }\n        masterData {\n          current {\n            slug(acceptLanguage: $acceptLanguage)\n            name(acceptLanguage: $acceptLanguage)\n            metaTitle(acceptLanguage: $acceptLanguage)\n            metaKeywords(acceptLanguage: $acceptLanguage)\n            metaDescription(acceptLanguage: $acceptLanguage)\n            description(acceptLanguage: $acceptLanguage)\n            categoriesRef {\n              id\n            }\n            allVariants {\n              ...DefaultVariant\n            }\n            masterVariant {\n              ...DefaultVariant\n            }\n          }\n        }\n      }\n    }\n  }\n"])), ProductPriceFragment);
var templateObject_1$h;

var getProduct = function (context, params, customQueryFn) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, locale, acceptLanguage, currency, country, defaultVariables, _b, query, variables, request;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = context.config, locale = _a.locale, acceptLanguage = _a.acceptLanguage, currency = _a.currency, country = _a.country;
                defaultVariables = {
                    where: buildProductWhere(context.config, params),
                    skus: params.skus,
                    limit: params.limit,
                    offset: params.offset,
                    locale: locale,
                    acceptLanguage: acceptLanguage,
                    currency: currency,
                    country: country
                };
                _b = getCustomQuery(customQueryFn, { defaultQuery: defaultQuery$5, defaultVariables: defaultVariables }), query = _b.query, variables = _b.variables;
                return [4 /*yield*/, context.client.query({
                        query: gql(templateObject_1$i || (templateObject_1$i = __makeTemplateObject(["", ""], ["", ""])), query),
                        variables: variables,
                        // temporary, seems like bug in apollo:
                        // @link: https://github.com/apollographql/apollo-client/issues/3234
                        fetchPolicy: 'no-cache'
                    })];
            case 1:
                request = _c.sent();
                return [2 /*return*/, request];
        }
    });
}); };
var templateObject_1$i;

var defaultQuery$6 = gql(templateObject_1$j || (templateObject_1$j = __makeTemplateObject(["\n  ", "\n\n  query shippingMethods($acceptLanguage: [Locale!], $cartId: String!) {\n    shippingMethods: shippingMethodsByCart(id: $cartId) {\n      ...DefaultShippingMethod\n    }\n  }\n"], ["\n  ", "\n\n  query shippingMethods($acceptLanguage: [Locale!], $cartId: String!) {\n    shippingMethods: shippingMethodsByCart(id: $cartId) {\n      ...DefaultShippingMethod\n    }\n  }\n"])), ShippingMethodFragment);
var templateObject_1$j;

var getShippingMethods = function (_a, cartId, customQueryFn) {
    var config = _a.config, client = _a.client;
    return __awaiter(void 0, void 0, void 0, function () {
        var acceptLanguage, defaultVariables, _b, query, variables;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    acceptLanguage = config.acceptLanguage;
                    defaultVariables = {
                        acceptLanguage: acceptLanguage, cartId: cartId
                    };
                    _b = getCustomQuery(customQueryFn, { defaultQuery: defaultQuery$6, defaultVariables: defaultVariables }), query = _b.query, variables = _b.variables;
                    return [4 /*yield*/, client.query({
                            query: gql(templateObject_1$k || (templateObject_1$k = __makeTemplateObject(["", ""], ["", ""])), query),
                            variables: variables,
                            fetchPolicy: 'no-cache'
                        })];
                case 1: return [2 /*return*/, _c.sent()];
            }
        });
    });
};
var templateObject_1$k;

var isAnonymousSession = function (token) { var _a; return (_a = token === null || token === void 0 ? void 0 : token.scope) === null || _a === void 0 ? void 0 : _a.includes('anonymous_id'); };
var isUserSession = function (token) { var _a; return (_a = token === null || token === void 0 ? void 0 : token.scope) === null || _a === void 0 ? void 0 : _a.includes('customer_id'); };
var getAccessToken = function (token) { return token ? token.access_token : null; };

var isGuest = function (context) {
    var client = context.client, config = context.config;
    if (config.handleIsGuest) {
        return config.handleIsGuest(context);
    }
    if (client.tokenProvider || context.isProxy) {
        var token = config.auth.onTokenRead();
        return !isAnonymousSession(token) && !isUserSession(token);
    }
    return false;
};

var removeCartCoupon = function (context, cart, discountCode, customQuery) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, updateCart(context, {
                    id: cart.id,
                    version: cart.version,
                    actions: [removeDiscountCodeAction(discountCode)]
                }, customQuery)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };

var removeFromCart = function (context, cart, product, customQuery) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, updateCart(context, {
                    id: cart.id,
                    version: cart.version,
                    actions: [createRemoveLineItemAction(product)]
                }, customQuery)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };

var updateCartQuantity = function (context, cart, product, customQuery) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, updateCart(context, {
                    id: cart.id,
                    version: cart.version,
                    actions: [createChangeLineItemQuantityAction(product)]
                }, customQuery)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };

var updateShippingDetails = function (context, cart, shippingDetails, customQueryFn) { return __awaiter(void 0, void 0, void 0, function () {
    var cartResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, updateCart(context, {
                    id: cart.id,
                    version: cart.version,
                    actions: [setShippingAddressAction(shippingDetails)]
                }, customQueryFn)];
            case 1:
                cartResponse = _a.sent();
                return [2 /*return*/, cartResponse];
        }
    });
}); };



var api = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addToCart: addToCart,
    applyCartCoupon: applyCartCoupon,
    createCart: createCart,
    createMyOrderFromCart: createMyOrderFromCart,
    customerChangeMyPassword: customerChangeMyPassword,
    customerSignMeIn: customerSignMeIn,
    customerSignMeUp: customerSignMeUp,
    customerSignOut: customerSignOut,
    customerUpdateMe: customerUpdateMe,
    getCart: getCart,
    getCategory: getCategory,
    getMe: getMe,
    getOrders: getOrders,
    getProduct: getProduct,
    getShippingMethods: getShippingMethods,
    isGuest: isGuest,
    removeCartCoupon: removeCartCoupon,
    removeFromCart: removeFromCart,
    updateCart: updateCart,
    updateCartQuantity: updateCartQuantity,
    updateShippingDetails: updateShippingDetails
});

/* istanbul ignore file */
var restrictedOperations = {
    anonymous: [
        'createCart',
        'createMyShoppingList'
    ],
    user: [
        'customerSignMeIn',
        'customerSignMeUp'
    ]
};
var isAnonymousOperation = function (operationName) { return restrictedOperations.anonymous.includes(operationName); };
var isUserOperation = function (operationName) { return restrictedOperations.user.includes(operationName); };

var handleBeforeAuth = function (_a) {
    var sdkAuth = _a.sdkAuth, tokenProvider = _a.tokenProvider, apolloReq = _a.apolloReq, currentToken = _a.currentToken;
    return __awaiter(void 0, void 0, void 0, function () {
        var isAnonymous, isUser, isGuest, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    isAnonymous = isAnonymousSession(currentToken);
                    isUser = isUserSession(currentToken);
                    isGuest = !isAnonymous && !isUser;
                    if (!(isGuest && isAnonymousOperation(apolloReq.operationName))) return [3 /*break*/, 2];
                    core.Logger.debug('Apollo authLinkBefore, anonymousFlow', apolloReq.operationName);
                    return [4 /*yield*/, sdkAuth.anonymousFlow()];
                case 1:
                    token = _b.sent();
                    tokenProvider.setTokenInfo(token);
                    core.Logger.debug('Apollo authLinkBefore, anonymousFlow, generated token: ', getAccessToken(token));
                    return [2 /*return*/, token];
                case 2: return [2 /*return*/, tokenProvider.getTokenInfo()];
            }
        });
    });
};
var handleAfterAuth = function (_a) {
    var sdkAuth = _a.sdkAuth, tokenProvider = _a.tokenProvider, apolloReq = _a.apolloReq, currentToken = _a.currentToken;
    return __awaiter(void 0, void 0, void 0, function () {
        var _b, email, password, token;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(!isUserSession(currentToken) && isUserOperation(apolloReq.operationName))) return [3 /*break*/, 2];
                    _b = apolloReq.variables.draft, email = _b.email, password = _b.password;
                    core.Logger.debug('Apollo authLinkAfter, customerPasswordFlow', apolloReq.operationName);
                    return [4 /*yield*/, sdkAuth.customerPasswordFlow({ username: email, password: password })];
                case 1:
                    token = _c.sent();
                    tokenProvider.setTokenInfo(token);
                    core.Logger.debug('Apollo authLinkAfter, customerPasswordFlow, generated token: ', getAccessToken(token));
                    return [2 /*return*/, token];
                case 2: return [2 /*return*/, currentToken];
            }
        });
    });
};
var handleRetry = function (_a) {
    var tokenProvider = _a.tokenProvider;
    return function (count, operation, error) {
        if (count > 3) {
            return false;
        }
        if (error.result.message === 'invalid_token') {
            core.Logger.debug("Apollo retry-link, the operation (" + operation.operationName + ") sent with wrong token, creating a new one... (attempt: " + count + ")");
            tokenProvider.invalidateTokenInfo();
            return true;
        }
        return false;
    };
};

var createAuthClient = function (config) {
    return new SdkAuth__default({
        host: config.authHost,
        projectKey: config.projectKey,
        disableRefreshToken: false,
        credentials: {
            clientId: config.clientId,
            clientSecret: config.clientSecret
        },
        scopes: config.scopes
    });
};
var createTokenProvider = function (settings, _a) {
    var sdkAuth = _a.sdkAuth, currentToken = _a.currentToken;
    return new SdkAuth.TokenProvider({
        sdkAuth: sdkAuth,
        fetchTokenInfo: function (sdkAuthInstance) { return sdkAuthInstance.clientCredentialsFlow(); },
        onTokenInfoChanged: function (tokenInfo) {
            core.Logger.debug('TokenProvider.onTokenInfoChanged', getAccessToken(tokenInfo));
            settings.auth.onTokenChange(tokenInfo);
        },
        onTokenInfoRefreshed: function (tokenInfo) {
            core.Logger.debug('TokenProvider.onTokenInfoRefreshed', getAccessToken(tokenInfo));
        }
    }, currentToken);
};
var createErrorHandler = function () {
    return apolloLinkError.onError(function (_a) {
        var graphQLErrors = _a.graphQLErrors, networkError = _a.networkError;
        if (graphQLErrors) {
            graphQLErrors.map(function (_a) {
                var message = _a.message, locations = _a.locations, path = _a.path;
                if (!message.includes('Resource Owner Password Credentials Grant')) {
                    if (!locations) {
                        core.Logger.error("[GraphQL error]: Message: " + message + ", Path: " + path);
                        return;
                    }
                    var parsedLocations = locations.map(function (_a) {
                        var column = _a.column, line = _a.line;
                        return "[column: " + column + ", line: " + line + "]";
                    });
                    core.Logger.error("[GraphQL error]: Message: " + message + ", Location: " + parsedLocations.join(', ') + ", Path: " + path);
                }
            });
        }
        if (networkError) {
            core.Logger.error("[Network error]: " + networkError);
        }
    });
};
var createCommerceToolsConnection = function (settings) {
    var currentToken = settings.auth.onTokenRead();
    core.Logger.debug('createCommerceToolsConnection', getAccessToken(currentToken));
    var sdkAuth = createAuthClient(settings.api);
    var tokenProvider = createTokenProvider(settings, { sdkAuth: sdkAuth, currentToken: currentToken });
    var httpLink = apolloLinkHttp.createHttpLink({ uri: settings.api.uri, fetch: fetch });
    var onErrorLink = createErrorHandler();
    var authLinkBefore = apolloLinkContext.setContext(function (apolloReq, _a) {
        var headers = _a.headers;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        core.Logger.debug('Apollo authLinkBefore', apolloReq.operationName);
                        return [4 /*yield*/, handleBeforeAuth({ sdkAuth: sdkAuth, tokenProvider: tokenProvider, apolloReq: apolloReq, currentToken: currentToken })];
                    case 1:
                        currentToken = _b.sent();
                        core.Logger.debug('Apollo authLinkBefore, finished, generated token: ', getAccessToken(currentToken));
                        return [2 /*return*/, {
                                headers: __assign(__assign({}, headers), { authorization: "Bearer " + currentToken.access_token })
                            }];
                }
            });
        });
    });
    var authLinkAfter = new apolloLink.ApolloLink(function (apolloReq, forward) {
        return utilities.asyncMap(forward(apolloReq), function (response) { return __awaiter(void 0, void 0, void 0, function () {
            var errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        core.Logger.debug('Apollo authLinkAfter', apolloReq.operationName);
                        return [4 /*yield*/, handleAfterAuth({ sdkAuth: sdkAuth, tokenProvider: tokenProvider, apolloReq: apolloReq, currentToken: currentToken })];
                    case 1:
                        currentToken = _a.sent();
                        errors = (response.errors || []).filter(function (_a) {
                            var message = _a.message;
                            return !message.includes('Resource Owner Password Credentials Grant') &&
                                !message.includes('This endpoint requires an access token issued either');
                        });
                        return [2 /*return*/, __assign(__assign({}, response), { errors: errors })];
                }
            });
        }); });
    });
    var errorRetry = new apolloLinkRetry.RetryLink({
        attempts: handleRetry({ tokenProvider: tokenProvider }),
        delay: function () { return 0; }
    });
    var apolloLink$1 = apolloLink.ApolloLink.from([onErrorLink, errorRetry, authLinkBefore, authLinkAfter.concat(httpLink)]);
    return {
        apolloLink: apolloLink$1,
        sdkAuth: sdkAuth,
        tokenProvider: tokenProvider
    };
};

var defaultSettings = {
    locale: 'en',
    acceptLanguage: ['en'],
    auth: {
        onTokenChange: function () { },
        onTokenRead: function () { return ''; },
        onTokenRemove: function () { }
    },
    cookies: {
        currencyCookieName: 'vsf-currency',
        countryCookieName: 'vsf-country',
        localeCookieName: 'vsf-locale'
    }
};

var onCreate = function (settings) {
    var languageMap = settings.languageMap || {};
    var acceptLanguage = settings.acceptLanguage || defaultSettings.acceptLanguage;
    var locale = settings.locale || defaultSettings.locale;
    var config = __assign(__assign(__assign({}, defaultSettings), settings), { languageMap: languageMap, acceptLanguage: languageMap[locale] || acceptLanguage, auth: settings.auth || defaultSettings.auth });
    if (settings.client) {
        return { client: settings.client, config: config };
    }
    if (settings.customOptions && settings.customOptions.link) {
        return {
            client: new ApolloClient(__assign({ cache: new apolloCacheInmemory.InMemoryCache() }, settings.customOptions)),
            config: config
        };
    }
    var _a = createCommerceToolsConnection(config), apolloLink = _a.apolloLink, sdkAuth = _a.sdkAuth, tokenProvider = _a.tokenProvider;
    var client = new ApolloClient(__assign({ link: apolloLink, cache: new apolloCacheInmemory.InMemoryCache() }, settings.customOptions));
    client.sdkAuth = sdkAuth;
    client.tokenProvider = tokenProvider;
    return {
        config: config,
        client: client
    };
};
var parseToken = function (rawToken) {
    try {
        return JSON.parse(rawToken);
    }
    catch (e) {
        return null;
    }
};
var tokenExtension = function (req, res) {
    var rawCurrentToken = req.cookies['vsf-commercetools-token'];
    var currentToken = parseToken(rawCurrentToken);
    return {
        beforeCreate: function (config) { return (__assign(__assign({}, config), { auth: {
                onTokenChange: function (newToken) {
                    if (!currentToken || currentToken.access_token !== newToken.access_token) {
                        res.cookie('vsf-commercetools-token', JSON.stringify(newToken));
                    }
                },
                onTokenRead: function () {
                    res.cookie('vsf-commercetools-token', rawCurrentToken);
                    return currentToken;
                },
                onTokenRemove: function () {
                    delete req.cookies['vsf-commercetools-token'];
                }
            } })); }
    };
};
var _a = core.apiClientFactory({
    tag: 'ct',
    onCreate: onCreate,
    api: api,
    extensions: [tokenExtension]
}), createApiClient = _a.createApiClient, integrationPlugin = _a.integrationPlugin;

exports.createApiClient = createApiClient;
exports.integrationPlugin = integrationPlugin;
//# sourceMappingURL=index.js.map
