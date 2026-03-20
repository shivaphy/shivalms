// Service worker - network first, no aggressive caching
const CACHE='spl-v8';
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var url=new URL(e.request.url);
  // Never cache API calls
  if(url.hostname.indexOf('googleapis')>-1||url.hostname.indexOf('cdnjs')>-1||url.hostname.indexOf('fonts')>-1)return;
  // For the app itself - network first, cache fallback
  e.respondWith(fetch(e.request).catch(function(){return caches.match(e.request);}));
});
