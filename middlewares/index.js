const tokenService = require("./jwt");
const auth = require("./localAuth");



const login = async (req, res, next) => {
    const userCheck = await auth.userAuthenticated(req, res, next);
    const userData = { _id: userCheck._id, password: userCheck.password, role: userCheck.role }
    if (userCheck) {
        const token = await tokenService.getToken(userData);
        return res.json({ token })
    }
    else {
        return res.send("invalid information")
    }

}

const verifyToken = async (req, res, next) => {

    const token = req.headers.authorization;
    tokenCheck = await tokenService.checkToken(token);
    if (tokenCheck) {
        req.user = tokenCheck;
        return next();
    }
    else {
        return new Error("Can't validate token");
    }

}

module.exports = {
    login,
    verifyToken,

}