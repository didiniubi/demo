const queryString = require('querystring');
const blogRouter = require('./src/router/blog');
const userRouter = require('./src/router/user');

let SESSIN_DATA = {};

// 用于处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST') {
            resolve({});
            return;
        }
        if(req.headers['content-type'] != 'application/json') { // 传入数据格式不是json时
            resolve({});
            return;
        }

        let postData = '';

        // nodejs中的http模块基于流的方式接受和处理数据
        // 当客户端向服务端传递数据时 数据过大就会一点点的传输
        req.on('data', (chunk) => {
            console.dir('chunk');
            postData += chunk.toString();
        });
        req.on('end', () => {
            console.dir('end');
            if(!postData) {
                resolve({});
                return
            }
            resolve(JSON.parse(postData));
        })
    }) 
    return promise;
}


const serverHandle = (req, res) => {
    res.setHeader('content-type', 'application/json'); // 返回json格式

    // 解析path
    const path = req.url.split('?')[0] // 路由
    req.path = path;

    // 解析query
    req.query = queryString.parse(req.url.split('?')[1]);

    let cookieData = {};
    // 解析cookie 浏览器存储cookie格式为 key=value;key2=value2;
    const cookie = req.headers.cookie || '' ; // js写入cookie document.cookie = "dd=fff"
    
    if(cookie) {
        cookie.split(';').forEach(element => {
            console.log(element, 'element');
            const item = element.split('=');
            // element 为 key=value
            cookieData[item[0].trim()] = item[1].trim()
        });
    }

    req.cookie = cookieData;

    // 解析session
    // 从cookie中获取userid对应到session上
    let userId = req.cookie.userid;
    let needSetSession = false;
    console.log(userId, 'userId')
    if(userId) {
        if(!SESSIN_DATA[userId]) {
            SESSIN_DATA[userId] = {};
        }
    }else {
        needSetSession = true;
        userId = `${new Date()}_${Math.random()}`
        SESSIN_DATA[userId] = {};
    }
    req.session = SESSIN_DATA[userId]
    console.log(req.session, 'session');
    getPostData(req).then((postdata) => {
        req.body = postdata;
        
         // 解析路由
        const blogData = blogRouter(req, res);
        const loginData = userRouter(req, res);

        console.log('router', loginData)

        if(blogData) {
            blogData.then((data) => {
                if(needSetSession) {
                     // httpOnly 只允许后端修改cookie(加了httpOnly  客户端不能操作 打印document.cookie = '') 前端不能修改 path=/ 根路径都能获取cookie
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly`);
                }
                res.end (
                    JSON.stringify(data)
                )
            });
            return;
        }
        
        if(loginData) {
            console.log('login-data', loginData)
            loginData.then((data) => {
                if(needSetSession) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly`);
                }
                res.end (
                    JSON.stringify(data)
                )
            })
            return;
        }
        
        // if(blogData) {
        //     res.end (
        //         JSON.stringify(blogData)
        //     )
        //     return;
        // }
            
        res.end('404 not found');
    })
    

};

module.exports = serverHandle;