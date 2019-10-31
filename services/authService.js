const pool = require("../constants/connectConstants").pool;
const md5 = require('md5');

const login = (request, response) => {
    const { email, password } = request.body;

    pool.query(
        "SELECT * FROM users WHERE email=$1 AND passwords=$2",
        [email, md5(password)],
        (error, results) => {
            if (error) {
                throw error;
            }
            
            if(results.rowCount > 0){
                response.status(200).json(callbackSuccess(results.rows,"Login successfully"));
            } else {
                response.status(400).json(callbackFail("Username or Password not match"));
            }
        }
    );
};

const callbackSuccess = (data,pesan) =>{
    return {
        error : false,
        pesan,
        data,
        status : 200
    };
}

const callbackFail = (pesan) =>{
    return {
        error : true,
        pesan,
        status : 500
    };
}

module.exports = {
    login
};