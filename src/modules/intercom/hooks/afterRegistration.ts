import { Logger } from '@vue-storefront/core/lib/logger'

// This function will be fired both on server and client side context after registering other parts of the module
declare global {
  interface Window { Intercom: any; }
}

export function afterRegistration({ Vue, config, store, isServer }): any {

  if( !config.intercom || !config.intercom.app_id ) {

    Logger.warn('No intercom config or intercom app_id found.', 'Intercom')();
    return;

  }

  var intercomAppId = config.intercom.app_id;

  this.onIntercomLoaded = (): void => {

    setTimeout(() => {

      window.Intercom = window.Intercom || {};

      // Boot Intercom with your app config.
      window.Intercom("boot", {
        app_id: intercomAppId
      });

    }, 1);

  }

  if (!isServer) {

    var head = document.head;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${intercomAppId}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()`

    script.onload = this.onIntercomLoaded();

    head.appendChild(script);

  }

}
