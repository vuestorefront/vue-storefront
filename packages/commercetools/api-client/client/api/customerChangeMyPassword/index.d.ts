import { ChangeMyPasswordResponse } from '../../types/Api';
declare const customerChangeMyPassword: ({ client }: {
    client: any;
}, version: any, currentPassword: string, newPassword: string) => Promise<ChangeMyPasswordResponse>;
export default customerChangeMyPassword;
