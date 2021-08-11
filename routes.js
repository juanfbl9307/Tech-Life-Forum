const routes = require("express").Router()

const { authenticate, validateUserRole } = require("./middlewares/localAuth.js");
const UserController = require("./controllers/user");
const CategoryController = require("./controllers/category");
const PostController = require(`./controllers/post`);
const CommentController = require(`./controllers/comment`);
const {login,verifyToken} = require('./middlewares');


routes.get("/", authenticate, validateUserRole(["poster"]), (req, res, next) => {
    return res.status(200).send("Ok");
})

routes.get('/login',login);

routes.post("/admin/user", authenticate, validateUserRole(["admin"]), UserController.create);
routes.post("/user", UserController.createPoster);
routes.get("/user/all", UserController.getAll);

routes.post("/admin/categories", authenticate, validateUserRole(["admin"]), CategoryController.create);
routes.get("/categories/all", CategoryController.getAll);
routes.get("/categories",CategoryController.getById);

routes.post(`/post`,authenticate,validateUserRole(["poster","admin"]),PostController.create);
routes.get(`/post/all`,PostController.getAll);

routes.post(`/comment`,verifyToken,validateUserRole(["poster","admin"]),CommentController.create);
routes.get(`/comment/all`,CommentController.getAll);


module.exports = routes;
