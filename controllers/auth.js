const Auth = require('../models/Auth');

module.exports.join = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const nickname = req.body.nickname;

        const userData = {
            email: email,
            password: password,
            nickname: nickname,
        }
        console.log(userData);
        const result = await Auth.addUser(userData);

        if(result == 0){
            res.end("fail");
        } else {
            res.json(result);
        }
    } catch (error) {
        throw error;
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const userData = {
            email: email,
            password: password,
        }
        const result = await Auth.login(userData)
        
        res.json(result);
    } catch (err) {
        throw err
    }
}