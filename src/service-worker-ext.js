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


self.addEventListener('message', function (event) {
  if (event.data.command === 'checkout/PROCESS_QUEUE') {
    console.log('Sending out orders queue to server ...')
    console.debug(event.data)
      // event.data.config - configuration, endpoints etc
      // event.data.queue - queue object
      
      if (event.data.queue !== null) {
        
        // next convert each item to a function that returns a promise
        const funcs = event.data.queue.map(order => () => {
            // send order using fetch() api - order local variable
            console.log(order)
        })
        
        // execute them serially
        serial(funcs)
            .then(console.log.bind(console))
 
      }


  }
})

