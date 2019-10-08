const env = process.env.NODE_ENV; // 环境参数

let mysqlConf;
let redisConf;

if(env === 'dev') {
    mysqlConf = {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '123',
        database: 'myblog'
    }
    redisConf = {
        host:'127.0.0.1',
        port: 6379
    }
}

if(env === 'production') {
}

module.exports = {
    mysqlConf,
    redisConf
};