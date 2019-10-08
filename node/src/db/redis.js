const redis = require('redis');
const { redisConf } = require('../config/db');

const client = redis.createClient(redisConf.port, redisConf.host);

client.on('error', (err)=> {
    console.log(err);
})

function set(key, val) {
    if( typeof val === 'object') {
        val = JSON.stringify(val)
    }
    client.set(key, val, redis.print);
}

function get(key) {
    const promise = (resolve, reject) => {
        client.get(key, (err, result) => {
            if(err) {
                reject(err);
                return;
            }
            if(resolve == null) {
                resolve(null);
            }
            try {
                resolve(JSON.parse(val))
            } catch (err) {
                resolve(val)
            }
        })
    }
    return promise;
}