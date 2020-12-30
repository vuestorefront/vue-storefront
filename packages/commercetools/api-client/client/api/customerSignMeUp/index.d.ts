import { CustomerSignMeUpDraft } from '../../types/GraphQL';
import { SignInResponse } from '../../types/Api';
declare const customerSignMeUp: (context: any, draft: CustomerSignMeUpDraft) => Promise<SignInResponse>;
export default customerSignMeUp;
