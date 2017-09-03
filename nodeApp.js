/**
 * Created by 夜雪霜蓝 on 2017/9/3.
 */
var http=require('http');
var querystring=require('querystring');
var server = http.createServer(function (req,res) {
        req.on('data',function (data) {
            var stringData=decodeURIComponent(data)
           console.log(querystring.parse(stringData));
        })
})
server.listen(8088);
server.on('connectiong',function (socket) {
    console.log('客户端已连接');
})
server.on('listening',function () {
    console.log('正在监听端口8088')
})