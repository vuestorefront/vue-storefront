import OrgUserState from '@vue-storefront/core/modules/user/types/UserState'

export default interface UserState extends OrgUserState {
  sessionData: Record<string, any>
}
