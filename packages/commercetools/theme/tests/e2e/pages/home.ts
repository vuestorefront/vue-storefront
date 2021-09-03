import Base from './base';
import Header from './components/header';

class Home extends Base {
  get header() {
    return Header;
  }

}

export default new Home();
