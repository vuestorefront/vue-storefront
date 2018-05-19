import Vue from 'vue'
import Logo from '../../logo'
import AccountIcon from './accountIcon'
import SearchIcon from './searchIcon'
import MicrocartIcon from './microcartIcon'
import HamburgerIcon from './hamburgerIcon'
import ReturnIcon from './returnIcon'
import WishlistIcon from './wishlistIcon'
import CompareIcon from './compareIcon'

export default Vue.component('MainHeader', {
  components: {
    AccountIcon,
    Logo,
    SearchIcon,
    MicrocartIcon,
    HamburgerIcon,
    ReturnIcon,
    WishlistIcon,
    CompareIcon
  }
})
