const http = require('http');
const request = require('request');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());

// 创建 HTTP 隧道代理。
const proxy = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('响应内容');
});

proxy.on('connect', (req, res, head) => {
    console.log(req.url)
    // 连接到原始服务器。
    const srvSocket =request('http://'+req.url)
        res.write('HTTP/1.1 200 Connection Established\r\n' +
            'Proxy-agent: Node.js-Proxy\r\n' +
            '\r\n');

        srvSocket.pipe(res);

});
// 代理正在运行。用1337模拟80端口
proxy.listen(1337, '127.0.0.1')

