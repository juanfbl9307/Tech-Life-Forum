const UserService = require(`../services/userService`);

const UserController = module.exports;

UserController.create = async (req, res, next) => {
    const { username, password, role } = req.body;

    return UserService.create(username, password, role).then(c => res.status(c.status).send(c.message))
        .catch(() => res.status(500).send(`Internal server error`))
};

UserController.createPoster = async (req, res, next) => {
    const { username, password } = req.body;
    return UserService.create(username, password, "poster").then(c => res.status(c.status).send(c.message))
        .catch(() => res.status(500).send(`Internal server error`));

};

UserController.getAll = async (req, res, next) => {

    return UserService.getList().then(users => res.status(200).send(users))
        .catch(() => res.status(500).send(`Internal server error`));

};

