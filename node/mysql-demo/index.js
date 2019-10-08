const mysql =  require('mysql');
const http = require('http');

// 创建mysql链接对象
const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123',
    port: '3306',
    database: 'myblog'
});

// 开始链接
con.connect();

const sql = `select * from users`;

// 执行sql语句
con.query(sql, (err, result) => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(result);
});

con.end();

const server = http.createServer((req, res) => {
    function jsonp () {
        let promise = new Promise()
    }
    res.end('hhh');
});

server.listen(3000,() => {
    console.log('now is listening 3000 port');
});



