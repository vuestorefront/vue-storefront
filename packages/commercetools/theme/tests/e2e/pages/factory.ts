import { Billing, Payment, Shipping, ThankYou } from './checkout';
import Breadcrumbs from './components/breadcrumbs';
import Cart from './components/cart-sidebar';
import LoginModal from './components/login-modal';
import Home from './home';
import { MyProfile, OrderHistory } from './my-account';
import { Product } from './product';
import { Category } from './category';
import CategoryAccordion from './components/category-accordion';

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
      loginModal: LoginModal,
      breadcrumbs: Breadcrumbs,
      categoryAccordion: CategoryAccordion
    };
  },

  get home() {
    return Home;
  },

  get myAccount() {
    return {
      myProfile: new MyProfile(),
      orderHistory: new OrderHistory()
    };
  },

  category(category?: string, subcategory?: string) {
    return new Category(category, subcategory);
  },

  product(id?: string, slug?: string) {
    return new Product(id, slug);
  }

};

export default page;
