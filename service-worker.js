!function(){"use strict";const e=1626274877285,t=`cache${e}`,n=["/client/client.e5cc9c4d.js","/client/inject_styles.5607aec6.js","/client/worker.6492aab9.js","/client/index.8e16c8b6.js","/client/ThermalSensationInputSlider.784d1bf8.js","/client/recommender.792fda05.js","/client/settings.c80e80c0.js","/client/about.b9127d83.js","/client/info.f2a9ee6e.js","/client/nouislider.min.5a9b39f4.js"].concat(["/service-worker-index.html","/favicon.png","/global.css","/logo-192.png","/logo-512.png","/longjacket-350px.png","/longjacket.png","/longlongsweater-350px.png","/longlongsweater.png","/longshort-350px.png","/longshort.png","/longsweater-350px.png","/longsweater.png","/manifest.json","/shortlong-350px.png","/shortlong.png","/shortshort-350px.png","/shortshort.png","/shortsweater-350px.png","/shortsweater.png","/trouserslong-350px.png","/trouserslong.png","/trouserslongjacket-350px.png","/trouserslongjacket.png","/trouserslonglong-350px.png","/trouserslonglong.png"]),s=new Set(n);self.addEventListener("install",(e=>{e.waitUntil(caches.open(t).then((e=>e.addAll(n))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const n of e)n!==t&&await caches.delete(n);self.clients.claim()})))})),self.addEventListener("fetch",(t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const n=new URL(t.request.url),o=n.protocol.startsWith("http"),c=n.hostname===self.location.hostname&&n.port!==self.location.port,a=n.host===self.location.host&&s.has(n.pathname),l="only-if-cached"===t.request.cache&&!a;!o||c||l||t.respondWith((async()=>a&&await caches.match(t.request)||async function(t){const n=await caches.open(`offline${e}`);try{const e=await fetch(t);return n.put(t,e.clone()),e}catch(e){const s=await n.match(t);if(s)return s;throw e}}(t.request))())}))}();
