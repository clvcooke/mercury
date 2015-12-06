console.log('GCM Worker Started', self);
self.addEventListener('install', function (event) {
    //used to replace old service workers immediately
    self.skipWaiting();
    console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
    console.log('Activated', event);
});
self.addEventListener('push', function (event) {
   var title = 'Push Title';
    event.waitUntil(
        self.registration.showNotification(title, {
            body: 'The Message',
            icon: 'images/icon.png'
        }));
    console.log('Push message received', event);
});