const CommentService = require("../services/commentService")

const CommentController = module.exports;

CommentController.create = async (req, res, next) => {
    console.time("function1")
    const { postId, username } = req.query;
    const { content } = req.body;
    return CommentService.create(postId, username, content).then(c => {
        res.status(c.status).send(c.message)
        console.timeEnd("function1");
    }).catch(() => res.status(500).send(`Internal server error`));
};

CommentController.getAll = async (req, res, next) => {
    const { postId } = req.query
    return CommentService.getList(postId).then(c => {
        res.status(c.creation.status).send((c.creation.message + "\n" + JSON.stringify(c.comments)))
    })

        .catch(() => res.status(500).send(`Internal server error`));

};