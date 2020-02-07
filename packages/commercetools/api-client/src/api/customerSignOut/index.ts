import { cleanToken } from './../../helpers/createCommerceToolsLink/tokenCache'

const customerSignOut = async (): Promise<void> => {
  cleanToken()
}

export default customerSignOut
