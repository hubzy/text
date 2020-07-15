// 页面路由

// 引入构建函数
const {Router}= require('express')
// 创建实例
let router = new Router()
// 引入path模块---解决路径问题
let {resolve} = require('path')

router.get('/', (req, res) => {
  // connection.connect();
  // var  sql = {user_email,display_name}
  res.send('helloWrod')

})

router.get('/login', (req, res) => {
    let url= resolve(__dirname,'../public/login.html')
  res.sendFile(url)
})
router.get('/register', (req, res) => {
    let url= resolve(__dirname,'../public/register.html')
  res.sendFile(url)
})
module.exports = ()=>{
    return router
}