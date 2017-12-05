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


// TODO: refactor the order queue process above to the same data sync. format as tasks sync bellow
  if (event.data.command === 'sync/PROCESS_QUEUE') {
    console.log('Executing task queue')
    console.debug(event.data)
      // event.data.config - configuration, endpoints etc

      const syncTaskCollection = localForage.createInstance({
        name: 'shop',
        storeName: 'syncTasks'
      });

      const usersCollection = localForage.createInstance({
        name: 'shop',
        storeName: 'user'
      });

      usersCollection.getItem('current-token', function (err, currentToken) { // TODO: if current token is null we should postpone the queue and force re-login - only if the task requires LOGIN!
          
        if (err) {
          console.error(err)
        }

        const fetchQueue = new Array()
        console.log('Current token = ' + currentToken)
        syncTaskCollection.iterate(function(task, id, iterationNumber) {
          
          if(!task.transmited) { // not sent to the server yet
            fetchQueue.push(() =>  {
                const config = event.data.config;
                const taskData = task;
                const taskId = id

                console.log('Pushing out offline task ' + taskId)
                return fetch(task.url.replace('{{token}}', currentToken), task.payload).then(function(response) {

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
                      if (jsonResponse) {
                        console.info('Response for: ' + taskId + ' = ' + jsonResponse.result)
                        
                        taskData.transmited = true
                        taskData.transmited_at = new Date()
                        taskData.result = jsonResponse.result
                        taskData.resultCode = jsonResponse.code
                        taskData.acknowledged = false
                        syncTaskCollection.setItem(taskId.toString(), taskData) 

                      } else 
                        console.error(jsonResponse.result)
                      
                  })
            })
          }
        }).then(function() {
          console.log('Iteration has completed');

          // execute them serially
          serial(fetchQueue)
            .then((res) => console.info('Processing sync tasks queue has finished'))
      
        }).catch(function(err) {
          // This code runs if there were any errors
          console.log(err);
        });
      })
  }  
})

