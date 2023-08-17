const oracledb = require("oracledb");
const config = require("../db.js");
const Auth = {};


Auth.addUser = async (userData) => {
    try {
        const connection = await oracledb.getConnection(config); // 데이터베이스 연결을 얻습니다.
        const sql = `
      INSERT INTO USERS (email, password, nickname) 
    VALUES (:email, :password, :nickname)
    `;
        
    const result = await connection.execute(sql, userData, { autoCommit: true });

    console.log("Data inserted:", result.rowsAffected);
    } catch(err) {
         console.error("Auth.js Error:", err);
    }
}

Auth.login = async (userData) => {
    try {
        const connection = await oracledb.getConnection(config); // 데이터베이스 연결을 얻습니다.
        const sql = `
        SELECT * FROM users WHERE email = :email AND password = :password`;

        const result = await connection.execute(sql, userData);
        
        return result;
    } catch (error) {
        console.log(error);
    }
}

module.exports = Auth;