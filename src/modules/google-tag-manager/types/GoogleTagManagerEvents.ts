enum GoogleTagManagerEvents {
  CHECKOUT_SECTION_CHANGE = 'checkoutSectionChange',
  MAKE_ANOTHER_FROM_CART = 'makeAnotherFromCart',
  PLUSHIE_WIZARD_PHOTOS_PROVIDE = 'WizardPhotosProvide',
  PLUSHIE_WIZARD_INFO_FILL = 'WizardInfoFill',
  PLUSHIE_WIZARD_TYPE_CHANGE = 'WizardTypeChange',
  LOGIN = 'login',
  SIGN_UP = 'sign_up',
  REMOVE_FORM_CART = 'remove_from_cart',
  SELECT_ITEM = 'select_item',
  VIEW_CART = 'view_cart',
  VIEW_ITEM_LIST = 'view_item_list',
  ADD_PAYMENT_INFO = 'add_payment_info',
  ADD_SHIPPING_INFO = 'add_shipping_info',
  BEGIN_CHECKOUT = 'begin_checkout',
  PURCHASE = 'purchase',
  ADD_TO_CART = 'add_to_cart',
  VIEW_ITEM = 'view_item',
  PURCHASE_ERROR = 'purchase_error',
  A_B_TEST_GROUP_CHANGED = 'experience_impression',
  USER_DATA_CHANGED = 'user_data_changed',
}

export default GoogleTagManagerEvents;
