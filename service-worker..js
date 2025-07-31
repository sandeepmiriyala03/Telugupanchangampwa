const CACHE_NAME = 'telugu-panchangam-v1';
const urlsToCache = [
    '/', // రూట్ పాత్
    '/panchangam.html' // ప్రధాన HTML ఫైల్
];

// సర్వీస్ వర్కర్ ఇన్‌స్టాల్ అయినప్పుడు, అవసరమైన ఫైల్‌లను కాష్ చేయండి.
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching assets');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Service Worker: Caching failed', error);
            })
    );
});

// నెట్‌వర్క్ రిక్వెస్ట్‌లను అడ్డుకుని, కాష్ నుండి లేదా నెట్‌వర్క్ నుండి రెస్పాన్స్‌లను అందించండి.
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // కాష్‌లో ఉంటే, కాష్ నుండి రెస్పాన్స్ తిరిగి ఇవ్వండి
                if (response) {
                    return response;
                }
                // లేకపోతే, నెట్‌వర్క్ నుండి ఫెచ్ చేయండి
                return fetch(event.request)
                    .catch(() => {
                        // నెట్‌వర్క్ విఫలమైతే మరియు అది నావిగేషన్ రిక్వెస్ట్ అయితే, ఆఫ్‌లైన్ సందేశాన్ని చూపండి.
                        if (event.request.mode === 'navigate') {
                            return new Response("<h1>మీరు ఆఫ్‌లైన్‌లో ఉన్నారు!</h1><p>దయచేసి మీ ఇంటర్నెట్ కనెక్షన్‌ని తనిఖీ చేయండి.</p>", {
                                headers: { 'Content-Type': 'text/html' }
                            });
                        }
                    });
            })
    );
});

// కొత్త సర్వీస్ వర్కర్ యాక్టివేట్ అయినప్పుడు పాత కాష్‌లను తొలగించండి.
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
