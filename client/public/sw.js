//console.warn("service workr from public folder");

let cacheData="appV1";

//this below mean the particular application we working on

//this is for caching the data once the user visits
this.addEventListener("install" , (event)=> {
    event.waitUntil(
        caches.open(cacheData).then((cache)=>{
            cache.addAll([
                "/static/js/bundle.js",
                "/static/js/main/chunk.js",
                "/static/js/0.chunk.js",
                "/index.html",
                "/",
                "/users"
            ])
        })
    )
})

this.addEventListener("fetch", (event)=>{
  console.warn("url : ",event.request.url); // displays all the URLs registered on sw
    if(!navigator.onLine){ //fetch cached data only when offline
        
        //below is for sending notification when offline
   
        // if(event.request.url ==="http://localhost:5005/static/js/bundle.js"){
        //     event.waitUntil(
        //         this.registration.showNotification("No Connectivity",{
        //             body: "You are viewing this app in offline mode",
        //             icon:"https://simg.nicepng.com/png/small/826-8263562_the-react-logo-react-js-logo-svg.png"

        //         })
        //     )
        // }
        
        
        event.respondWith(
            caches.match(event.request).then((result)=>{
                if(result){
                    return result
                }
            
                let requestUrl=event.request.clone();
                return fetch(requestUrl);
            })
        )
    }
   
})