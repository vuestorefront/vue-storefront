import EventBus from "@vue-storefront/core/compatibility/plugins/event-bus/index";

declare const zE;

export function beforeRegistration({ Vue, config, store, isServer }) {
  if (!isServer) {
    // Inject Zendesk widget
    var head = document.getElementsByTagName("head")[0],
      script = document.createElement("script");

    script.src =
      "https://static.zdassets.com/ekr/snippet.js?key=e6e4724a-324b-4839-a578-6c5d07bf3ba5";
    script.id = "ze-snippet";
    script.async = true;

    script.onload = function() {
      // Widget language
      const detectedLang = window.location.pathname;

      let widgetLang;

      switch (detectedLang) {
        case "/eu":
          widgetLang = "en-US";
          break;

        case "/us":
          widgetLang = "en-US";
          break;

        case "/uk":
          widgetLang = "en-US";
          break;

        case "/de":
          widgetLang = "de";
          break;

        case "/fr":
          widgetLang = "fr";
          break;

        case "/it":
          widgetLang = "it";
          break;

        default:
          widgetLang = "es";
      }

      zE(() => {
        zE.setLocale(widgetLang);
      });

      // User identify;

      EventBus.$on("user-after-loggedin", ({ firstname, lastname, email }) => {
        zE(() => {
          zE.identify({
            name: firstname + " " + lastname,
            email
          });
        });
      });

      EventBus.$on("user-after-logout", () => {
        zE(() => {
          zE.identify({
            name: " ",
            email: "example@example.com"
          });
        });
      });
    };

    head.appendChild(script);
  }
}
