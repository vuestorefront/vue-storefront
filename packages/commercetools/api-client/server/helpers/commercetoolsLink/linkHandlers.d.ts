export declare const handleBeforeAuth: ({ sdkAuth, tokenProvider, apolloReq, currentToken }: {
    sdkAuth: any;
    tokenProvider: any;
    apolloReq: any;
    currentToken: any;
}) => Promise<any>;
export declare const handleAfterAuth: ({ sdkAuth, tokenProvider, apolloReq, currentToken }: {
    sdkAuth: any;
    tokenProvider: any;
    apolloReq: any;
    currentToken: any;
}) => Promise<any>;
export declare const handleRetry: ({ tokenProvider }: {
    tokenProvider: any;
}) => (count: any, operation: any, error: any) => boolean;
