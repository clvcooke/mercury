if ('serviceWorker' in navigator) {
    console.log('Service worker is supported');
    navigator.serviceWorker.register('js/serviceWorkers/gcmWorker.js').then(function (reg) {
        reg.pushManager.subscribe({
            userVisibleOnly:true
        }).then(function(sub){
            console.log('endpoint', sub.endpoint);
        });
    }).catch(function (error) {
        console.log('ERROR: ', error);
    });
}