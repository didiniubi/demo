const { doSql } = require('../db/mysql');
const login = (loginData) => {
    // 默认给了个管理员权限
    console.dir('login');
    const username = loginData.username;
    const password = loginData.password;
    let sql = `select * from users where 1=1 `
    if(!username || !password) {
        return Promise.resolve([]);
    }
    sql += `and username='${username}' and password=${password}`
    return doSql(sql)
}

module.exports = {
    login
}