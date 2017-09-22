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

self.addEventListener('message', function (event) {
  if (event.data.command === 'checkout/PROCESS_QUEUE') {
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
                  if (jsonResponse.code === 200) {
                    console.info('Response for: ' + orderId + ' = ' + jsonResponse.result)
                    ordersCollection.removeItem(orderId) 
                  } else 
                    console.error(jsonResponse.result)
                  
               })
        })
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

