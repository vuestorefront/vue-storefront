import { Billing, Payment, Shipping, ThankYou } from './checkout';
import Cart from './components/cart-sidebar';
import LoginModal from './components/login-modal';
import Home from './home';
import { Sidebar } from './my-account';
import { Product } from './product';
import { Category } from './category';

const page = {
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

  category(category?: string) {
    return new Category(category);
  },

  product(id?: string, slug?: string) {
    return new Product(id, slug);
  }

};

export default page;
