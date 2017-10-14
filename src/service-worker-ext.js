'use strict'

/*
Add your own Service worker code here - for example using sw-toolbox library:

toolbox.router.get("/", toolbox.cacheFirst, {});
toolbox.router.get("/catalog", toolbox.fastest, {});
*/

/*
 * serial executes Promises sequentially.
 * @param {funcs} An array of funcs that return promises.
 * @example
 * const urls = ['/url1', '/url2', '/url3']
 * serial(urls.map(url => () => $.ajax(url)))
 *     .then(console.log.bind(console))
 */
const serial = funcs =>
funcs.reduce((promise, func) =>
    promise.then(result => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]))

import * as localForage from 'localforage'

const OFFLINE_CACHE = 'cache'
// listen for outgoing network request
self.addEventListener('fetch', (event) => {
  // try to find response object in the cache
  // associated with current request
  event.respondWith(caches.match(event.request)
    .then((cachedResponse) => {
      // if there's cached response, give it back
      if (cachedResponse) {

        return cachedResponse;
      }
      // if no, try to fetch it from the network
      return fetch(event.request.clone())
        .then((networkResponse) => {
          // if response is “bad”,
          // just pass it back into the app
          if (!networkResponse || networkResponse.status !== 200) {

            return networkResponse;
          }

          // if response is ok, cache it and
          // give it back into the app
          caches.open(OFFLINE_CACHE)
            .then((cache) => cache.put(
              event.request, networkResponse.clone()));

          return networkResponse;
        });
    }));
});

self.addEventListener('message', function (event) {
  if (event.data.command === 'order/PROCESS_QUEUE') {
    console.log('Sending out orders queue to server ...')
    console.debug(event.data)
      // event.data.config - configuration, endpoints etc

      const ordersCollection = localForage.createInstance({
        name: 'shop',
        storeName: 'orders'
      });


      const fetchQueue = new Array()
      ordersCollection.iterate(function(order, id, iterationNumber) {
        
        // Resulting key/value pair -- this callback
        // will be executed for every item in the
        // database.

        if(!order.transmited) { // not sent to the server yet
          fetchQueue.push(() =>  {
              const config = event.data.config;
              const orderData = order;
              const orderId = id

              console.log('Pushing out order ' + orderId)
              return fetch(config.orders.endpoint,
                {
                  method: "POST",
                  headers: {  "Content-Type": "application/json"  },
                  body: JSON.stringify(orderData)
                }).then(function(response) {

                  if (response.status === 200) {
                    const contentType = response.headers.get("content-type");
                    if(contentType && contentType.includes("application/json")) {
                      return response.json();
                    } else
                      console.error('Error with response - bad content-type!')
                  } else {
                      console.error('Bad response status: ' + response.status)
                  }
                })
                .then(function (jsonResponse) {
                    if (jsonResponse && jsonResponse.code === 200) {
                      console.info('Response for: ' + orderId + ' = ' + jsonResponse.result)
                      
                      orderData.transmited = true
                      orderData.transmited_at = new Date()
                      ordersCollection.setItem(orderId.toString(), orderData) 
                    } else 
                      console.error(jsonResponse.result)
                    
                })
          })
        }
      }).then(function() {
        console.log('Iteration has completed');

        // execute them serially
        serial(fetchQueue)
          .then((res) => console.info('Processing orders queue has finished'))
    
      }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
      });

  }
})

