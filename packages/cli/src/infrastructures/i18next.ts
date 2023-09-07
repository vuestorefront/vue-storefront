import path from "path";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import getLocale from "os-locale";

export const setupI18Next = async (): Promise<void> => {
  await i18next.use(Backend).init({
    backend: {
      loadPath: path.resolve(__dirname, "../../locales/{{lng}}/{{ns}}.json"),
    },
    fallbackLng: "en-US",
    interpolation: {
      // Escaping is only required to prevent XSS attacks in the front-end
      escapeValue: false,
    },
    lng: await getLocale(),
  });
};
