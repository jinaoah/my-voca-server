const dbConfig = {
  user: "DBP",
  password: "1234",
  connectString: "localhost:1521/xe", // Replace with your database connection string
};



module.exports = dbConfig;
// oracledb.getConnection({
//     user: dbConfig.user,
//     password: dbConfig.password,
//     connectString: dbConfig.connectString
// }, (err, conn)=>{
//     if(err) throw err;
//     console.log('데이터베이스 연결 성공')
// })

// async function run() {
//   let connection;

//   try {
//     connection = await oracledb.getConnection(dbConfig);

//     return connection;
//     // const result = await connection.execute("SELECT * FROM tab;");
//     // console.log(result.rows);
//   } catch (error) {
//     console.error("Error:", error);
//   } finally {
//     if (connection) {
//       try {
//         await connection.close();
//       } catch (error) {
//         console.error("Error closing connection:", error);
//       }
//     }
//   }
// }