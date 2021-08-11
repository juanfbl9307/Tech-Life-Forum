const User = require("../repositories/users");

const authenticate = async (req, res, next) => {
    const { username, password } = req.query;
    try {
        const found = await User.auth(username, password);
        if (found) {
            req.user = found;
            return next();
        }

        return res.status(401).send("Unauthorized");
    } catch (e) {
        return res.status(500).send("Internal server error");
    }
}
const userAuthenticated = async (req, res, next) => {
    const { username, password } = req.query;
    try {
        const found = await User.auth(username, password);
        if (found) {
            return found;
        }

        return res.status(401).send("Unauthorized");
    } catch (e) {
        return res.status(500).send("Internal server error");
    }
}

const validateUserRole = (roles) => (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
        return next();
    }

    return res.status(401).send("Unauthorized");
}

module.exports = {
    authenticate,
    validateUserRole,
    userAuthenticated,
};
