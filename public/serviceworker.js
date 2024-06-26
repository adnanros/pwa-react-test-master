const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html' , 'offline.html'];

const self= this;

//install sw
self.addEventListener('install', (event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then ((cache)=>{
            console.log('opened cache');

            return cache.addAll(urlsToCache);
        })
    )
})

//Listen to request
self.addEventListener('fetch', (event)=>{
    console.log('off');

    event.respondWith(
        caches.match(event.request)
        .then(()=>{

            return fetch(event.request)
                   .catch((err)=>{
                    console.log(err); caches.match('offline.html')
                    })
        })
    )
})

//activate sw
self.addEventListener('activate', (event)=>{
    const cacheWhiteList =[];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames)=>Promise.all(
            cacheNames.map((cacheName)=>{
                if(!cacheWhiteList.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
})