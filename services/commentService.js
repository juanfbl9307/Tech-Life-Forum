const Comment = require("../repositories/comments");
const Post = require("../repositories/posts");
const User = require("../repositories/users");


const CommentService = module.exports;

CommentService.create = async (postId, username, content) => {

    const post = await Post.getById(postId);

    if (post) {
        posterId = await User.get({ username: username });

        await Comment.create({ id: post._id }, posterId._id, content);
        creation = {
            message: `Comment added to the post`,
            status: 200
        }
    } else {
        creation = {
            message: `Post doesn't exist`,
            status: 400
        }
    };
    return creation;

};

CommentService.getList = async (postId) => {
    const post = await Post.getById(postId)
    if (post) {
        comments = await Comment.find(postId).then(result => {
            return result.toArray();
        });
        creation = {
            message: `The comments of the post are :`,
            status: 200
        }

    } else {
        creation = {
            message: `Category doesn't exist`,
            status: 400
        }
    }
    return { creation, comments };
}
