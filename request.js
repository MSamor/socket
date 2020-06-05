const http = require('http');
const cors = require('cors');
const express = require('express');
const querystring = require('querystring');
const app = express();
const {
    URL
} = require('url');

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors()); 

//发送服务器请求
app.post('/', (appReq, appRes) => {
    console.log(querystring.stringify(appReq.body))
    // 向隧道代理发出请求。
    const options = {
        port: 1337,
        host: 'www.maosi.vip',
        method: 'CONNECT',
        path: 'www.maosi.vip:8080/get?'+querystring.stringify(appReq.body),
    };

    const req = http.request(options);
    req.end();


    var html = '';
    req.on('connect', (res, socket, head) => {
        console.log('已建立连接');
        // 通过 HTTP 隧道发出请求。
        socket.on('data', (chunk) => {
            html += chunk;
        });
        socket.on('end', function () {
            html = html.toString();
            appRes.end(html);
            console.log('数据传输完成');
        });
    });
})



app.listen(3000, () => {
    console.log('listening on port 3000!');
})