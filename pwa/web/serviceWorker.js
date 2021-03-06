// 定义缓存存储名
var cacheStorageName = 'pwaDemo';

// 定义缓存文件列表
var cacheList = [
    '/',
    '/index.html',
    '/detail.html',
    '/css/main.css',
    '/images/icon.png',
    '/js/axios.min.js',
    '/js/main.js'
];

// 安装，抓取资源进行缓存
self.addEventListener('install', function (e) {
    e.waitUntil( // 等待Promise完成后安装
        caches.open(cacheStorageName).then(function (cache) {
            return cache.addAll(cacheList) // 根据文件列表缓存资源
        }).then(function () {
            return self.skipWaiting() // 立即激活，在页面被旧sw控制时候，可不用刷新页面直接激活新的sw
        })
    )
});

// 拦截请求, 查询缓存或者网络, 返回请求的资源
self.addEventListener('fetch', function (e) {
    if (e.request.credentials === 'same-origin') { // 如果为接口请求，直接发起请求
        return fetch(e.request).then(function (response) {
            return response
        }).catch(function (err) {
            console.log('Fetch错误:' + err);
        });
    } else {
        e.respondWith( // 等待Promise完成后响应
            caches.match(e.request, { ignoreSearch: true }).then(function (response) { // match 在缓存中匹配请求；ignoreSearch:true 忽视请求带的参数
                if (response) { // 如果获取到资源，返回资源
                    return response
                };
                var requestToCache = e.request.clone();
                return fetch(requestToCache).then(function (response) { // 如果未获取到资源，重新发起网络请求
                    if (response && requestToCache.url.indexOf('http') === 0) { // 有返回结果，存储返回的结果
                        var responseToCache = response.clone();
                        caches.open(cacheStorageName).then(function (cache) { // 将从网络获取的静态资源缓存
                            cache.put(requestToCache, responseToCache) // 根据文件列表缓存资源
                        });
                    }
                    return response
                }).catch(function (err) {
                    console.log('Fetch错误:' + err);
                });
            })
        )
    }
});

// 激活，更新缓存的资源
self.addEventListener('activate', function (e) {
    e.waitUntil( // 等待Promise完成后激活
        caches.keys().then(function (cacheNames) { // 获取缓存名
            return Promise.all(
                cacheNames.map(function (cacheName) { // 遍历
                    if (cacheName !== cacheStorageName) {
                        return caches.delete(cacheName) // 删除和更新后的缓存名不一致的缓存
                    }
                })
            )
        }).then(function () {
            return self.clients.claim // 使新sw获取页面控制权
        })
    )
});