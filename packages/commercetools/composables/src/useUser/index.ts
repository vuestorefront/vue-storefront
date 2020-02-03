import { ref, Ref } from '@vue/composition-api'
import { UseUser } from '@vue-storefront/interfaces'
import { CustomerSignMeInDraft, CustomerSignMeUpDraft, Customer } from '@vue-storefront/commercetools-api/lib/src/types/GraphQL'
import  { customerSignMeUp } from '@vue-storefront/commercetools-api'

type UserRef = Ref<Customer>
type RegisterFn = (userData: CustomerSignMeInDraft) => Promise<void>
type LoginFn = (userData: CustomerSignMeInDraft) => Promise<void>
type LogoutFn = () => Promise<void>

const user: UserRef = ref({})

export default function useUser(): UseUser<UserRef, RegisterFn, LoginFn, LogoutFn> {
  const loading = ref(false)
  const error = ref(null)

  const register = async (userData: CustomerSignMeUpDraft) => {
    loading.value = true
    const registerResponse = await customerSignMeUp(userData)
    user.value = registerResponse.data.customer
    loading.value = false
  }

  const login = async (userData: CustomerSignMeInDraft) => {}
  const logout = async () => {}

  return {
    user,
    register,
    login,
    logout,
    loading,
    error
  }
}
