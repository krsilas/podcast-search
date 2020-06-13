module.exports = {
    swDest: 'service-worker.js',
    exclude: [/\.(?:png|jpg|jpeg|svg)$/],
    
    runtimeCaching: [{
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        handler: 'CacheFirst',
        options: {
            cacheName: 'images',
            expiration: {
                maxEntries: 50,
            },
        },
    }],
 
}