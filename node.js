const express = require('express');
const app = express();
const UIRouter = require('./router/UIRouter')
const loginRegisterRouter = require('./router/loginRegisterRouter')
const Buffer= require('buffer');
const fs =require('fs')
const http = require('http')
const {resolve} = require('path')

var path = resolve(__dirname,'./node_modules')
fs.readdir('./' , (err,files)=>{
  var floder = [];
  if(err){
    console.log(err)
    return;
  }else{
  console.log(files);

  (function iterator(i){
    if(i==files.length){
      
      return;
    }
    fs.stat('./' + files[i],function(err,stats){
      var nn = stats.isDirectory()
      // console.log(nn)
      if(nn){
        floder.push(files[i])
      }else{
        // console.log(err)
        return;
      }

      // iterator(i+1)
      // console.log(iterator(i+1))
    }
    )
  })(0)






  }
})

// const buf = [0x1, 0x2, 0x3, 0x4, 0x5];
// const json = JSON.stringify(buf);
// // 打印: {"type":"Buffer","data":[1,2,3,4,5]}

// // const copy = JSON.parse(json, (key, value) => {
// //   return value && value.type === 'Buffer' ?
// //     Buffer.from(value):
// //     value;
// // });

// app.get('/test',(req,res)=>{

//   res.send(buf)
// })

// console.log(copy);
// 在 app 文件夹开启静态服务 +html后缀也可以访问
app.use(express.static(__dirname + '/public'))
app.use(UIRouter())
app.use(loginRegisterRouter())

app.listen(3000, (err) => {
  if (!err) console.log('Demo server listening on port 3000');
  else console.log(err)
});

