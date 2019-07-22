declare const zE;

export function beforeRegistration({ Vue, config, store, isServer }) {
  if (!isServer) {
    var head = document.getElementsByTagName("head")[0],
      script = document.createElement("script");

    script.src =
      "https://static.zdassets.com/ekr/snippet.js?key=e6e4724a-324b-4839-a578-6c5d07bf3ba5";
    script.id = "ze-snippet";
    script.async = true;
    script.onload = function() {
      var headSetLocale = document.getElementsByTagName("head")[0],
        scriptSetLocale = document.createElement("script");

      const setLocaleSource = `//https://developer.zendesk.com/embeddables/docs/widget/api
    zE(function() {
      zE.setLocale("es");
     })`;

      scriptSetLocale.text = setLocaleSource;
      scriptSetLocale.type = "text/javascript";

      headSetLocale.append(scriptSetLocale);
    };

    head.appendChild(script);
  }
}
