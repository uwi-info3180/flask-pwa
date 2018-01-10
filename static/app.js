// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('./static/service-worker.js')
    .then(function() {
        console.log('Service Worker Registered');
    });
}