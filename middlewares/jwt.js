const jwt = require('jsonwebtoken');
const { security } = require("../config/config");

const secret = security.secret;


const getToken = async (data) => {
    const token = await jwt.sign(data, secret);
    return token;
};

const checkToken = async (token) => {
    if (token) {
        let tokenAuth = token.replace('Bearer ', '');
        const tokenCheck = jwt.verify(tokenAuth, secret);

        return tokenCheck;
    } else {
        return new Error("Invalid information");
    }

};

module.exports = {
    checkToken,
    getToken,
}

