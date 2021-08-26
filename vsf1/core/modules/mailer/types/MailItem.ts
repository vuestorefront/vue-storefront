export default interface MailItem {
  sourceAddress: string,
  targetAddress: string,
  subject: string,
  emailText: string,
  confirmation?: boolean
}
