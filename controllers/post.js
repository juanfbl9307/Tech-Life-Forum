const PostService = require("../services/postService")

const PostController = module.exports;

PostController.create = async (req, res, next) => {
    const {category,username } = req.query;
    const { content } = req.body;
    return PostService.create(category, username, content).then(c => res.status(c.status).send(c.message))
        .catch(() => res.status(500).send(`Internal server error`));
};

PostController.getAll = async (req, res, next) => {
    const {category} = req.query
    return PostService.getList(category).then(c => {
        res.status(c.creation.status).send((c.creation.message +"\n"+JSON.stringify(c.posts)))})

        .catch(() => res.status(500).send(`Internal server error`));

};