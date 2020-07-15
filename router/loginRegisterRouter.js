const { Router } = require('express')
let router = new Router()
const bodyParser = require('body-parser')
//数据库
const connection = require('./db')

//准备正则
const nameReg = /^[a-zA-Z0-9_-]{4,16}$/;
const emailReg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
const passwordReg = /^[a-zA-Z0-9_@#.+&]{5,20}$/;

//body-parser:取前端值
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

//登录接口
router.post('/login', (req, res) => {
  const { user_name, user_password } = req.body
  console.log(user_name, user_password);
  //登录判断
  if (!nameReg.test(user_name)) {
    res.send('用户名不合法')
  } else if (!passwordReg.test(user_password)) {
    res.send('密码格式不合法，必须是6-20位')
  } else {
    // var sql = "SELECT * FROM `users` WHERE 1";   //查询表中全部值

    var sql = "select name,password from `users` where name = '" + user_name + "'AND password = '" + user_password + "'"
    connection.query(sql, (error, results, fields) => {
      if (error) {
        console.log('[login ERROR] - ', error.message)
        return;
      } if (results == '') {
        console.log('账号密码错误🙅')
        res.end('0');//登录失败返回0
      } else {
        console.log('登录成功！！✅  \n user_name：' + user_name, + 'user_password：' + user_password)
        res.end('1');//登录成功返回1
      }
    })
  }
})
//注册接口

router.post('/register', (req, res) => {
  const { user_name, user_passwordO, user_passwordT, user_email } = req.body
  console.log(user_name, user_passwordO, user_passwordT, user_email)
  //注册判断
  if (user_passwordO === user_passwordT) {
    var user_password = user_passwordO
  }else {
    res.send('密码不一致')
    return;
  }if(!passwordReg.test(user_password)){
    res.send('密码格式不正确')
    return;
  } if (!emailReg.test(user_email)) {
    res.send('邮箱不合法！！')
    return;
  } else {
    var addSqlParams = [user_name, user_password, user_email];
    var addSql = "INSERT INTO `users`(`name`, `password`, `email`) VALUES ('" + user_name + "',' " + user_password + " ','" + user_email + " ')";
    connection.query(addSql, addSqlParams, function (err, result) {
      if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        res.end("0");//如果注册失败就给客户端返回0
        return;//如果失败了就直接return不会继续下面的代码
      }else{
        res.end("1");//如果注册成功就给客户端返回1
        console.log("数据库添加成功");
      }
    })
  }
})
  




  module.exports = () => {
    return router
  }