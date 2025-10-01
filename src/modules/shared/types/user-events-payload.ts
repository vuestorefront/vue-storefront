export interface CustomerDataChangedEventPayload {
  customerId: string,
  customerEmail: string,
  customerEmailHashed: string,
  customerFirstName: string,
  customerLastName: string,
  customerFullName: string,
  customerPhoneNumber: string,
  customerCity: string,
  customerState: string,
  customerZipCode: string,
  customerCountry: string
}
