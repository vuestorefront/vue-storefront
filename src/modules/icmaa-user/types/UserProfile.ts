import { UserProfile as OrgUserProfile } from '@vue-storefront/core/modules/user/types/UserProfile'

export default interface UserProfile extends OrgUserProfile {
  customer: OrgUserProfile['customer'] & {
    cluster: boolean | string | number,
    gender: string,
    dob: string
  }
}
