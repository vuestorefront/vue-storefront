import Category from './category';
import { Billing, Payment, Shipping, ThankYou } from './checkout';
import Cart from './components/cart-sidebar';
import LoginModal from './components/login-modal';
import Home from './home';
import { Sidebar } from './my-account';
import Product from './product';

const page = {
  get category() {
    return Category;
  },

  get checkout() {
    return {
      shipping: new Shipping(),
      billing: new Billing(),
      payment: new Payment(),
      thankyou: new ThankYou()
    };
  },

  get components() {
    return {
      cart: Cart,
      loginModal: LoginModal
    };
  },

  get home() {
    return Home;
  },

  get myAccount() {
    return {
      sidebar: new Sidebar()
    };
  },

  get product() {
    return Product;
  }
};

export default page;
