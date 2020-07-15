const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '81.68.86.220',
    user: 'dome',
    password: 'domedome',
    database: 'dome',
    multipleStatements: true
  });
  //数据库创建连接
connection.connect((err) => {
    if (err) {
      console.log('数据库连接失败' + err)
    } else {
      console.log('数据库连接成功！！！')
    }
  });

//   module.exports=()=>{
//     return  connection;
// }



module.exports=connection