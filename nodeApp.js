/**
 * Created by 夜雪霜蓝 on 2017/9/3.
 */
var http=require('http');
var querystring=require('querystring');
var mysql=require('mysql');
var server = http.createServer(function (req,res) {
    if(req.url!='favicon.ico'){

        //表单验证
        var registerData='';//注册信息
        var loginData='';//登陆信息
        req.on('data',function (data) {
            //注册表单
            if (req.url == "/register" && req.method == 'POST') {
                registerData += data;
            }

            //登陆表单
            if(req.url=='/login'&&req.method=='POST'){
                loginData+=data;
            }

        })

        req.on('end',function () {

            //登陆表单验证
            if(req.url=='/login'&&req.method=='POST'){
                loginData=querystring.parse(decodeURI(loginData));

                var errorMessage='';
                var i=0;

                console.log(loginData);
                if(loginData.account==null){
                    i=i+1;
                    errorMessage=errorMessage+'错误 '+i+':账号不能为空'+'<br>';
                }

                if(loginData.password==null){
                    i=i+1;
                    errorMessage=errorMessage+'错误 '+i+':密码不能为空'+'<br>';
                }


                if(loginData.account!=''&&loginData.password!=''){
                    var connection=mysql.createConnection({
                        database:'qiandaoSystem',
                        user:'root',
                        password:'541402695'
                    });

                    connection.connect(function (err) {
                        if(err){
                            i=i+1;
                            errorMessage=errorMessage+'错误 '+i+':数据库连接失败'+'<br>';
                        }

                        else {
                            connection.query('SELECT * FROM person WHERE account=?',[loginData.account],function (err,result) {
                                if(err){
                                    i=i+1;
                                    errorMessage=errorMessage+'错误 '+i+':数据库查询失败'+'<br>';
                                }

                                else {
                                    //验证用户是否存在
                                   console.log(loginData.account);
                                    console.log(result);
                                    if(result[0]==null){
                                        i=i+1;
                                        errorMessage=errorMessage+'错误 '+i+':用户名不存在'+'<br>';
                                    }
                                    //验证密码是否正确
                                    else {
                                        if(result.password!=loginData.password){
                                            i=i+1;
                                            errorMessage=errorMessage+'错误 '+i+':密码错误'+'<br>';
                                        }
                                        if(result.password==loginData.password){
                                            errorMessage='YES';
                                        }
                                    }

                                    console.log('错误信息为：'+errorMessage);
                                    res.setHeader("Access-Control-Allow-Origin", "*");
                                    res.write(errorMessage);
                                    res.end();

                                }
                            })
                        }
                    });
                }

            }
            //注册表单验证
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

                        //响应客户端
                        console.log(message);
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.write(errorMessage);
                        res.end();
                    }



                    //通过了以上验证
                    if(errorMessage==''){
                        //创建数据库连接
                        var connecting=mysql.createConnection({
                            database:'qiandaoSystem',
                            user:'root',
                            password:'541402695'
                        })

                        connecting.connect(function (err) {
                            if(err){
                                i=i+1;
                                errorMessage=errorMessage+'错误 '+i+':数据库连接失败'+'<br>';
                                message=message+'错误 '+i+':数据库连接失败'+'\n';
                                connecting.end();
                            }
                            
                            //数据库连接成功
                            else {
                               connecting.query('SELECT * FROM person WHERE account=? OR number=?',[registerData.account,registerData.number],function (err,result) {
                                   if(err){
                                       i=i+1;
                                       errorMessage=errorMessage+'错误 '+i+':数据库查询失败'+'<br>';
                                       message=message+'错误 '+i+':数据库查询失败'+'\n';
                                       connecting.end();
                                   }

                                   //查询成功
                                   else {
                                     if(result[0]!=null){
                                         if(result[0].account==registerData.account){
                                             i=i+1;
                                             errorMessage=errorMessage+'错误 '+i+':该用户名已存在'+'<br>';
                                             message=message+'错误 '+i+':该用户名已存在'+'\n';
                                         }

                                         if(result[0].number==registerData.number){
                                             i=i+1;
                                             errorMessage=errorMessage+'错误 '+i+':该学号/工号已存在'+'<br>';
                                             message=message+'错误 '+i+':该学号/工号已存在'+'\n';
                                         }
                                     }

                                     if(result[0]==null){
                                         connecting.query(
                                             'INSERT INTO ' +
                                             'person(account,password,number,name,gender,major,class,signIn,signInTime,type) ' +
                                             'VALUES(?,?,?,?,?,?,?,?,?,?)',
                                             [registerData.account,registerData.password,registerData.number,registerData.name,registerData.gender,
                                                 registerData.major,registerData.class,'否',null,registerData.type],
                                             function (err,res) {
                                                 if(err){
                                                     i=i+1;
                                                     errorMessage=errorMessage+'错误 '+i+':插入数据库失败'+'<br>';
                                                 }

                                                 else {
                                                     console.log('插入数据库成功');
                                                 }
                                             }
                                         )
                                     }

                                        if(errorMessage!=''){
                                            errorMessage+='注册失败，请更正以上错误再提交。';
                                            message=message+'一位用户因为以上原因注册失败';
                                        }

                                        if(errorMessage==''){
                                            errorMessage='注册成功,3秒后返回首页';
                                            message='一位用户注册成功，用户名：'+registerData.account+',用户类型：'+registerData.type;
                                        }

                                        connecting.end();
                                       //响应客户端
                                       console.log(message);
                                       res.setHeader("Access-Control-Allow-Origin", "*");
                                       res.write(errorMessage);
                                       res.end();
                                   }
                               }) 
                            }
                        })
                    }


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