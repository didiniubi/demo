const { blogList, newBlog, blogDetail  } = require('../controller/blog');
const { successRes, errorRes } = require('../modal/resModal');

const loginCheck = (req) => {
    if(!req.session.username) {
        return Promises.resolve(
            new errorRes('尚未登录')
        )
    }
     
}
const blogRouter = (req, res) => {
    const method = req.method;
    // 获取列表
    if(method === 'GET' && req.path === '/api/blog/list/') {
        const author = req.query.author || '';
        const keyWord = req.query.keyWord || '';
        return blogList(author, keyWord).then((blogListData) => {
            return new successRes(blogListData);
        })
       
    }

    // 获取详情
    if(method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id || '';
        return blogDetail(id).then((blogListData) => {
            return new successRes(blogListData);
        })
    }

    // 新增日志
    if(method === 'POST' && req.path === '/api/blog/add/') {
        const loginResult = loginCheck(req);
        if(loginResult) {
            // 未登录
            return loginCheck
        }
        return newBlog(req).then((newBlogData) => {
            console.log(newBlogData, 'newBlogData');
            return new successRes(newBlogData);
        });
        
    }
    
}
module.exports = blogRouter;