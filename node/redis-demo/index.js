const redis = require('redis');

const client = redis.createClient(6379, '127.0.0.1');

client.on('error', (err) => {
    console.log(err);
});

client.set('usernama', 'didi', redis.print);
client.get('username', (err, result)  => { // 是个异步操作
    if(err) {
        console.log(err);
        return;
    } 
    console.log(result); // didi

    client.quit(); // 退出
});






