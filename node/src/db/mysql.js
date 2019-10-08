const mysql = require('mysql');
const { mysqlConf } = require('../config/db');

// 创建连接对象
const con = mysql.createConnection(mysqlConf);

// 执行链接
con.connect();

// 统一执行sql语句函数
function doSql(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    })
    return promise;
}

module.exports = {
    doSql
}