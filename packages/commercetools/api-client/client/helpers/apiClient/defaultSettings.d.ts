export declare const defaultSettings: {
    locale: string;
    acceptLanguage: string[];
    auth: {
        onTokenChange: () => void;
        onTokenRead: () => string;
        onTokenRemove: () => void;
    };
    cookies: {
        currencyCookieName: string;
        countryCookieName: string;
        localeCookieName: string;
    };
};
