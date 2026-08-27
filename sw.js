/* =====================================================
   মাকলাহাট দারুল কুরআন ইসলামিয়া মাদ্রাসা
   SERVICE WORKER
===================================================== */

const CACHE_NAME = "madrasa-website-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./admin.html",
    "./style.css",
    "./script.js",
    "./admin.js",
    "./data.js",
    "./config.js",
    "./manifest.json",
    "./logo.png"
];


/* ==============================
   INSTALL
============================== */

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(CACHE_NAME)
                .then(cache => {

                    return cache.addAll(
                        FILES_TO_CACHE
                    );

                })

        );

        self.skipWaiting();

    }
);


/* ==============================
   ACTIVATE
============================== */

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches.keys()
                .then(names => {

                    return Promise.all(

                        names
                            .filter(
                                name =>
                                    name !== CACHE_NAME
                            )
                            .map(
                                name =>
                                    caches.delete(name)
                            )

                    );

                })

        );

        self.clients.claim();

    }
);


/* ==============================
   FETCH
============================== */

self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches.match(event.request)
                .then(cachedResponse => {

                    if (cachedResponse) {

                        return cachedResponse;

                    }

                    return fetch(event.request);

                })
                .catch(() => {

                    return caches.match(
                        "./index.html"
                    );

                })

        );

    }
);