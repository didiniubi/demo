const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, 'data.txt'); 

// 读取文件
fs.readFile(file, (err, result) => {
    if(err) {
        console.log(err);
        return
    }
    console.log(result.toString()) // 返回的是二进制类型， 需要转换为字符串
});

const content =  '追加内容\n';
const opt = {
    flag: 'a' // 追加写入 覆盖为w
}

fs.writeFile(file, content, opt, (err) => {
    if(err) {console.log(err)}
})