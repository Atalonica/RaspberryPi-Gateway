// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var dataCacheName = 'LPL-Gateway';
var cacheName = 'LPL-Gateway-1';
var filesToCache = [
  '/',
  '/index.html',
  '/js/dateFormat.js',
  '/js/graphHelper.js',
  '/js/bind.1.0.1.min.js',
  '/js/app.js',
  '/socket.io/socket.io.js',
  '/socket.io/version.info',
  '/css/img/*',
  '/css/svg/*',
  '/images/blank.png',
  '/images/graph.png',
  '/images/icon_default.png',
  '/images/icon_doorbell.png',
  '/images/icon_garage.png',
  '/images/icon_hidden.png',
  '/images/icon_keurig.png',
  '/images/icon_mailbox.png',
  '/images/icon_motion.png',
  '/images/icon_multinode.png',
  '/images/icon_rssi_1.png',
  '/images/icon_rssi_2.png',
  '/images/icon_rssi_3.png',
  '/images/icon_rssi_4.png',
  '/images/icon_rssi_5.png',
  '/images/icon_rssi_6.png',
  '/images/icon_rssi_7.png',
  '/images/icon_sonar.png',
  '/images/icon_sprinklers.png',
  '/images/icon_switchmote.png',
  '/images/icon_watermeter.png',
  '/images/icon_weather.png',
  '/images/icon_weatherstation.png',
  '/images/loading.gif',
  '/images/logo.png',
  '/images/lowbattery.png',
  '/images/lowbattery2.png',
  '/images/lowbattery3.png',
  '/sounds/alert.wav',
  '/sounds/alert2.mp3',
  '/sounds/alert-intruder.wav',
  '/sounds/doorbell.wav',
  '/sounds/incomingmessage.wav',
  '/sounds/letter.wav',
  '/sounds/newMail.wav',
  '/sounds/newMail_cowboy.wav',
  '/sounds/newyahoomail.wav',
  '/sounds/letter.wav',
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  /*
   * Fixes a corner case in which the app wasn't returning the latest data.
   * You can reproduce the corner case by commenting out the line below and
   * then doing the following steps: 1) load app for first time so that the
   * initial New York City data is shown 2) press the refresh button on the
   * app 3) go offline 4) reload the app. You expect to see the newer NYC
   * data, but you actually see the initial data. This happens because the
   * service worker is not yet activated. The code below essentially lets
   * you activate the service worker faster.
   */
  return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
//   console.log('[Service Worker] Fetch', e.request.url);
//   var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
//   if (e.request.url.indexOf(dataUrl) > -1) {
//     /*
//      * When the request URL contains dataUrl, the app is asking for fresh
//      * weather data. In this case, the service worker always goes to the
//      * network and then caches the response. This is called the "Cache then
//      * network" strategy:
//      * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
//      */
//     e.respondWith(
//       caches.open(dataCacheName).then(function (cache) {
//         return fetch(e.request).then(function (response) {
//           cache.put(e.request.url, response.clone());
//           return response;
//         });
//       })
//     );
//   } else {
//     /*
//      * The app is asking for app shell files. In this scenario the app uses the
//      * "Cache, falling back to the network" offline strategy:
//      * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
//      */
//     e.respondWith(
//       caches.match(e.request).then(function (response) {
//         return response || fetch(e.request);
//       })
//     );
//   }
});


