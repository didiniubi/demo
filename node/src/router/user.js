const { successRes, errorRes } = require('../modal/resModal');
const { login } = require('../controller/user');
const { set } = require('../db/redis')

const userRouter = (req, res) => {
    console.log('router', req.url)
    const method = req.method;
    if(method === 'POST' && req.path === '/api/login/') {
        const result = login(req.body);
        return result.then((data) => {
            console.log(data, 'data', res[0]);
            if(!data[0]) {
                return new errorRes('登录失败')
            }
            req.session.username = data[0].username;
            req.session.password = data[0].password;
           
            return new successRes('登录成功');
        })
    }
    if(method === 'GET' && req.path === '/api/login-test') {
        const result = login(req.query);
        return result.then((data) => {
            console.log(data, 'data', res[0]);
            if(!data[0]) {
                return new errorRes('登录失败')
            }
            req.session.username = data[0].username;
            req.session.password = data[0].password;
            set(data[0].username, data[0].password); // 同步到redis
            return new successRes('登录成功');
        })
    }
}

module.exports = userRouter;
