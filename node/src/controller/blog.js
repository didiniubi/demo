const { doSql } = require('../db/mysql');
const blogList = (author, keyWord) => {
    let sql = `select * from blogs where 1=1 `;
    if(author) {
        sql +=  `and author='${author}' `;
    }
    if(keyWord) {
        sql += `and content like '%${keyWord}%'`
    }
    sql += `order by createtime desc`;
    
    // 数据处理返回
    return doSql(sql);
}

const blogDetail = (id) => {
    let sql = `select * from blogs where 1=1 `;
    if(id) {
        sql += `and id=${id} `;
    }
    sql += `order by createtime desc`;
    // 数据处理返回
    return doSql(sql);
}

const newBlog = (req = {}) => {
    // 新增传入数据格式为对象 { name: 'XXX', content: ''XXX}
    const titleData = req.body.title || '默认title';
    const contentData = req.body.content || '默认content';
    const authorData = req.session.username; // 还未开发登录
    const createtimeData = Date.now();
    let sql = `insert into blogs (title, content, author, createtime) values ('${titleData}',' ${contentData}', '${authorData}', ${createtimeData})`
    return doSql(sql);
    
}

module.exports = {
    blogList,
    blogDetail,
    newBlog
}