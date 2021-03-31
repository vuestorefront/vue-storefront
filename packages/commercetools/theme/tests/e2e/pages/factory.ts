import Category from './category';
import { Billing, Payment, Shipping, ThankYou } from './checkout';
import Cart from './components/cart-sidebar';
import Home from './home';
import Product from './product';

const page = {
  get cart() {
    return Cart;
  },
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
  get home() {
    return Home;
  },
  get product() {
    return Product;
  }
};

export default page;
