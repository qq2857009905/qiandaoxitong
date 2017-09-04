/**
 * Created by 夜雪霜蓝 on 2017/9/3.
 */
var http=require('http');
var querystring=require('querystring');
var server = http.createServer(function (req,res) {
     if(req.url!='favicon.ico') {
         var registerData='';
         req.on('data',function (data) {
                 if(req.url=='/register'&&req.method=='POST'){
                 registerData+=data;
             }
         })

         req.on('end',function () {
             if(req.url=='/register'&&req.method=='POST'){


                 console.log(decodeURI(registerData));
             }
         })

     }
})
server.listen(8088);

server.on('listening',function () {
    console.log('正在监听端口8088')
})