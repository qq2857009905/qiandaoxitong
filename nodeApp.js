/**
 * Created by 夜雪霜蓝 on 2017/9/3.
 */
var http=require('http');
var querystring=require('querystring');
var server = http.createServer(function (req,res) {
    if(req.url!='favicon.ico'){
        var registerData='';
        req.on('data',function (data) {
            if (req.url == "/register" && req.method == 'POST') {
                registerData += data;
            }
        })

            req.on('end',function () {
                if(req.url=="/register"&&req.method=='POST'){
                    registerData=querystring.parse(decodeURI(registerData));
                    console.log(registerData);

                    var errorMessage='';
                    var message="";
                    var i=0;
                    //管理员注册码验证
                    if(registerData.type=='管理员'){
                        if(registerData.adminNum!=541402695)
                        {
                            i=i+1;
                            errorMessage=errorMessage+'错误 '+i+':您输入的管理员码没有权限注册管理员'+'<br>';
                            message=message+'错误 '+i+':您输入的管理员码没有权限注册管理员'+'\n';
                        }
                    }

                    //账号验证
                  if(registerData.account.toString().length<6||registerData.password.toString().length>16){
                      i=i+1;
                      errorMessage=errorMessage+'错误 '+i+':账号长度应为6到16个字符'+'<br>';
                      message=message+'错误 '+i+':账号长度应为6到16个字符'+'\n';
                  }

                    //密码验证
                  if(registerData.password.toString().length<6||registerData.password.toString().length>16){
                    i=i+1;
                    errorMessage=errorMessage+'错误 '+i+':密码长度应为6到16个字符'+'<br>';
                    message=message+'错误 '+i+':密码长度应为6到16个字符'+'\n';
                  }

                  //重输密码验证
                   if(registerData.repassword!=registerData.password){
                      i=i+1;
                      errorMessage=errorMessage+'错误 '+i+':两次输入的密码不一致'+'<br>';
                      message=message+'错误 '+i+':两次输入的密码不一致'+'\n';
                   }

                    //学号验证
                    if(registerData.number.toString().length!=11){
                        i=i+1;
                        errorMessage=errorMessage+'错误 '+i+':请输入11位数字的学号/工号'+'<br>';
                        message=message+'错误 '+i+':请输入11位数字的学号/工号'+'\n';
                    }

                    //姓名验证
                    if(registerData.name==''){
                        i=i+1;
                        errorMessage=errorMessage+'错误 '+i+':姓名不能为空'+'<br>';
                        message=message+'错误 '+i+':姓名不能为空'+'\n';
                    }

                    //专业名验证
                    if(registerData.major==''){
                        i=i+1;
                        errorMessage=errorMessage+'错误 '+i+':专业名不能为空'+'<br>';
                        message=message+'错误 '+i+':专业名不能为空'+'\n';
                    }

                    //班级验证
                    if(registerData.class==''){
                        i=i+1;
                        errorMessage=errorMessage+'错误 '+i+':班级不能为空'+'<br>';
                        message=message+'错误 '+i+':班级不能为空'+'\n';
                    }
                    //错误信息结尾补充
                    if(errorMessage!=''){
                        message=message+'一位用户因为以上原因注册失败';
                        errorMessage=errorMessage+'注册失败，请更正以上错误再提交。';
                    }

                    //注册成功
                    if(errorMessage==''){
                        errorMessage='注册成功';
                        message='一位用户注册成功';
                    }
                    console.log(message);

                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.write(errorMessage);
                    res.end();

                }
        })
    }
})
server.listen(8088);
server.on('connectiong',function (socket) {
    console.log('客户端已连接');
})

server.on('listening',function () {
    console.log('正在监听端口8088')
})