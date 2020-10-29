import fetch from './fetch';
import signIn from './signIn';
import signUp from './signUp';
import signOut from './signOut';
import changePassword from './changePassword';
import editProfile from './editProfile';
import forgotPassword from './forgotPassword';
import fetchOrders from './fetchOrders';

const getCustomer = {
  fetch: fetch,
  signIn: signIn,
  signUp: signUp,
  signOut: signOut,
  changePassword: changePassword,
  editProfile: editProfile,
  forgotPassword: forgotPassword,
  fetchOrders: fetchOrders
};

export default getCustomer;
