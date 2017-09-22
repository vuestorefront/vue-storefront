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
      ordersCollection.iterate(function(value, key, iterationNumber) {
        
        // Resulting key/value pair -- this callback
        // will be executed for every item in the
        // database.
        console.log([key, value]);
        fetchQueue.push(order => () => {
            // send order using fetch() api - order local variable
            console.log(order)

            fetch(config.orders.endpoint,
              {
                method: "POST",
                body: data
              }).then(function(res){ return res.json(); })
                .then(function(data){ console.log(res) })
            // ordersCollection.removeItem(key) when success!
        })
      }).then(function() {
        console.log('Iteration has completed');
      }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
      });

      // execute them serially
      serial(fetchQueue)
          .then(console.log.bind(console))
  }
})

