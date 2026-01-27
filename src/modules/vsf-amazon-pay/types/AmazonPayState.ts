export interface AmazonPayState {
  sessionId: string | null,
  scriptLoadingPromise: Promise<void> | null
}
