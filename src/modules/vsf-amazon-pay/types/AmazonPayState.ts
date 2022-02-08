// This object should represent structure of your modules Vuex state
// It's a good practice is to name this interface accordingly to the KET (for example mailchimpState)
export interface AmazonPayState {
  amazonPaymentsReady: boolean,
  orderReferenceId: string | null,
  orderState: string | null,
  // userId: string | null,
  userToken: {
    token: string,
    expire_at: number
  } | null
}