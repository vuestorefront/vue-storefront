
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js')

workbox.setConfig({debug: true})

workbox.core.skipWaiting()
workbox.core.clientsClaim()

workbox.precaching.precacheAndRoute([])
