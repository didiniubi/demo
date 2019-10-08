const http = require('http');
const serverHandle = require('../app.js');

const port = 8000;

const server = http.createServer(serverHandle);

server.listen(port, () => {
    console.log('Now is listening 3000 port' );
})