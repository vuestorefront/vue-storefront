import { CustomerSignMeInDraft } from '../../types/GraphQL';
import { SignInResponse } from './../../types/Api';
declare const customerSignMeIn: (context: any, draft: CustomerSignMeInDraft) => Promise<SignInResponse>;
export default customerSignMeIn;
