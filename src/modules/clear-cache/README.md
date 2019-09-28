# Post-release cache cleanup module

## Using

There are 2 ways to clear the cache after release:
1. Websocket - after the release you should connect to the web socket specified in the `server.js` file and send the message defined in the configs. This is for users who at the time of release are on the site.
2. Versioning - define the ENV that contain current version of the site and update it after each release. This is for users who will come on the site after release.