!function(){"use strict";const e=1625763011884,t=`cache${e}`,n=["/client/client.b8b6a864.js","/client/inject_styles.5607aec6.js","/client/worker.5de8b77b.js","/client/index.67e3ffb3.js","/client/Divider.b0ccaf1b.js","/client/recommender.13e34ab8.js","/client/settings.6e988012.js","/client/about.aaa51cfd.js","/client/index.a57d10e7.js","/client/[slug].9963306a.js","/client/info.63da3ff4.js","/client/nouislider.min.5a9b39f4.js"].concat(["/service-worker-index.html","/favicon.png","/global.css","/logo-192.png","/logo-512.png","/longjacket-350px.png","/longjacket.png","/longlongsweater-350px.png","/longlongsweater.png","/longshort-350px.png","/longshort.png","/longsweater-350px.png","/longsweater.png","/manifest.json","/shortlong-350px.png","/shortlong.png","/shortshort-350px.png","/shortshort.png","/shortsweater-350px.png","/shortsweater.png","/trouserslong-350px.png","/trouserslong.png","/trouserslongjacket-350px.png","/trouserslongjacket.png","/trouserslonglong-350px.png","/trouserslonglong.png"]),s=new Set(n);self.addEventListener("install",(e=>{e.waitUntil(caches.open(t).then((e=>e.addAll(n))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const n of e)n!==t&&await caches.delete(n);self.clients.claim()})))})),self.addEventListener("fetch",(t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const n=new URL(t.request.url),o=n.protocol.startsWith("http"),a=n.hostname===self.location.hostname&&n.port!==self.location.port,c=n.host===self.location.host&&s.has(n.pathname),l="only-if-cached"===t.request.cache&&!c;!o||a||l||t.respondWith((async()=>c&&await caches.match(t.request)||async function(t){const n=await caches.open(`offline${e}`);try{const e=await fetch(t);return n.put(t,e.clone()),e}catch(e){const s=await n.match(t);if(s)return s;throw e}}(t.request))())}))}();
